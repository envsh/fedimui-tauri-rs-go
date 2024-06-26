import { defineStore } from "pinia";
// import { storeToRefs } from 'pinia'
import { ref } from "vue";
import * as vue from 'vue';
// import { reactive, toRefs } from "vue";

import { getCurrentInstance } from "vue";
// in Component.vue
// const app = getCurrentApp()
// sometimes not work
export function getCurrApp() {
    let app = getCurrentInstance().appContext.app;
    return app;
}
export function getVueFile() {
    let app = getCurrApp();
    let segs = app._component.__file.split('/');
    return segs[segs.length-1];
}
export function getVueVer() {
    let app = getCurrApp();
    return app.version;
}
// stv, sss.useval
export function watchrav(stv, cb) {
    vue.watch(()=> stv, cb);
}

// Removes 'readonly' attributes from a type's properties
// type CreateMutable<Type> = {
//     -readonly [Property in keyof Type]: Type[Property];
// };

// nested version
// type CreateMutableNest<T> = { -readonly [P in keyof T]: CreateMutableNest<T[P]> }

// ref usage, 
// import {sss} from './sharestatestore';
// 也可以在.vue中直接引用 sss.items, 只是isRef()==false, 但是修改值还是有效的
// let myvar = sss.items; 
//
export let ssscp = defineStore({
    id: "ssscp",
    state: () => ({
        // test data
        useval: ref(1), // for dummy
        isandroid: ref(false),
        items: ref([]),
        items2: ref([]),
        items3: ref([]),
        hideit: ref(false), // v-show="hideit"
        tstpics: [], // 图片打包名称, noref

        // normal data
        username: ref("Nickname"),
        userident: ref("@ident"),
        usericonurl: ref(""),

        // title,subtitle,prependAvatar,type,inset,itemid,dtime, // see vuelify listview
        msglst: ref([]),  // [object]
        msgiptdata : ref(""),
         // generalim(dftim), gptcf, gptopenai(gptoa),nostr,cmd,msky
        msgsndmode : ref("gptcf"),
        sndmsgpfxs : {"dftim": "请使用中文回答以下问题： ", 'cmd': '!'},
        // title,subtitle,prependAvatar,type,inset,itemid,dtime, // see vuelify listview
        romlst: ref([]), // [object]

        loglst: ref([]), // [string]

        tpcuridx1: ref(1),
        tabpageons1: ref([false,true, false, false,false,false,false]), ///////////
        tabpageons2: ref([false,false,true]), ///////////
        tabpageons3: ref([false,false,true]), ///////////
        // tabwidget states
        // tabpage0show: false,// as CreateMutable<boolean>,
        // tabpage1show: false,// as CreateMutable<boolean>,
        // tabpage2show: true,// as CreateMutable<boolean>,      
        
        // stats
        vapp :  null, // noref
        evtlsned : ref(false),
        intowinload: ref(false),
        userAgent: ref(""),
        weburl : ref(""),
        tauriunlsnfn: ref(""),
        trappver: ref(""),
        webviewsize: ref(""),
        vuejsver: ref(""),
        wndwdt: ref(0),
        wndhgt: ref(0),
        scnwdt: ref(0),
        scnhgt: ref(0),
        loadmnt: ref([]),

        rcvevtcnt: ref(0),
        lastlog: ref(""),
    }),
    
    getters: {},

    actions: {
        ctor() {
            console.log("sss ctor???");
        },

        f1() {

        },

        f2() {

        },

        f3() {

        },

    }
});

export class FediRecord {
    id : string | number
    itemid: string | number
    title: string
    content: string
    subtitle: string
    feditype: string
    fedisite: string
    fedipic: string
    prependAvatar: string 
    // ctime: Date
    ctime: string
    ctimefull: string
    dtime: string = '0s'
    username: string
    userident: string
    channame: string
    channel: string

    linktomsg: string
}


// 无效
// export let ssscp = storeToRefs(x());

///////
// "getActivePinia()" was called but there was no active Pinia
// let sss = ssscp(); sss.useval++;

// demo
export 
function dummy() {
    return "dummy from sss global";
}


/////////

export
async function msglstScrollHeadTail(head : boolean){
    let elemid = "appmainccdiv";
    // elemid = "app";
    console.log("chkelem ...", "msglstscrwin", elemid);
    let e = document.getElementById(elemid);
    if (e == null) {
        console.log("elem null", elemid);
        return;
    }
    console.log(head, e.scrollTop, e.scrollHeight, e);
    if (head ) {
        e.scrollTop = 0;
        window.scrollTo(0, 0);
    }else {
        e.scrollTop = e.scrollHeight;
        window.scrollTo(0, e.clientHeight);
    }
    // e.scrollTop = head ? 0 : e.scrollHeight;
}

export function docelembyid(id:string) { return document.getElementById(id); }
export function docelembytag(id:string) { return document.getElementsByTagName(id); }

export function wineventwatch(id:string) {
    console.log(id);
    window.addEventListener(id, ()=>{
        console.log(id);
    });
}


