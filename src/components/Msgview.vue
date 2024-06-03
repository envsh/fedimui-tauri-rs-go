<script setup lang="ts">
// import { Vue } from "vue";
// import { ref } from "vue";
import * as vue from 'vue';
// import { invoke } from "@tauri-apps/api/tauri";
// import { VueVirtualScroller } from 'vue-virtual-scroller';
import {ssscp} from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;
import * as ssg from "../sharestatestore";
import * as mylig from '../mylib';

vue.onMounted(()=>{mylig.uidebug('mounted')});
vue.onUnmounted(()=>{mylig.uidebug('unmounted')});

// export default {
//     components: {
//         VueVirtualScroller
//     },
// }

// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
// import {RecycleScroller} from 'vue-virtual-scroller';
// App.components('RecycleScroller');

// const greetMsg = ref("");
// const name = ref("");

// let items  = ["iii", "jjjjj"];
// // let itemsref = ref(items);
// for (let i = 0; i < 100; i++) {
//     // console.log(i+3);
//     items.push("field字段"+i);
// }
// console.log(items.length);
// console.warn("hhehheeddd", sss.useval);

import ContextMenu from '@imengyu/vue3-context-menu'

function btntapshowctxmenu2(id, x: MouseEvent | TouchEvent) {
    mylig.uiinfo(id, x);
    console.log(id, x);
    if (id == undefined || x == undefined) {
        return;
    }
    let posx = 0;
    let posy = 0;
    if (x instanceof MouseEvent) {
        posx = x.clientX;
        posy = x.clientY;
    }
    else if (x instanceof TouchEvent) {
        let lastpt = x.changedTouches.item(x.changedTouches.length-1);
        posx = lastpt.clientX;
        posy = lastpt.clientY;
    }else {
        // wtf???
    }
    // if (x.button != 2 ) {
    //     return;
    // }
    // vuefloatmenumoveto(x.clientY,x.clientX);
    ContextMenu.showContextMenu({
        theme: "default dark",
    x: posx,
    y: posy,
    items: [
        {
        label: "Copy", 
        onClick: () => {
          mylig.uidebug("You click a menu item", id);
        }
      },
      {
        label: "Source", 
        onClick: () => {
          mylig.uidebug("You click a menu item");
        }
      },
      {
        label: "Edit", 
        onClick: () => {
          mylig.uidebug("You click a menu item");
        }
      },
      {
        label: "Delete", 
        onClick: () => {
          mylig.uidebug("You click a menu item");
        }
      },

    //   { 
    //     label: "A menu item", 
    //     onClick: () => {
    //       mylig.uidebug("You click a menu item");
    //     }
    //   },
    //   { 
    //     label: "A submenu", 
    //     children: [
    //       { label: "Item1" },
    //       { label: "Item2" },
    //       { label: "Item3" },
    //     ]
    //   },
    ]
  }); 
}

function tapcbwrap(id) { return (e)=>{btntapshowctxmenu2(id, e)}; }
function longtapcbwrap(id) { return (e)=>{btntapshowctxmenu2(id, e)}; }

// change item background
function holdcbwrap(id) { return (e)=>{
        let elemid = 'itemtbl'+id;
        // mylig.uidebug(elemid);
        let elem = ssg.docelembyid(elemid);
        elem.style.background = '#3a3a3a';
    }
}
// change item background
function releasecbwrap(id) { return (e)=>{
        let elemid = 'itemtbl'+id;
        // mylig.uidebug(elemid);
        let elem = ssg.docelembyid(elemid);
        elem.style.background = '';
    }
}

</script>

<template>

            <!-- <li v-for="item in items"> -->
            <!-- {{ item }} yyy -->
            <span v-for="item,idx in sss.msglst" style="width: 100%;"  :key="item.id"
            v-touch:tap="tapcbwrap(item.title)"
            v-touch:longtap="longtapcbwrap(idx)"
            v-touch:hold="holdcbwrap(idx)"
            v-touch:release="releasecbwrap(idx)"   >
                <table border="0" style=" width: 100%;" :id="'itemtbl'+ idx">
                    <tr><td rowspan="3" width="33px" style="vertical-align: top; align-content: center;"><img src="../../images/border-diamonds.png" width="33px"/>
                         </td>
                        <td style="text-align:start; font-size: 12px; opacity: 0.5;"> feditype </td>
                        <td> Sender name </td>
                        <td> channnn {{ item.title }} </td>
                        <td style="text-align: end; font-size: 12px; opacity: 0.5;"> tmmmmmm </td>
                        <td rowspan="3" width="33px" style="vertical-align: top;"><img src="../../images/border-diamonds.png" width="33px"/> </td>
                    </tr>
                    <tr><td colspan="4">

                        <div v-html="item.subtitle"></div>
                         <!-- dddd oiajefwef
                        aoiwej faowei fjoiwajefewf
                        aoiwejfaowei fjoiwajefewf
                        ouewr
                        oiweppdfg
                         -->
                    </td></tr>
                    <tr><td colspan="2" style="text-align: start;font-size: 12px; opacity: 0.5;"><img src="../../images/border-diamonds.png" width="23px"/><span><a href="">linktofedisite</a></span>
                        <span> {{  item.itemid }}</span></td>
                        <td colspan="2" style="text-align: end;font-size: 12px; opacity: 0.5;">reactions222
                            <span><a href="">linktomsg</a></span>
                            <span> {{  item.dtime }}</span>
                        </td></tr>
                </table>
                <!-- <br/> -->
            </span>
            <!-- </li> -->


</template>

<style scoped>
.scroller {
    height: 233px;
    overflow-y: scroll;
}
.user {
    height: 32%;
    display: flex;
    align-items: center;
}
</style>