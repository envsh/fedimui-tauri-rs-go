<script setup lang="ts">

import { ref } from "vue";
import { isRef } from "vue";
import { toRef } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
// import { emit, listen } from "@tauri-apps/api/event";
import {ssscp} from "./sharestatestore";
const sss = ssscp();
sss.useval = 1;

const greetMsg = ref("");
const respmsg = ref("");
const name = ref("");
const name2 = ref("");
// const navidxval = ref(0);

async function callfwdgo(cmd : string, args : [any]) {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  let prm = { jstr: JSON.stringify({cmd: cmd, argc: args.length, argv: args })};
//   console.log(prm);
  respmsg.value = await invoke("callfwdgo", prm);
  return respmsg.value;
}

async function setupeventlisten() {
    console.log("begin setup event listener");
    const unlisten = await listen<string>('evtchan', (evt) => {
    //console.log(evt.event, evt.payload.length, evt.payload);
        let jso = JSON.parse(evt.payload);
        console.log(evt.event, evt.payload.length, jso , "//");
    })
    console.log("after setup event listener", unlisten);
}

async function cmd1(...args : any) {
    let respval = await callfwdgo("cmd1", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);


}
async function addnum(...args : any) {
    args.push(name2.value);
    let respval = await callfwdgo("addnum", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);
    greetMsg.value = jso.retv[0];

    // remlog("log111", "v222", 333);
}
// async function remlog(...args : any) {
//     args.push("fromts");
//     let respval = await callfwdgo("remlog", args);
    
// }

// console.log("start");
// const unlisten = await listen<string>('evtchan', (evt) => {
//     console.log(evt);
// })
// console.log("enddd");

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Greet from "./components/Greet.vue";
import Msgview from "./components/Msgview.vue";
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
let items2 = [
        { type: 'subheader', title: 'Today' },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          itemid: "",
          dtime: "",
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ',
          subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ];
for (let i = 0; i < 30; i++) {
    // console.log(i+3);
    let item0 =  { type: 'divider', inset: true };
    let item4 = {
        //   prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        prependAvatar: "../images/favicon.png",
          title: 'Recipe to try' + i,
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          itemid: "mid"+i,
          dtime: "dtime000",
        };
    items2.push(item0);
    items2.push(item4);
}
console.warn("hhehheeddd", items.length);

window.addEventListener('load', (evt) => {
    console.log("window load", evt);
    setupeventlisten();
})
///

// function dummy() {
//     return "https://randomuser.me/api/portraits/women/8.jpg";
// }

let msgiptdata = ref("");
let items3 = ref(items2);
async function sendmsg() {
    // alert('aaa');
    let words = "请使用中文回答以下问题, " + msgiptdata.value;
    // let prms = callfwdgo("sendmsg", ["hello 世界!!!"]);
    let prms = callfwdgo("sendmsg", [words]);
    prms.then((restxt) => {
        console.log(restxt);
    let resobj = JSON.parse(restxt);
    let retv0 = resobj.retv[0];
    let ccobj = JSON.parse(retv0);
    console.log(ccobj, ccobj.content, items2.length);
    console.log(items3.value.length);
    let msgobj = {
        //   prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        prependAvatar: "../images/favicon.png",
          title: 'Recipe to try' + items3.value.length,
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          dtime: '',
          itemid: '',
        };
    msgobj.title = resobj.argv[0];
    msgobj.subtitle = ccobj.content;
    msgobj.dtime = resobj.dtime;
    items3.value.push(msgobj);

    console.log(items3.value.length);
    msglstScrollHeadTail(false);
    })

}

function msglstScrollHeadTail(head : boolean){
    let e = document.getElementById('msglstscrwin');
    if (e == null) {return;}
    if (head ) {
        e.scrollTop = 0;
    }else {
        e.scrollTop = e.scrollHeight;
    }
}



import Page1 from "./components/Page1.vue";
import Page2 from "./components/Page2.vue";
import Page3 from "./components/Page3.vue";


// import { storeToRefs } from 'pinia'
// const sssref = storeToRefs(sss);
// let tabpagerefs = [
//     // sssref.tabpage0show,
//     // sssref.tabpage1show,
//     // sssref.tabpage2show
//     toRef(sss, "tabpage0show"),
//     toRef(sss, "tabpage1show"),
//     toRef(sss, "tabpage2show"),
// ];
// let tabpagerefs = [sss.tabpage0show,sss.tabpage1show,sss.tabpage2show];
// let tabpagerefs = [tabpage0show,tabpage1show,tabpage2show];

// let tabpagerefs = ref([false,false,true]);
// let tabpagerefs = sss.tabpageons1;

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
    }catch(e) {
        console.log(e);
    }

    return oldidx;
}
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

function upcnt() {
    sss.useval++;
}

</script>

