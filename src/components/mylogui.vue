<script setup lang="ts">
// for android
import {ssscp} from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;


</script>


<template>

<div style="height: 450; overflow-y: scroll;">
    <p>logcnt, {{ sss.loglst.length }}</p>
<li v-for="item,idx in sss.loglst">
    <span>{{ idx }}.  {{ item }}</span>
</li>
</div>
</template>