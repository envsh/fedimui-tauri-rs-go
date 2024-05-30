<script setup lang="ts">
// import { Vue } from "vue";
// import { ref } from "vue";
// import { invoke } from "@tauri-apps/api/tauri";
// import { VueVirtualScroller } from 'vue-virtual-scroller';

// export default {
//     components: {
//         VueVirtualScroller
//     },
// }

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
// import {RecycleScroller} from 'vue-virtual-scroller';
// App.components('RecycleScroller');

// const greetMsg = ref("");
// const name = ref("");

let items  = ["iii", "jjjjj"];
for (let i = 0; i < 100; i++) {
    // console.log(i+3);
    items.push("field字段"+i);
}
console.log(items.length);
console.warn("hhehheeddd");



</script>



<template>
    <!-- <div style="height:233px; overflow-y: scroll;"> -->
        <!-- <RecycleScroller class="scroller" :items="items" :item-size="32" v-slot="{ item }" >
        <div class="user">
            {{ item }} xxx
        </div>
    </RecycleScroller> -->
    <!-- </div> -->

    <!-- <div style="height:233px; overflow-y: scroll;">
        <li v-for="item in items">
            {{ item }} yyy
        </li>
    </div> -->



    <!-- <table v-for="item in items"> -->
    <!-- <li v-for="item in items"> -->
    <!-- <span v-for="childItem in item.children"> -->
        <!-- {{ item.message }} {{ childItem }} -->

            <!-- <tr>
                <td>{{item}} 111</td>
                <td>{{item}} 222</td>
                <td>{{item}} 333</td>
                <td>{{item}} 444</td>
                <td>{{item}} 555</td>
                <td>{{item}} 666</td>
            </tr> -->

        
        <!-- {{item}} -->
    <!-- </span> -->
    <!-- </li> -->
    <!-- </table> -->
    <!-- <span v-for="n in 300">{{ n }} body内容。。。yyy</span> -->
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