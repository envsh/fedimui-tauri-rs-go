import { createPinia } from "pinia";
import { createApp } from "vue";
import { createLogger } from "vue-logger-plugin";

import App from "./App.vue";


import mylib from "./mylib";  // default section in mylib.ts
import {mylib as mylibc} from "./mylib"; // class mylib section in mylib.ts
import * as mylibg from "./mylib";
import * as sssg from "./sharestatestore";

console.log(mylib.dummy());
console.log(mylibc.dummy());
console.log(mylibg.dummy());
console.log(sssg.dummy());

// import { emit, listen } from "@tauri-apps/api/event";

// remlog("ffff", 123, "456");

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import VueNavigationBar from 'vue-navigation-bar';
// import 'vue-navigation-bar/dist/vue-navigation-bar.css';
// import {useRouter} from 'vue-router'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
      },
  });

const piniafy = createPinia();

const logger = createLogger({
    enabled: true,
    consoleEnabled: true,
    level: 'debug',
    callerInfo: true,
    // prefixFormat: "pfxwww",
    // default prefixFormat
    // prefixFormat: ({ level, caller }) => (
    //     caller
    //       ? `[${level.toUpperCase()}] [${caller?.fileName}:${caller?.functionName}:${caller?.lineNumber}]`
    //       : `[${level.toUpperCase()}]`
    //   )
    // beforeHooks: [ ... ],
    // afterHooks: [ ... ]
  });

// createApp(App).mount("#app");
const vapp = createApp(App);
// let cpx = vapp.component('vue-navigation-bar', VueNavigationBar);
// cpx.config.compilerOptions.isCustomElement = ()=>{return true};
vapp.use(logger).use(piniafy).use(vuetify);
  
// https://pinia.vuejs.org/core-concepts/outside-component-usage.html
// after installing the pinia plugin with app.use(pinia) will work:
import {ssscp} from "./sharestatestore";
const sss = ssscp(); sss.useval += 1;
sss.vapp = vapp;
vapp.mount("#app");

console.log("will run here???");
logger.warn("fff");

// const unlisten = await listen<string>('evtchan', (evt) => {
// //     console.log(evt);
// })
