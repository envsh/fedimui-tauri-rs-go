<script setup lang="ts">

import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

class ffiparam {
    argc : number;
//     argv : [];

    retc : number;
//     retv : [];

//     errmsg: string;
    code: number;
};


const greetMsg = ref("");
const respmsg = ref("");
const name = ref("");
const name2 = ref("");

async function callfwdgo(cmd : string, args : [any]) {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  let prm = { jstr: JSON.stringify({cmd: cmd, argc: args.length, argv: args })};
//   console.log(prm);
  respmsg.value = await invoke("callfwdgo", prm);
  return respmsg.value;
}

async function cmd1(...args : [any]) {
    let respval = await callfwdgo("cmd1", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);
}
async function addnum(...args : [any]) {
    args.push(name2.value);
    let respval = await callfwdgo("addnum", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);
    greetMsg.value = jso.retv[0];
}


// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Greet from "./components/Greet.vue";
import Msgview from "./components/Msgview.vue";

// import VueVirtualScroller from 'vue-virtual-scroller';
// app.use(VueVirtualScroller);

let items  = ["iii", "jjjjj"];
for (let i = 0; i < 100; i++) {
    // console.log(i+3);
    items.push("field字段"+i);
}
console.log(items.length);
console.warn("hhehheeddd");

</script>

<template>
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
  <div style="height:233px; overflow-y: scroll;">
        <li v-for="item in items">
            {{ item }} yyy
        </li>
    </div>

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
