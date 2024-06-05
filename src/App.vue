<script setup lang="ts">

import { useLogger } from "vue-logger-plugin";
const log = useLogger();
import { computed, ref } from "vue";
import { onMounted, onUnmounted } from 'vue'
// import { isRef } from "vue";
// import { toRef } from "vue";
// import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
// import { emit, listen } from "@tauri-apps/api/event";
import * as ssg from "./sharestatestore";
import {ssscp} from "./sharestatestore";
const sss = ssscp(); sss.useval += 1;
import mylib, * as mylibg from "./mylib";

import { getTauriVersion } from '@tauri-apps/api/app';
import { getCurrent } from '@tauri-apps/api/webview';
// const appVersion = await getVersion();


let tauri_setup_event_listener_timer = null;
let tauri_setup_event_listener_cnter = 0;
async function setuptaurieventlisten() {
    sss.intowinload = true;
    // console.log("begin setup tauri event listener");
    mylibg.uiinfo("begin setup tauri event listener");

    // android: cachted Command plugin: event|listen not allowed by ACL
    // https://github.com/tauri-apps/tauri/issues/9502#issuecomment-2081478814
    // reload page works
    listen<string>('evtchan', (evt) => {
        //console.log(evt.event, evt.payload.length, evt.payload);
        sss.rcvevtcnt += 1;
        sss.evtlsned = true;
        let jso = JSON.parse(evt.payload);
        console.log(evt.event, evt.payload.length, jso , "//");
    }).then((unlsnfn)=> {
        sss.tauriunlsnfn = 'thened ' + unlsnfn;
        if (tauri_setup_event_listener_timer != null) {
            clearTimeout(tauri_setup_event_listener_timer);
            tauri_setup_event_listener_timer = null;
        }
    }).catch((err)=> {
        mylibg.errprt(err);
        sss.tauriunlsnfn = 'catched ' + err;
        if (tauri_setup_event_listener_timer == null) {
            tauri_setup_event_listener_timer = window.setTimeout(setuptaurieventlisten, 1234);
        }
    });
    // console.log("after setup tauri event listener", sss.tauriunlsnfn);
    mylibg.uiwarn("after setup tauri event listener @evtchan", sss.tauriunlsnfn);
    log.warn("hehhehhe",123);
    // mylibg.remlogo("tauri setup global event listener @evtchan.", sss.tauriunlsnfn);
}
let webviewgetsize_timer = null;
function webviewgetsize() {
    getCurrent().size()
        .then((szo)=>{
            sss.webviewsize = ''+ JSON.stringify(szo);
            if (webviewgetsize_timer != null) {
                window.clearTimeout(webviewgetsize_timer);
                webviewgetsize_timer = null;
            }
        })
        .catch((err)=> {
            mylibg.errprt(err);
            sss.webviewsize = ''+err;
            log.warn("faild", err);
            if (webviewgetsize_timer == null) {
                webviewgetsize_timer = window.setTimeout(webviewgetsize, 2345);
            }
        });
}
function getrunenvinfo() {
    sss.weburl = location.href;
    sss.userAgent = navigator.userAgent;
    if (navigator.userAgent.indexOf('ndroid') != -1) {
        sss.isandroid = true;
    }
    sss.isandroid = true;

    mylibg.rununtil(mylibg.randnb(500, 1000), ()=> {
        let stop = false;
        getTauriVersion()
        .then((ver)=>{ sss.trappver = ''+ver; stop = true; })
        .catch((err)=> {mylibg.errprt(err); sss.trappver = ''+err; stop = false;});
        return stop;
    });
    
    // window.screen, android 0,0???
    mylibg.rununtil(mylibg.randnb(500, 1000), ()=> {
        sss.scnhgt = window.screen.height;
        sss.scnwdt = window.screen.width;
        return sss.scnhgt != 0;
    });
    
    /*
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
alert(x + ' × ' + y);
    */
    // , android 0,0???
    mylibg.rununtil(mylibg.randnb(500, 1000), ()=> {
        sss.wndhgt = window.innerHeight;
        sss.wndwdt = window.innerWidth;
        return sss.wndhgt != 0;
    });

    // 这个值在 android 上获取不到呢???
    // sss.vuejsver = ssg.getVueVer();
    mylibg.rununtil(mylibg.randnb(500, 1000), (app)=> {
        if (sss.vuejsver != '') return true;
        sss.vuejsver = app.version != "" ? app.version : ssg.getVueVer();
        return sss.vuejsver != "";
    }, sss.vapp);
}
function ontopwinresize(evt) {
    // console.log("topwin resized", evt);
    mylibg.uidebug("topwin resized", evt);
}
window.addEventListener('load', (evt) => {
    // console.log("window load", evt);
    mylibg.uidebug("window load", evt);
    // console.log(location.href, navigator.userAgent);
    sss.loadmnt.push("win.load");
    mylibg.setsss(sss);
    setuptaurieventlisten();
    // permission not allow...
    // getCurrent().size().then((szo)=>{ sss.webviewsize = ''+szo});
    webviewgetsize();
    getrunenvinfo();
})
window.addEventListener("resize", ontopwinresize);
// window.load 在 onMounted 之后/之前/不确定???  之之之后
// onMounted 在 android 上没有执行？？？
onMounted(() => {
    // console.log(`the component is now mounted.`,ssg.getVueFile());
    mylibg.uidebug("mounted")
    sss.loadmnt.push("vue.mount");
});
onUnmounted(()=> {
    // console.log(`the component is now unmounted`, ssg.getVueFile());
    mylibg.uidebug("unmounted")
});

