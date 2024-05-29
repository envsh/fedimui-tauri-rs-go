package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"
	"unsafe"

	spjson "github.com/bitly/go-simplejson"
	"github.com/kitech/gopp"
)

/*
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

// #cgo CFLAGS: -I../src-tauri/target/debug/
// #cgo LDFLAGS: -L../src-tauri/target/debug/ -ltauriuirs

#cgo CFLAGS: -I../src-tauri/target/x86_64-apple-darwin/debug/
#cgo LDFLAGS: -L../src-tauri/target/x86_64-apple-darwin/debug/ -ltauriuirs_lib

extern void taurirunasc(void*);
extern void ffifuncproxy_rsc2go(void*);
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

	Retc int   `json:"retc"`
	Retv []any `json:"retv"`
}

//export ffifuncproxy_rsc2go
func ffifuncproxy_rsc2go(vx unsafe.Pointer) {
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
	default:
		retval := fmt.Sprintf("cmd %s unsupport, %v", cio.Cmd, time.Now())
		cio.Retv = append(cio.Retv, retval)
	}
}

func main() {
	log.SetFlags(log.Flags() | log.Lshortfile ^ log.Ldate)
	C.taurirunasc(unsafe.Pointer(C.ffifuncproxy_rsc2go))
}