<template>
    <div > {{ sss.useval }} 
        <span><button @click="upcnt()">upcnt</button></span></div>
    <div>
        <div v-show="(sss.tabpageons1)[0]" id="tabpage1">
        <Page1/>
        </div>
        <div v-show="(sss.tabpageons1)[1]" id="tabpage2">
        <Page2/>
        </div>
        <div v-show="(sss.tabpageons1)[2]" id="tabpage3">
        <Page3/>
        </div>
    </div>

    <div  style="width: auto; height: 450px; ">
        <div style="height:38px; width: 35%; ">
            <table><tr><td><img src="../images/favicon.png" width="23px"/></td>
                <td>Nickname<br/>&nbsp; sfffd</td>
                <td>
                    <form class="row">
                    <input style="width: 25%;"/>
                    <button type="submit">Greet</button>
                </form>
            </td>
            </tr></table>
        </div>
        <div style="height: 79%; width: 35%; overflow-y: scroll;  background: #2a2a2a;">
        <!-- <li v-for="item in items">
            {{ item }} yyy
        </li> -->

        <v-list
      :items="items3"
      lines="one"
      item-props
    >
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>

        </div>
        <div style="vertical-align: bottom; width: 35%; background: #666; position: absolute; top: 400px">
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><select name="ffff">
                    <option>ffffff</option>
                    <option>bbb</option>
                    <option selected>tttooooooo</option>
                    <option>eee</option>
                    <option>www</option>
            </select></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>

        </div>

        <div style="height:inherit; width: 64%;position: absolute; left: 36%; top: 0%; ">
            <div style="background-color:#666;">
                <span><button @click="switchtabpage(0)">btn1</button></span>
                <span><button @click="switchtabpage(1)">btn2</button></span>
                <span><select name="ffff">
                    <option>ffffff</option>
                    <option>bbb</option>
                    <option selected>tttooooooo</option>
                    <option>eee</option>
                    <option>www</option>
                </select></span>
                <span><button>btn3</button></span>
                <span><button>btn4</button></span>
                <span><button>btn5</button></span>
                <span><img @click="msglstScrollHeadTail(true)" width="20px" src="../images/favicon.png" title="SCT: scroll to top"/></span>
            </div>

            <div id="msglstscrwin" style="height:79%; width: 100%; overflow-y: scroll;">
            <!-- <li v-for="item in items"> -->
            <!-- {{ item }} yyy -->
            <span v-for="item in items3" style="width: 100%;" >
                <table border="0" style=" width: 100%;">
                    <tr><td rowspan="3" width="33px" style="vertical-align: top; align-content: center;"><img src="../images/border-diamonds.png" width="33px"/>
                         </td>
                        <td style="text-align:start; font-size: 12px; opacity: 0.5;"> feditype </td>
                        <td> Sender name </td>
                        <td> channnn {{ item.title }} </td>
                        <td style="text-align: end; font-size: 12px; opacity: 0.5;"> tmmmmmm </td>
                        <td rowspan="3" width="33px" style="vertical-align: top;"><img src="../images/border-diamonds.png" width="33px"/> </td>
                    </tr>
                    <tr><td colspan="4">

                        <div v-html="item.subtitle"></div>
                         <!-- dddd oiajefwef
                        aoiwej faowei fjoiwajefewf
                        aoiwejfaowei fjoiwajefewf
                        ouewr
                        oiweppdfg
                         -->
                    </td></tr>
                    <tr><td colspan="2" style="text-align: start;font-size: 12px; opacity: 0.5;"><img src="../images/border-diamonds.png" width="23px"/><span><a href="">linktofedisite</a></span>
                        <span> {{  item.itemid }}</span></td>
                        <td colspan="2" style="text-align: end;font-size: 12px; opacity: 0.5;">reactions222
                            <span><a href="">linktomsg</a></span>
                            <span> {{  item.dtime }}</span>
                        </td></tr>
                </table>
                <!-- <br/> -->
            </span>
            <!-- </li> -->
            </div>

            <div style="background-color: green; position: absolute; top: 400px; width: 100%;">
                <span><img src="../images/favicon.png" width="33px"/><button>btn1</button></span>
                <span><textarea v-model="msgiptdata" rows="3" style="width:40%; vertical-align: middle; background: transparent; color: white; font-size: 15px;" placeholder="输入消息(Input message)。。。"></textarea></span>
                <!-- <span><input style="width: 198px;"></span> -->
                <span><button v-on:click="sendmsg()">Send!</button></span>
                <span><button>btn12</button></span>
                <span><img @click="msglstScrollHeadTail(false)" width="20px" src="../images/favicon.png" title="SCB: scroll to bottom"/></span>
            </div>
        </div>
        
    </div>

    <hr/>
  <div class="container">
    <!-- <span>Welcome to Tauri!</span> -->

    <form class="row" @submit.prevent="cmd1(123,456)">
    <span> on the Tauri, Vite, and Vue logos to learn more.</span>
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>

    <p>你好，{{ greetMsg }} 来自 rust 的问候。</p>
  </form>

  <form class="row" @submit.prevent="addnum(123,456)">
    <span> on the Tauri, Vite, and Vue logos to learn more.</span>
    <input id="greet-input" v-model="name2" placeholder="Enter a name..." />
    <button type="submit">Greet</button>

    <p>计算结果：{{ greetMsg }} 来自 rsffigo。</p>
  </form>

    <div class="row">
        <span class="container">Welcome to Tauri!</span>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <!-- <p>Click on the Tauri, Vite, and Vue logos to learn more.</p> -->
    <Greet />
  </div>
  <hr/>


  <div class="container">
    <Msgview />
  </div>
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
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
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
