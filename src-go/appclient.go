package main

import (
	"encoding/json"
	"log"

	"github.com/envsh/fedind/envcfg"
	"github.com/envsh/fedind/guiclish"
	"github.com/kitech/gopp"
)

var locdb *guiclish.Localstore

func appclientmain() {
	appclientinit()
	appclientstart()

	gopp.Forever()
}

func appclientinit() {
	locdb = guiclish.Locdb()
	guiclish.MatrixEventSetcb(matrixeventhandler)
}

func appclientstart() {
	mtxserver := envcfg.Mtxserver
	mtxusername := envcfg.Mtxusername
	mtxacctk := envcfg.Mtxaccesstoken
	go guiclish.NonhttpThinmtxproc(mtxserver, mtxusername, mtxacctk)
}

func matrixeventhandler(hkt *guiclish.Hooktaskqst) {
	// log.Println(hkt)
	hki := hkt.Hki
	log.Println(hki.DbgStrs())
	locdb.Addmsg(hki)

	bcc, err := json.Marshal(hki.FediRecord)
	gopp.ErrPrint(err)
	log.Println(string(bcc))
	emitmsgts("IncomeMatrixEvent", string(bcc))
}
