<script setup lang="ts">

import { useLogger } from "vue-logger-plugin";
const log = useLogger();
// import { ref } from "vue";
// import { isRef } from "vue";
// import { toRef } from "vue";
// import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
// import { emit, listen } from "@tauri-apps/api/event";
    import * as ssg from "./sharestatestore";
    import {ssscp} from "./sharestatestore";
    const sss = ssscp(); sss.useval += 1;
    import * as mylibg from "./mylib";


async function setuptaurieventlisten() {
    console.log("begin setup tauri event listener");
    const unlisten = await listen<string>('evtchan', (evt) => {
    //console.log(evt.event, evt.payload.length, evt.payload);
        let jso = JSON.parse(evt.payload);
        console.log(evt.event, evt.payload.length, jso , "//");
    })
    console.log("after setup tauri event listener", unlisten);
    log.warn("hehhehhe",123);
}


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

let romlst = sss.romlst;
for (let i = 0; i < 30; i++) {
    // console.log(i+3);
    let item0 =  { type: 'divider', inset: true };
    let item4 = {
        //   prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        prependAvatar: "../images/favicon.png",
          title: i+ ' Recipe to try',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          itemid: "mid"+i,
          dtime: "dtime000",
        };

    (sss.msglst).push(item0);
    (sss.msglst).push(item4);
    romlst.push(item0);
    romlst.push(item4);
}
console.warn("hhehheeddd", items.length);

window.addEventListener('load', (evt) => {
    console.log("window load", evt);
    console.log(location.href, navigator.userAgent);
    if (navigator.userAgent.indexOf('ndroid') != -1) {
        sss.isandroid = true;
    }
    sss.isandroid = true;
    mylibg.setsss(sss);
    setuptaurieventlisten();
})
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
    console.log("curidx " + oldidx + " => " + idx);
    mylibg.addmylog(sss.loglst, "curidx " + oldidx + " => " + idx);
    }catch(e) {
        console.log(e);
        mylibg.addmylog(sss.loglst, e);
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
    console.log("tabidx", curidx, "=>", nxtidx);
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

</script>

<template>
    <div > {{ sss.useval }} 
        <span><button @click="upcnt()">upcnt</button>
            <button @click="reloadui()">reload</button></span>
            <span>isand {{ sss.isandroid }}</span>
        </div>

    <div  style="width: auto; height: 650px; ">
        
        <!-- <groupview/> -->
        <!-- left: 36% -> 0, width: 64% -> 0  -->
        <div style="height:inherit; width: 100%;position: absolute; left: 0%; top: 4%; ">
            <div style="background-color:#666;">
                <span><button @click="nexttabpage(false)" title="Next tabpage">ntp</button>
                    </span>
                <span title="tabpage list"><select >
                    <option v-for="val,idx in sss.tabpageons1" :selected="val"> {{ val }}.{{ idx }}</option>
                    </select></span>

                <!-- <span><select name="ffff">
                    <option>ffffff</option>
                    <option>bbb</option>
                    <option selected>tttooo</option>
                    <option>eee</option>
                    <option>www</option>
                </select></span> -->
                <span><button @click="switchtabpage(0)" >btn0</button></span>
                <span><button @click="switchtabpage(1)" >btn1</button></span>
                <span><button @click="switchtabpage(2)" >btn2</button></span>
                <span><button @click="switchtabpage(3)" >btn3</button></span>
                <span><button @click="switchtabpage(4)" >btn4</button></span>
                <span><button @click="switchtabpage(5)" >btn5</button></span>
                <span><button @click="switchtabpage(6)" title="mylogui">logui</button></span>
                <span><img @click="ssg.msglstScrollHeadTail(true)" width="20px" src="../images/favicon.png" title="SCT: scroll to top"/></span>
            </div>

            <div id="rightwin" style="height:89%; width: 100%;">
                <div v-show="(sss.tabpageons1)[0]" id="tabpage.page1ui">
                    <Page1/>
                </div>

                <div v-show="(sss.tabpageons1)[1]" id="tabpage.msglstui" style="height: 100%;">
                    <div id="msglstscrwin" style="height: 89%; width: 100%; overflow-y: scroll;">
                        <Msgview/>
                    </div>

                    <div style="background-color:darkslategray; position: absolute; top: 550px; width: 100%;">
                        <msginputsend/>
                    </div>    
                </div>

                <div v-show="(sss.tabpageons1)[2]" id="tabpage.groupview"  style="height: 100%; width: 100%;">
                    <groupview/>
                </div>

                <div v-show="(sss.tabpageons1)[3]" id="tabpage.greetui">
                    <Greet/>
                </div>
                <div v-show="(sss.tabpageons1)[4]" id="tabpage.aboutui">
                    <aboutui/>
                </div>
            
                <div v-show="(sss.tabpageons1)[5]" id="tabpage.testui">
                    <testui/>
                </div>

                <div v-show="(sss.tabpageons1)[6]" id="tabpage.mylogui">
                    <mylogui/>
                </div>

            </div>

        </div>
        
    </div>

    <hr/>

  <!-- <div class="container">
    <Msgview />
  </div> -->
</template>

<style >
body {
    background-color: #1a1a1a;
    color: #fafafa;
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