// console.log("start");
// const unlisten = await listen<string>('evtchan', (evt) => {
//     console.log(evt);
// })
// console.log("enddd");

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Greet from "./components/Greet.vue";
import Msgview from "./components/Msgview.vue";
import msginputsend from "./components/msginputsend.vue";
import groupview from "./components/groupview.vue";

// import Empty from "./components/Empty.vue";
// import VueVirtualScroller from 'vue-virtual-scroller';
// app.use(VueVirtualScroller);


let items  = [{title:"iii",subtitle:"iiiooo"}, {title:"jjjjj",subtitle:"oooooo"}];
for (let i = 0; i < 300; i++) {
    // console.log(i+3);
    // items.push("field字段"+(300-i));
    let item = {title:"field字段"+(300-i), subtitle: "field字段"+(300-i), prependAvatar:"../images/favicon.png"};
    items.push(item);
}
// [ {type{subheader,divider}, title, inset,}, {prependAvatar,title,subtitle}]


// \see https://cloudinary.com/blog/handle-image-asset-bundling-using-vite-in-vuejs#:~:text=Apart%20from%20referencing%20images%20in%20the%20usual%20manner%2C,from%20APIs%2C%20or%20using%20dynamic%20inline%20background%20images.
import img2_3jpg from "../images2/3.jpg";
import img2_4jpg from "../images2/4.jpg";
import img2_5jpg from "../images2/5.jpg";
import img_cfai_png from "../images/cloudflareai.png";
import icons_contact_jpg from "../icons/contact.png";
let tstpics = [img2_3jpg, img2_4jpg, img2_5jpg, img_cfai_png, icons_contact_jpg];
sss.tstpics = tstpics;

// let romlst = sss.romlst;
for (let i = 0; i < 30; i++) {
    // console.log(i+3);
    let item0 =  { type: 'divider', inset: true };
    let item4 = {
        //   prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        prependAvatar: "../images/favicon.png",
          title: i+ ' Recipe to try',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          itemid: "mid"+i,
          id: i,
          dtime: "0s", // "dtime000",
          ctime: mylibg.objtmstrmin(new Date()),
          feditype: 'test',
          fedipic: '',
          username: '',
          channame: 'testch',
        };
        item4.prependAvatar = tstpics[Math.ceil(Math.random()*1000000)%(tstpics.length)];
        // item4.prependAvatar = Math.ceil(Math.random()*1000000) +'wtf' ;
        item4.fedipic = item4.prependAvatar;
        item4.username = item4.fedipic.split('/').pop().split('.').shift();
        if (item4.username.length > 15) {
            item4.username=item4.username.substring(0,15);
        }

    // (sss.msglst).push(item0);
    (sss.msglst).push(item4);
    (sss.romlst).push(item0);
    (sss.romlst).push(item4);
}
// dont log state var in global????
// console.warn("hhehheeddd", items.length);

