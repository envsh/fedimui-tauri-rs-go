<script setup lang="ts">
import * as vue from 'vue';
// for android
import * as ssg from "../sharestatestore";
import {ssscp} from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;
import * as mylig from '../mylib';

vue.onMounted(()=>{mylig.uidebug('mounted')});
vue.onUnmounted(()=>{mylig.uidebug('unmounted')});

// \see https://runthatline.com/pinia-watch-state-getters-inside-vue-components/
vue.watch(() => sss.lastlog,
    (oldval) => {
        // 循环了，在这不能调用uidebug
        // mylig.uidebug("watched", "lastlog", oldval.length , "=>", curval.leng\th);
        console.log("watched", "lastlog", oldval);
        let elem = ssg.docelembyid("loglstview");
        elem.scrollTop = elem.scrollHeight;
    },
);

</script>

<template>

<p>logcnt, {{ sss.loglst.length }}</p>
<div id="loglstview" style="height: 450px; overflow-y: scroll;">
    <li v-for="item,idx in sss.loglst">
    <span>{{ idx }}.  {{ item }}</span>
</li>
</div>
</template>