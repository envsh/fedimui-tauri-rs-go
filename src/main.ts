import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";

import mylib from "./mylib";  // default section in mylib.ts
import {mylib as mylibc} from "./mylib"; // class mylib section in mylib.ts

console.log(mylib.dummy());
console.log(mylibc.dummy());

// import { emit, listen } from "@tauri-apps/api/event";

// remlog("ffff", 123, "456");

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
      },
  });

const piniafy = createPinia();

// createApp(App).mount("#app");
createApp(App).use(piniafy).use(vuetify).mount("#app");

console.log("will run here???");

// const unlisten = await listen<string>('evtchan', (evt) => {
// //     console.log(evt);
// })
