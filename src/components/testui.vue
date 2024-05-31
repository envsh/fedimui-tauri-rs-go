<script setup lang="ts" >

import { ref } from 'vue';
import * as mylibg from '../mylib';
import Greet from './Greet.vue';

const greetMsg = ref("");
const name = ref("");
const name2 = ref("");


</script>


<template>

<div class="container">
    <!-- <span>Welcome to Tauri!</span> -->

    <form class="row" @submit.prevent="mylibg.cmd1(123,456)">
    <span> on the Tauri, Vite, and Vue logos to learn more.</span>
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>

    <p>你好，{{ greetMsg }} 来自 rust 的问候。</p>
  </form>

  <form class="row" @submit.prevent="mylibg.addnum(123,456)">
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

</template>