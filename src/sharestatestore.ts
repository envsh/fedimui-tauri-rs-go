import { defineStore } from "pinia";
// import { storeToRefs } from 'pinia'
import { ref } from "vue";
// import { reactive, toRefs } from "vue";

import { getCurrentInstance } from "vue";
// in Component.vue
// const app = getCurrentApp()
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
        // normal data
        username: ref("Nickname"),
        userident: ref("@ident"),
        // title,subtitle,prependAvatar,type,inset,itemid,dtime, // see vuelify listview
        msglst: ref([]),  // [object]
        msgiptdata : ref(""),
        // title,subtitle,prependAvatar,type,inset,itemid,dtime, // see vuelify listview
        romlst: ref([]), // [object]

        loglst: ref([]), // [string]

        tpcuridx1: ref(2),
        tabpageons1: ref([false,true, false, false,false,false,false]), ///////////
        tabpageons2: ref([false,false,true]), ///////////
        tabpageons3: ref([false,false,true]), ///////////
        // tabwidget states
        // tabpage0show: false,// as CreateMutable<boolean>,
        // tabpage1show: false,// as CreateMutable<boolean>,
        // tabpage2show: true,// as CreateMutable<boolean>,      
        
        // stats
        vapp :  null,
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

        rcvevtcnt: ref(0),
        lastlog: ref(""),
    }),
    
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
    console.log("chkelem ...", "msglstscrwin");
    let e = document.getElementById('msglstscrwin');
    if (e == null) {
        console.log("elem null", "msglstscrwin");
        return;
    }
    console.log(head, e.scrollTop, e.scrollHeight, e);
    if (head ) {
        e.scrollTop = 0;
    }else {
        e.scrollTop = e.scrollHeight;
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