///

import Page1 from "./components/Page1.vue";
// import Page2 from "./components/Page2.vue";
// import Page3 from "./components/Page3.vue";
import aboutui from "./components/about.vue";
import testui from "./components/testui.vue";
import mylogui from "./components/mylogui.vue";


// export 
function switchtabpage(idx : number) :number {
    const ons = sss.tabpageons1;
    let oldidx = 0;
    try {
    // hidden all first
    for (let i = 0; i < ons.length; i++) {
        let curval = ons[i];
        // 但是这里显示都是isRef=false?
        // console.log("idx", i, "val", curval, isRef(ons[i]), isRef(ons), isRef(tabpagerefs) );
        if (curval != false) {
            if (i == idx) {
                return i; // nochange
            }
            ons[i] = false;
            // console.log(typeof sssref.tabpage1show);
            // sss.tabpage1show =false;
            // sss.commit('tabpage1show', false);
            oldidx = i;
        }
    }
    ons[idx] = true;
    // console.log("curidx " + oldidx + " => " + idx);
    mylibg.uiinfo("curidx " + oldidx + " => " + idx);
    // mylibg.addmylog(sss.loglst, "curidx " + oldidx + " => " + idx);
    }catch(err) {
        // console.log(err);
        mylibg.uierror(err);
        // mylibg.addmylog(sss.loglst, err);
    }

    return oldidx;
}

// export 
function nexttabpage(prev : boolean) {
    let tpcuridx1 = () : number =>  {
        for (let i = 0; i < sss.tabpageons1.length;i++) {
            if (sss.tabpageons1[i] == true) {
                return i;
            }  
        }
        return -1;
    };

    let curidx = tpcuridx1();
    let ons = sss.tabpageons1;
    let nxtidx = curidx + (prev ? -1 : 1);
    if (prev) {
        if (nxtidx < 0) nxtidx = ons.length-1;
    }else{
        if (nxtidx >= ons.length) {
            nxtidx = nxtidx % (ons.length);
        }
    }
    // console.log("tabidx", curidx, "=>", nxtidx);
    sss.tpcuridx1 = nxtidx;
    switchtabpage(nxtidx)
}
// export 
function switchtabpagebyname(name : string) {
    let idx = -1;
    let m = new Map();
    m.set("page0", 0);
    m.set("page1", 1);
    m.set("page2", 2);
    idx = m.get(name);
    
    if (idx >= 0) {
        switchtabpage(idx);
    }
}

function upcnt() { sss.useval++; }
function reloadui() { location.reload(); }

// import brandImage from '../src/assets/images/lockup-color.png'
// let navbarOptions = {
//           elementId: "main-navbar",
//           menuOptionsLeft: [
//             {
//               type: "link",
//               text: "Pricing",
//             //   path: { name: "pricing"},
//               iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>',
//             },
//           ],
//           menuOptionsRight: [
//             {
//               type: "button",
//               text: "Signup",
//             //   path: { name: "signup" },
//               class: "button-red"
//             },
//           ]
//     };

import { DockMenu } from "vue-dock-menu";
import "vue-dock-menu/dist/vue-dock-menu.css";
ssg.getCurrApp().component('vue-dock-menu', DockMenu);
// how modify menu runtime???
let mainmenu_items = [
        {
          name: "File",
          menu: [{ name: "Open"}, {name: "New Window"}, {name: "Exit"}]
        },
        {
          name: "Edit",
          menu: [{ name: "Cut剪切"}, {name: "Copy"}, {name: "Paste"}]
        },
        {
            name: "Window",
            iconSlot: "window",
            menu: [ {name: "Prev <"}, {name: "Next >"}, 
                    { name : "First <<"},{name: "Last >>"},
                    { isDivider: true },
                    // { name: "-------", disable: true},
                    { name: "group list"},
                    {name: "message List"}, {name: "logui"}, 
                    {name: "about"}, {name: "testui"},]
        },
        {
            name: "Misc",
            menu: [{ name : "upcnt"}, {name: "Scroll Top"}, {name: "Scroll Bottom"}]
        },
        {
            name: "Dev",
            menu: [{ name : "Reload"}, {name: "DevTools"}, {name: "sidebar"}]
        },
        {
            name: "Help",
            menu: [{ name : "Reload"},{name: "about"},
                {name: "ddd"}, {name: "eee"}]
        },

      ];

