<script setup lang="ts">
import * as vue from 'vue';
// for android
import {ssscp} from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;
import * as mylig from '../mylib';

vue.onMounted(()=>{mylig.uidebug('mounted')});
vue.onUnmounted(()=>{mylig.uidebug('unmounted')});
</script>


<template>

<div style="height: 450; overflow-y: scroll;">
    <p>logcnt, {{ sss.loglst.length }}</p>
<li v-for="item,idx in sss.loglst">
    <span>{{ idx }}.  {{ item }}</span>
</li>
</div>
</template>