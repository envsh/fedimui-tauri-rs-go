
<script setup lang="ts">
// import {ref} from 'vue';
import * as mylibg from '../mylib';
import { ssscp } from '../sharestatestore';
let sss = ssscp(); sss.useval +=1;
import * as ssg from '../sharestatestore';

let items2 = sss.msglst;
let items3 = sss.msglst;

async function sendmsg() {
    // alert('aaa');
    let words = "请使用中文回答以下问题： " + sss.msgiptdata;
    // let prms = callfwdgo("sendmsg", ["hello 世界!!!"]);
    let prms = mylibg.callfwdgo("sendmsg", [words]).then((restxt) =>  {
        console.log(restxt);
        mylibg.addmylog2(restxt);
        
    let resobj = JSON.parse(restxt);
    let retv0 = resobj.retv[0];
    let ccobj = JSON.parse(retv0);
    console.log(ccobj, ccobj.content, items2.length);
    console.log(items3.length);
    mylibg.addmylog2(ccobj, ccobj.content, items2.length);

    let msgobj = {
        //   prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        prependAvatar: "../images/favicon.png",
          title: 'Recipe to try' + items3.length,
          subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          dtime: '',
          itemid: '',
        };
    msgobj.title = resobj.argv[0];
    msgobj.subtitle = ccobj.content;
    msgobj.dtime = resobj.dtime;
    items3.push(msgobj);

    console.log("curmsglstcnt", items3.length);
    mylibg.addmylog2("curmsglstcnt", items3.length);
    ssg.msglstScrollHeadTail(false);
    }).catch((e) => {
        console.log("somerr", e);
        mylibg.addmylog2("somerr", e);
    });
}

// function checksendkey() {
//     console.log(evt);
// }

</script>

<template>

    <span><img src="../../images/favicon.png" width="33px"/><button>btn1</button></span>

    <span><textarea v-model="sss.msgiptdata" v-on:keydown.command.enter="sendmsg()" rows="3" style="width:40%; vertical-align: middle; background: transparent; color: white; font-size: 15px;" placeholder="输入消息(Input message)。。。"></textarea></span>

    <!-- <span><input style="width: 198px;"></span> -->
    <span><button v-on:click="sendmsg()">Send!</button></span>

    <span><button>btn12</button></span>

    <span><img class="button" @click="ssg.msglstScrollHeadTail(false)" width="20px" src="../../images/favicon.png" title="SCB: scroll to bottom"/></span>


</template>