let mainmenu_funcs = {
    "misc>upcnt":  upcnt,

    "window>prev <": ()=>{ nexttabpage(true) },
    "window>next >": ()=>{ nexttabpage(false)},
    "window>first <<": ()=> {switchtabpage(0)},
    "window>last >>": ()=> {switchtabpage(8)},
    "window>group list": ()=> {switchtabpage(2)},
    "window>message list": ()=> {switchtabpage(1)}, 
    "window>logui": ()=> {switchtabpage(6)},
    "window>about": ()=> {switchtabpage(4)}, 
    "window>testui": ()=> {switchtabpage(5)}, 
    "help>about": ()=> {switchtabpage(4)}, 

    "dev>reload": reloadui,
    "dev>devtools": ()=> { mylibg.devtools() }, // why mylibg.devtools not work
    "dev>sidebar": ()=> { sidebarshow.value = !sidebarshow.value;},

    "misc>scroll bottom": ()=>{ssg.msglstScrollHeadTail(false)},
    "misc>scroll top": ()=>{ssg.msglstScrollHeadTail(true)},
}
function mainmenu_selected(item) {
    // console.log("mmsel", item); // {name:, path:}
    let fn = mainmenu_funcs[item.path];
    if (fn != null) {
        fn();
    }else{
        mylibg.uiwarn("menu func not found", item.path);
    }
}

////////
//App.vue
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// export default {
//   components: {
//     SidebarMenu,
//   },
// }
ssg.getCurrApp().component('sidebar-menu', SidebarMenu);

let sidebarmenus = [
          {
            header: 'Main Navigation',
            hiddenOnCollapse: true,
          },
          {
            // href: '/Home',
            title: 'Dashboard',
            icon: 'fa fa-user',
          },
          {
            // href: '/charts',
            title: 'Charts',
            icon: 'fa fa-chart-area',
            child: [
              {
                // href: '/charts/sublink',
                title: 'Sub Link',
              },
            ],
          },
        ];
function sidebar_menuitem_clicked(x,y) {
    mylibg.uiinfo(x, y);
    console.log(y);
}
function sidebar_menu_folder(fold) {
    mylibg.uiinfo(fold);

}
let sidebarshow = ref(false);


function onSwipeScreen(direction : string, evt : MouseEvent, z) {
    let x = direction;
    let y = evt;
    mylibg.uiinfo(x,y);
    console.log(x,y,z);

    if (x == "right") {
        let isfromleftedge = false; // todo 区分是显示sidebar还是翻页
        isfromleftedge = resolvepullsidebar(evt);
        if (isfromleftedge) {
            if (sidebarshow.value != true) {
                sidebarshow.value = true;
            }
        }else{
            nexttabpage(false);
        }
    } if (x == "left") {
        if (sidebarshow.value != false) {
            sidebarshow.value = false;
        }else{
            nexttabpage(true);
        }
    } if (x == "bottom") {
        // reloadui(); // 容易误发
    }
}
// 左侧1/3宽度以内开始
// todo 没有办法获取开始x值
let touchstartx = -1;
function resolvepullsidebar(evt : MouseEvent) {
    // if (true) return true; // always return untin got start point
    if (touchstartx < 0 ) return true;
    let startx = touchstartx;
    let wndwdt = wndwidth;
    let wantx = Math.ceil(wndwdt.value/3.0);
    mylibg.uidebug('bpos', startx, 'wantx', wantx, 'ok', startx < wantx);
    if (startx < wantx) {
        return true;
    }
    return false;
}

function onTouchStart(x : MouseEvent, y) {
    mylibg.uiinfo(x,y);
    console.log(x,y);

    let evt = x;
    touchstartx = evt.clientX;
}

import ContextMenu from '@imengyu/vue3-context-menu'

