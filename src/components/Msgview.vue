<script setup lang="ts">
// import { Vue } from "vue";
// import { ref } from "vue";
import * as vue from 'vue';
// import { invoke } from "@tauri-apps/api/tauri";
// import { VueVirtualScroller } from 'vue-virtual-scroller';
import {ssscp} from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;
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

</script>

<template>

            <!-- <li v-for="item in items"> -->
            <!-- {{ item }} yyy -->
            <span v-for="item in sss.msglst" style="width: 100%;" >
                <table border="0" style=" width: 100%;">
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