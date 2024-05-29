import { createApp } from "vue";

import App from "./App.vue";

import mylib from "./mylib";  // default section in mylib.ts
import {mylib as mylibc} from "./mylib"; // class mylib section in mylib.ts

console.log(mylib.dummy());
console.log(mylibc.dummy());

import { emit, listen } from "@tauri-apps/api/event";

// remlog("ffff", 123, "456");


createApp(App).mount("#app");

console.log("will run here???");

// const unlisten = await listen<string>('evtchan', (evt) => {
// //     console.log(evt);
// })
