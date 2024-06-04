<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

import { ssscp } from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;

const greetMsg = ref("");
const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}

let tstpics = [ "../../images/favicon.png", "../../images/maleuser.png",  "../../images2/3.jpg", "../../images2/4.jpg", "../../images2/5.jpg"];
</script>

<template>
    
  <form class="row" @submit.prevent="greet">
    <p><span> on the Tauri, Vite, and Vue logos to learn more.</span></p>
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>
  </form>

  <p>你好，{{ greetMsg }} 来自 rust 的问候。page111</p>

  <p>使用本机名称方式</p>
  <span v-for="imgsrc, idx in tstpics">
    {{ idx }}. <img width="90" v-bind:src="imgsrc">
    </span>

<hr/>
<p>使用vite打包名称方式</p>
    <!-- 这是可以在vue费用的bundle名称 -->
    <span v-for="imgsrc, idx in sss.tstpics">
    {{ idx }}. <img width="90" :src="imgsrc">
    </span>
</template>
