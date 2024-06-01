<script setup lang="ts" >

import { ref } from 'vue';
import * as mylibg from '../mylib';

import { ssscp } from '../sharestatestore';
let sss = ssscp(); sss.useval +=1;
import * as ssg from '../sharestatestore';

// import Greet from './Greet.vue';

const greetMsg = ref("");
const greetMsg2 = ref("");
const name = ref("");
const name2 = ref("");

async function cmd1(...args) {
    let rv = await mylibg.cmd1(name.value, ...args);
    greetMsg.value = rv;
}
async function addnum(...args) {
    let rv = await mylibg.addnum(name2.value, ...args);
    greetMsg2.value = rv;
}

</script>


<template>

<div class="container">
    <!-- <span>Welcome to Tauri!</span> -->
    testuiiiiii

    <form class="row" @submit.prevent="cmd1(123,456)">
    <p><span> on the Tauri, Vite, and Vue logos to learn more.</span>
    </p>
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>

    <p>你好，{{ greetMsg }} 来自 rustgo 的问候。</p>
  </form>

  <form class="row" @submit.prevent="addnum(123,456)">
    <p><span> on the Tauri, Vite, and Vue logos to learn more.</span>
    </p>
    <input id="greet-input" v-model="name2" placeholder="Enter a name..." />
    <button type="submit">Greet</button>

    <p>计算结果：{{ greetMsg2 }} 来自 rsffigo。</p>
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
        <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <!-- <p>Click on the Tauri, Vite, and Vue logos to learn more.</p> -->
    <!-- <Greet /> -->
  </div>

</template>


<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

.logo {
  height: 44px;
  padding: 9px;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
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


</style>