function btntapshowctxmenu(x,y) {
    mylibg.uiinfo(x,y);
    console.log(x);
    // vuefloatmenumoveto(x.clientY,x.clientX);
    ContextMenu.showContextMenu({
    x: x.clientX,
    y: x.clientY,
    items: [
      { 
        label: "A menu item", 
        onClick: () => {
          alert("You click a menu item");
        }
      },
      { 
        label: "A submenu", 
        children: [
          { label: "Item1" },
          { label: "Item2" },
          { label: "Item3" },
        ]
      },
    ]
  }); 
}

// import 'floating-vue/dist/style.css'
// import { Dropdown, Tooltip, Menu, vTooltip } from 'floating-vue';

import { MenuBar } from '@imengyu/vue3-context-menu';

const menuData  = {
    theme: "default dark",
    items: [
    {
      label: "File",
      children: [
        { label: "New" },
        { label: "Open" },
        // { 
        //   label: "Open recent",
        //   children: [
        //     { label: "File 1...." },
        //     { label: "File 2...." },
        //     { label: "File 3...." },
        //     { label: "File 4...." },
        //     { label: "File 5...." },
        //   ],
        // },
        { label: "Save", divided: true },
        { label: "Save as..." },
        { label: "Close" },
        { label: "Exit" },
      ],
    },
    {
      label: "Edit",
      children: [
        { label: "Undo" },
        { label: "Redo" },
        { label: "Cut", divided: true },
        { label: "Copy" },
        { label: "Find", divided: true },
        { label: "Replace" },
      ],
    },
    // {
    //   label: "View",
    //   children: [
    //     { label: "Zoom in" },
    //     { label: "Zoom out" },
    //     { label: "Reset zoom" },
    //     { label: "Full screent", divided: true },
    //     { label: "Find", divided: true },
    //     { label: "Replace" },
    //   ],
    // },
    {
      label: "Window",
      children: [
        { label: "Previous <", onClick: ()=>{ nexttabpage(true)} },
        { label: "Next >", onClick:()=>{ nexttabpage(false)} },
        { label: "First <<", onClick: ()=> {switchtabpage(0)} },
        { label: "Last >>", onClick: ()=> {switchtabpage(8)}},
        { label: "Group List", onClick: () =>{switchtabpage(2)} },
        { label: "Message List", onClick: () =>{ switchtabpage(1) } },
        { label: "Logui", onClick: ()=> { switchtabpage(6) } },
        { label: "About", onClick: ()=> { switchtabpage(4) } },
        { label: "testui", onClick: ()=> { switchtabpage(5)} },
      ],
    },
    {
      label: "Misc",
      children: [
        { label: "Update useval", onClick: upcnt },
        { label: "Scroll Top", onClick:()=>{ssg.msglstScrollHeadTail(true)} },
        { label: "Scroll Bottom", onClick: ()=>{ssg.msglstScrollHeadTail(false)} },
      ],
    },
    {
      label: "Dev",
      children: [
        { label: "Reload" , onClick: reloadui},
        { label: "Devtools", onClick: mylibg.devtools },
        { label: "Sidebar", onClick: ()=> { sidebarshow.value = !sidebarshow.value;} },
      ],
    },
    {
      label: "Help",
      children: [
        { label: "About", onClick: ()=>{ switchtabpage(4) } },
      ],
    },
    // {
    //   label: "Long long menu text item",
    // },
  ]
};

import { FloatMenu } from "vue-float-menu";
import "vue-float-menu/dist/vue-float-menu.css";
import { useDisplay } from "vuetify";

const wndwidth = useDisplay().width;
const wndheight = useDisplay().height;
const calcmainareaheight2 = computed(()=>{
    let sndmsgwndhgt = (sss.tpcuridx1 != 1) ? 55 : 0;
    let h = wndheight.value-190 + sndmsgwndhgt;
    return h;
})

import menubar2 from './components/menubar2.vue';

</script>

