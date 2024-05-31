
<script setup lang="ts">

import Page1 from "./components/Page1.vue";
import Page2 from "./components/Page2.vue";
import Page3 from "./components/Page3.vue";

import {ref} from 'vue';
let tabpagerefs = ref([false,false,true]);
// from sharestatestore.ts which ss.tabpageons=ref([boolean])
// let tabpagerefs = sss.tabpageons);

function switchtabpage(_idx: number) {}
window.addEventListener('load',  (evt) => {
    console.log("window load", evt);
    switchtabpage(1);
});

// 展示使用数组维护类似 tabwidget 或者 stacked widget 的显示与切换
// 目前还没有封装完成，只能拷贝使用，不能 import 使用。
</script>

<template>
    <div>
        <div v-show="tabpagerefs[0]" id="tabpage1">
        <Page1/>
        </div>
        <div v-show="tabpagerefs[1]" id="tabpage2">
        <Page2/>
        </div>
        <div v-show="tabpagerefs[2]" id="tabpage3">
        <Page3/>
        </div>
    </div>
</template>
