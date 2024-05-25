<script setup lang="ts">
// import { ref } from "vue";
// import { invoke } from "@tauri-apps/api/tauri";


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
    <table v-for="item in items">
    <!-- <li v-for="item in items"> -->
    <!-- <span v-for="childItem in item.children"> -->
        <!-- {{ item.message }} {{ childItem }} -->

            <tr>
                <td>{{item}} 111</td>
                <td>{{item}} 222</td>
                <td>{{item}} 333</td>
                <td>{{item}} 444</td>
                <td>{{item}} 555</td>
                <td>{{item}} 666</td>
            </tr>

        
        <!-- {{item}} -->
    <!-- </span> -->
    <!-- </li> -->
    </table>
    <!-- <span v-for="n in 300">{{ n }} body内容。。。yyy</span> -->
</template>