<template>
        <div>
        <float-menu :position="'top right'" :dimension="80" :menu-dimension="{height: 0, width: 0}"
            :theme="{
            // primary: '#3a3a3a',
            // textColor: '#000',
            // menuBgColor: '#fff',
            // textSelectedColor: '#fff',
            }">
            {{ sss.useval }} UV <br />
            {{ sss.isandroid }} IA <br />
            {{ sss.rcvevtcnt }} EC <br />
            {{ sss.evtlsned }} EL <br />
            {{ sss.loglst.length }} LC
        </float-menu>
    </div>
    <div v-show="sidebarshow" id="sidebarmenu" style="position: absolute; top: 50px;">
        <sidebar-menu :menu="sidebarmenus" @item-click="sidebar_menuitem_clicked"
            @update:collapsed="sidebar_menu_folder" style="margin: 0px;">
        </sidebar-menu>
    </div>

    <v-layout class="rounded rounded-md" 
        v-touch:swipe="onSwipeScreen"
        v-touch:start="onTouchStart"
        v-touch:press="onTouchStart"
        >
        <v-app-bar 
        color=""
        height="48"
        flat
        density="compact"
        v-tooltip="'top1 appbar for main menu'"
      >
      <MenuBar id="mainmenu2" :options="menuData" theme="default dark" />
    <!-- <menubar2></menubar2> -->
    </v-app-bar>

      <v-system-bar style="z-index: 0;" color="grey-darken-3" v-tooltip="'system bar for toolbar1'">
        
        <div style="height: 30px;">
        <!-- {{ sss.useval }}  -->
        <span>
            <!-- <button @click="upcnt()">upcnt</button> -->
            <VDropdown :overflow-padding="60" auto-boundary-max-size style="display:inline-flex;"
                :showTriggers="['hover']" :hideTriggers="[]">
                <button @click="reloadui()">reload</button>
                <template #popper="">
                    <!-- <input class="tooltip-content" v-model="sss.loglst.length" placeholder="Tooltip content" /> -->
                    Useval: {{ sss.useval }} <br />
                    Isandroid: {{ sss.isandroid }} <br />
                    evtcnt: {{ sss.rcvevtcnt }}<br />
                    evtlsned: {{ sss.evtlsned }}<br />
                    Count: {{ sss.loglst.length }} <br />
                    wndheight: {{ wndheight }}
                </template>
            </VDropdown>
        </span>
        <!-- <span>isand {{ sss.isandroid }}</span> -->
        <!-- &nbsp; -->
        <!-- <span v-tooltip="'evtcnt'"> {{ sss.rcvevtcnt }} </span> &nbsp; -->
        <!-- <span v-tooltip="'evtlsned'"> {{ sss.evtlsned }} </span> -->
        <button class="btn" v-touch:tap="btntapshowctxmenu">swipe-hhh</button>

        <span title="tabpage list"><select>
                <option v-for="val,idx in sss.tabpageons1" :selected="val">
                    {{ val }}.{{ idx }}</option>
            </select></span>

        <!-- <span><select name="ffff">
                    <option>ffffff</option>
                    <option>bbb</option>
                    <option selected>tttooo</option>
                    <option>eee</option>
                    <option>www</option>
                </select></span> -->

        <span><img @click="ssg.msglstScrollHeadTail(true)" width="20px" src="../icons/barbuttonicon_up_2x.png"
                title="SCT: scroll to top" /></span>
    </div>
    <v-spacer></v-spacer>
      </v-system-bar>

      <v-system-bar style="z-index: inherit;" color="grey-darken-3"  v-tooltip="'system bar for toolbar2'">
        <div style="background-color:#666; height: 30px;">
        <span><button @click="nexttabpage(false)" title="Next tabpage">ntp</button>
        </span>

        <span><button @click="switchtabpage(0)">btn0</button></span>
        <span><button @click="switchtabpage(1)">btn1</button></span>
        <span><button @click="switchtabpage(2)">btn2</button></span>
        <span><button @click="switchtabpage(3)">btn3</button></span>
        <span><button @click="switchtabpage(4)">btn4</button></span>
        <span><button @click="switchtabpage(5)">btn5</button></span>
        <span>
            <VDropdown :overflow-padding="60" auto-boundary-max-size style="display:inline-flex;"
                :showTriggers="['hover']" :hideTriggers="[]">
                <button @click="switchtabpage(6)">logui</button>
                <!-- @click="switchtabpage(6)"  v-tooltip="('cnt ' + sss.loglst.length + ' ' +sss.lastlog)" -->
                <template #popper="">
                    <!-- <input class="tooltip-content" v-model="sss.loglst.length" placeholder="Tooltip content" /> -->
                    Count: {{ sss.loglst.length }}, Last: {{ sss.lastlog }}
                </template>
            </VDropdown>
        </span>
        <!-- <v-spacer></v-spacer> -->
        <span><img @click="ssg.msglstScrollHeadTail(true)" width="20px" src="../icons/barbuttonicon_up_2x.png"
                title="SCT: scroll to top" /></span>
    </div>
    <v-spacer></v-spacer>
        </v-system-bar>
        
  
      <!-- <v-navigation-drawer
        color="grey-darken-2"
        width="72"
        permanent
      >lefttt</v-navigation-drawer> -->
  
      <!-- <v-navigation-drawer
        color="grey-darken-1"
        width="150"
        permanent
      >eee</v-navigation-drawer> -->
  
      <!-- <v-app-bar 
        color="grey"
        height="48"
        flat
        density="compact"
      >top111 
      
    </v-app-bar> -->
          


    <!-- <v-system-bar style="z-index: inherit;"></v-system-bar> -->

      <!-- <v-navigation-drawer 
        color="grey-lighten-1"
        location="right"
        width="150"
        permanent
      >righttt</v-navigation-drawer> -->
  
      <!-- <v-app-bar
        color="grey-lighten-2"
        height="48"
        location="bottom"
        flat density="compact"
      >mmm
    </v-app-bar>
      <v-app-bar
        color="grey-lighten-2"
        height="48"
        location="bottom"
        flat density="compact"
      >nnn
    </v-app-bar>
   -->

      <v-main id="appmainccdiv" class="d-flex align-center justify-center" style="min-height: 300px;">


            <div v-show="(sss.tabpageons1)[0]" id="tabpage.page1ui">
                <Page1 />
            </div>

            <div v-show="(sss.tabpageons1)[1]" id="msglstscrwin"
                style=" width: 100%;">

                    <Msgview />
                <!-- <v-virtual-scroll
                    :items="sss.msglst"
                    >
                    <template v-slot:default="{ item }">
                         {{ item.title }}

                         <div v-html="item.subtitle"></div>
                    </template>
                    </v-virtual-scroll> -->
                     <!-- <v-footer :height="55"></v-footer> -->
            </div>


            <div v-show="(sss.tabpageons1)[2]" id="tabpage.groupview" style=" width: 100%;">
                <groupview />
            </div>

            <div v-show="(sss.tabpageons1)[3]" id="tabpage.greetui">
                <Greet />
            </div>
            <div v-show="(sss.tabpageons1)[4]" id="tabpage.aboutui">
                <aboutui />
            </div>

            <div v-show="(sss.tabpageons1)[5]" id="tabpage.testui">
                <testui />
            </div>

            <div v-show="(sss.tabpageons1)[6]" id="tabpage.mylogui">
                <mylogui />
            </div>
            
      </v-main>

      <v-footer app flat location="bottom" density="compact" height="25px" style="background: ;"  v-tooltip="'footer for statusbar1'">
    <button>ppp</button>
    <v-spacer></v-spacer>
    <button>ppp</button>
    </v-footer>

      <v-footer app v-show="sss.tabpageons1[1]" height="55px">
        <msginputsend></msginputsend>
      </v-footer>

    </v-layout>
  </template>
  
<style >

body {
    background-color: #1a1a1a;
    color: #fafafa;
}
.v-popper--theme-dropdown .v-popper__inner {
    background-color: #1a1a1a !important; 
    color: #fafafa !important;
}

</style>

<!-- <style src="@/asserts/css/dark-mode.css"></style> -->
<style scoped>



.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 22px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.logo {
  height: 22px;
  padding: 11px;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1,h3 {
  text-align: center;
}

input,
button {
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 0.1em 0.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}
button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

input,
button {
  outline: none;
}

#greet-input {
  margin-right: 5px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }

  input,
  button {
    color: #ffffff;
    background-color: #0f0f0f98;
  }
  button:active {
    background-color: #0f0f0f69;
  }
}

</style>
