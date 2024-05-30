package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	mrand "math/rand"
	"time"
	"unsafe"

	spjson "github.com/bitly/go-simplejson"
	"github.com/kitech/gopp"
	"github.com/kitech/gopp/cgopp"
)

/*
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

// #cgo CFLAGS: -I../src-tauri/target/debug/
// #cgo LDFLAGS: -L../src-tauri/target/debug/ -ltauriuirs

#cgo CFLAGS: -I../src-tauri/target/x86_64-apple-darwin/debug/
#cgo LDFLAGS: -L../src-tauri/target/x86_64-apple-darwin/debug/ -ltauriuirs_lib

extern void taurirs_ffi_runasc(void*);
extern void taurirs_ffi_funcproxy_rsc2go(void*);
extern void taurirs_ffi_emitfwdts(uintptr_t);
*/
import "C"

//go:generate goppgen main cgo

type ffireqresp struct {
	// ptr: *const u8,
	// ptr usize
	ptr *C.char
	len usize

	// resp: *const u8,
	// resp usize
	resp *C.char
	len2 usize

	errmsg *C.char
	code   usize
}

type cmdinfo struct {
	Cmd  string `json:"cmd"`
	Argc int    `json:"argc"`
	Argv []any  `json:"argv"`

	Retc  int    `json:"retc"`
	Retv  []any  `json:"retv"`
	Dtime string `json:"dtime"`
}

//export taurirs_ffi_funcproxy_rsc2go
func taurirs_ffi_funcproxy_rsc2go(vx unsafe.Pointer) {
	v := (*ffireqresp)(vx)
	log.Println("hehehhee", v, time.Now())
	reqdata := C.GoStringN(v.ptr, C.int(v.len))
	log.Println("hehehhee", v, reqdata, time.Now())

	cio, err := cmdparse(v)
	gopp.ErrPrint(err)
	cmdrun(cio)

	cio.Retc = len(cio.Retv)
	resp, err := json.Marshal(cio)
	gopp.ErrPrint(err)
	log.Println(string(resp))
	v.resp = C.CString(string(resp))
	v.len2 = usize(len(resp))

	// v.resp =
	// respdata := fmt.Sprintf("hello from go, u say '%s'", reqdata)
	// v.resp = C.CString(respdata)
	// v.len2 = usize(len(respdata))
	// log.Println("hehehhee", v, reqdata, time.Now())
}

func cmdparse(prm *ffireqresp) (*cmdinfo, error) {
	jso, err := spjson.NewJson([]byte(C.GoStringN(prm.ptr, C.int(prm.len))))
	gopp.ErrPrint(err)
	// log.Println(jso.Get("cmd"), jso.Get("argc"), jso.Get("argv"))
	log.Println(jso)
	cio := &cmdinfo{}
	err = json.Unmarshal([]byte(C.GoStringN(prm.ptr, C.int(prm.len))), cio)
	gopp.ErrPrint(err)
	log.Println(cio)
	return cio, err
}
func cmdrun(cio *cmdinfo) {
	var nowt = time.Now()
	switch cio.Cmd {
	case "cmd1":
		retval := fmt.Sprintf("cmd %s res %v", cio.Cmd, time.Now())
		cio.Retv = append(cio.Retv, retval)
	case "addnum":
		retval := 0
		for _, vx := range cio.Argv {
			// v := vx.(int)
			v := gopp.Toint(vx)
			retval += v
		}
		cio.Retv = append(cio.Retv, retval)
	case "remlog":
		log.Println(cio.Argv...)
	case "sendmsg":

		msg := cio.Argv[0].(string)
		hc := gopp.NewHttpClient()
		// curl -v https://fedind.netlify.app/.netlify/functions/api/ai/gptcf -XPOST -d '{"content":"hello 水世界"}'
		hc.Timeout(16 * time.Second)
		hc.Post("https://fedind.netlify.app/.netlify/functions/api/ai/gptcf")
		hc.BodyJson(gopp.MapSA{"content": msg})
		resp, err := hc.Do()
		gopp.ErrPrint(err)

		var bcc []byte
		if err != nil {
			var data = gopp.MapSA{"content": err.Error()}
			bcc = []byte(gopp.JsonMarshalMust(data))
			// cio.Retv = append(cio.Retv, err.Error())
			// break
		} else {
			bcc, err = io.ReadAll(resp.Body)
			gopp.ErrPrint(err)
		}
		// todo add feditype=gptcf
		log.Println(string(bcc))

		cio.Retv = append(cio.Retv, string(bcc))

	default:
		retval := fmt.Sprintf("cmd %s unsupport, %v", cio.Cmd, time.Now())
		cio.Retv = append(cio.Retv, retval)
	}
	cio.Dtime = time.Since(nowt).String()
}

func main() {
	log.SetFlags(log.Flags() | log.Lshortfile ^ log.Ldate)
	go func() {
		for i := 0; ; i++ {
			gopp.SleepSec(2)
			prm := &ffireqresp{}
			cio := &cmdinfo{}
			cio.Cmd = gopp.RandomStringPrintable(6)
			cio.Argv = append(cio.Argv, mrand.Int()%999, 55.5, 456, "789", gopp.RandStrHex(5))
			cio.Argc = len(cio.Argv)
			scc := gopp.JsonMarshalMust(cio)
			prm.len = usize(len(scc))
			prm.ptr = C.CString(scc)
			prmx := (uintptr)(unsafe.Pointer(prm))
			C.taurirs_ffi_emitfwdts(C.uintptr_t(prmx))
			// cgopp.Cfree3()
			// C.free(unsafe.Pointer(prm.ptr))
			cgopp.Cfree(unsafe.Pointer(prm.ptr))

			break
		}
	}()
	C.taurirs_ffi_runasc(unsafe.Pointer(C.taurirs_ffi_funcproxy_rsc2go))
}
