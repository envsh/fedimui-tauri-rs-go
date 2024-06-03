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

// import VueRouter from 'vue-router';
import {createMemoryHistory, createRouter } from 'vue-router';
const router = createRouter({
    // 路由配置
    routes: [
        // {
        //   path: '/',
        // //   component: Home
        // },
        // {
        //   path: '/about',
        // //   component: About
        // }
      ],
    history: createMemoryHistory(),
});


// createApp(App).mount("#app");
const vapp = createApp(App);
// let cpx = vapp.component('vue-navigation-bar', VueNavigationBar);
// cpx.config.compilerOptions.isCustomElement = ()=>{return true};
vapp.use(logger).use(piniafy).use(vuetify);
vapp.use(router);

// \see https://github.com/robinrodricks/vue3-touch-events?tab=readme-ov-file#events
import Vue3TouchEvents from "vue3-touch-events";
vapp.use(Vue3TouchEvents);

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
vapp.use(ContextMenu);

// floating-vue 没有内置的 dark真是失败
import 'floating-vue/dist/style.css'
import FloatingVue from 'floating-vue'
vapp.use(FloatingVue)

import "vue-select/dist/vue-select.css";
import vSelect from 'vue-select'
vapp.component('v-select', vSelect)

  
// https://pinia.vuejs.org/core-concepts/outside-component-usage.html
// after installing the pinia plugin with app.use(pinia) will work:
import {ssscp} from "./sharestatestore";
const sss = ssscp(); sss.useval += 1;
sss.vapp = vapp;
vapp.mount("#app");

sss.vuejsver = vapp.version;
console.log("will run here???", vapp.version);
logger.warn("fff");

// const unlisten = await listen<string>('evtchan', (evt) => {
// //     console.log(evt);
// })
