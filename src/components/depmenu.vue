<script setup lang="ts">
import {ref} from 'vue';
import * as ssg from "./../sharestatestore";
import {ssscp} from "./../sharestatestore";
const sss = ssscp(); sss.useval += 1;
import mylib, * as mylibg from "../mylib";

// import brandImage from '../src/assets/images/lockup-color.png'
// let navbarOptions = {
//           elementId: "main-navbar",
//           menuOptionsLeft: [
//             {
//               type: "link",
//               text: "Pricing",
//             //   path: { name: "pricing"},
//               iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>',
//             },
//           ],
//           menuOptionsRight: [
//             {
//               type: "button",
//               text: "Signup",
//             //   path: { name: "signup" },
//               class: "button-red"
//             },
//           ]
//     };

import { DockMenu } from "vue-dock-menu";
import "vue-dock-menu/dist/vue-dock-menu.css";
ssg.getCurrApp().component('vue-dock-menu', DockMenu);
// how modify menu runtime???
let mainmenu_items = [
        {
          name: "File",
          menu: [{ name: "Open"}, {name: "New Window"}, {name: "Exit"}]
        },
        {
          name: "Edit",
          menu: [{ name: "Cut剪切"}, {name: "Copy"}, {name: "Paste"}]
        },
        {
            name: "Window",
            iconSlot: "window",
            menu: [ {name: "Prev <"}, {name: "Next >"}, 
                    { name : "First <<"},{name: "Last >>"},
                    { isDivider: true },
                    // { name: "-------", disable: true},
                    { name: "group list"},
                    {name: "message List"}, {name: "logui"}, 
                    {name: "about"}, {name: "testui"},]
        },
        {
            name: "Misc",
            menu: [{ name : "upcnt"}, {name: "Scroll Top"}, {name: "Scroll Bottom"}]
        },
        {
            name: "Dev",
            menu: [{ name : "Reload"}, {name: "DevTools"}, {name: "sidebar"},]
        },
        {
            name: "Help",
            menu: [{ name : "Reload"},{name: "about"},
                {name: "ddd"}, {name: "eee"}]
        },

      ];

// dummy
function upcnt() {}
function nexttabpage(x) {}
function switchtabpage(x) {}
function reloadui() {}
let sidebarshow = ref(false);

let mainmenu_funcs = {
    "misc>upcnt":  upcnt,

    "window>prev <": ()=>{ nexttabpage(true) },
    "window>next >": ()=>{ nexttabpage(false)},
    "window>first <<": ()=> {switchtabpage(0)},
    "window>last >>": ()=> {switchtabpage(8)},
    "window>group list": ()=> {switchtabpage(2)},
    "window>message list": ()=> {switchtabpage(1)}, 
    "window>logui": ()=> {switchtabpage(6)},
    "window>about": ()=> {switchtabpage(4)}, 
    "window>testui": ()=> {switchtabpage(5)}, 
    "help>about": ()=> {switchtabpage(4)}, 

    "dev>reload": reloadui,
    "dev>devtools": ()=> { mylibg.devtools() }, // why mylibg.devtools not work
    "dev>sidebar": ()=> { sidebarshow.value = !sidebarshow.value;},

    "misc>scroll bottom": ()=>{ssg.msglstScrollHeadTail(false)},
    "misc>scroll top": ()=>{ssg.msglstScrollHeadTail(true)},
}
function mainmenu_selected(item) {
    // console.log("mmsel", item); // {name:, path:}
    let fn = mainmenu_funcs[item.path];
    if (fn != null) {
        fn();
    }else{
        mylibg.uiwarn("menu func not found", item.path);
    }
}


</script>

<template>


</template>