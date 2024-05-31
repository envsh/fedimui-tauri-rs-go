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
createApp(App).use(logger).use(piniafy).use(vuetify).mount("#app");

console.log("will run here???");
logger.warn("fff");

// const unlisten = await listen<string>('evtchan', (evt) => {
// //     console.log(evt);
// })
