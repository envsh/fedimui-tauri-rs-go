<script setup lang="ts">
// import { ref } from "vue";
// import { invoke } from "@tauri-apps/api/core";

import * as ssg from "../sharestatestore";
import {ssscp} from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;

// const greetMsg = ref("");
// const name = ref("");

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//   greetMsg.value = await invoke("greet", { name: name.value });
// }
</script>

<template>
    <span>aboutttttt.....</span>
    <p>tauri version: {{ sss.trappver }}</p>
    <p>intowinload: {{ sss.intowinload }}</p>
    <p>evtlsned: {{ sss.evtlsned }}</p>
    <p>trunlsnfn: {{ sss.tauriunlsnfn }} </p>
    <p>weburl: {{ sss.weburl }} </p>
    <p>userAgent: {{ sss.userAgent }} </p>
    <p>rcvevtcnt: {{ sss.rcvevtcnt }}</p>
    <p>webviewsize: {{ sss.webviewsize }}</p>
    <p>vuejsver: {{ sss.vuejsver }}</p>
    <p>callorder: {{ sss.loadmnt }}</p>
    <p>window: {{ sss.wndwdt }}x{{ sss.wndhgt }}</p>
    <p>screen: {{ sss.scnwdt }}x{{ sss.scnhgt }}</p>
  <!-- <form class="row" @submit.prevent="greet">
    <span> on the Tauri, Vite, and Vue logos to learn more.</span>
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>
  </form>

  <p>你好，{{ greetMsg }} 来自 rust 的问候。</p> -->
</template>
