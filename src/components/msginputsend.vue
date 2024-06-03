
<script setup lang="ts">
// import {ref} from 'vue';
import * as vue from 'vue';
import * as mylibg from '../mylib';
import { ssscp } from '../sharestatestore';
let sss = ssscp(); sss.useval +=1;
import * as ssg from '../sharestatestore';

vue.onMounted(()=>{mylibg.uidebug("mounted")});

let items2 = sss.msglst;
let items3 = sss.msglst;

async function sendmsg() {
    // alert('aaa');
    mylibg.uidebug(sss.msgsndmode + ' ' + sss.msgiptdata);
    if (sss.msgiptdata == '') {
        toastnote('没有发送消息内容');
        return;
    }
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
    // ssg.msglstScrollHeadTail(false);
    // window.setTimeout();
    mylibg.runonce(()=>{ssg.msglstScrollHeadTail(false);}, 3333);
    }).catch((err) => {
        mylibg.errprt(err);
        console.log("somerr", err);
        mylibg.addmylog2("somerr", err);
    });
}

// function checksendkey() {
//     console.log(evt);
// }

import { toast as vtoast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
function toastnote(txt) {
    const notify = () => {
    //   vtoast("Wow so easy !", {
    vtoast(txt, {
        autoClose: 1634,
        theme: 'dark',
        type: 'error',
      }); // ToastOptions
    }
    notify();
}
</script>

<template>

    <span><img src="../../images/favicon.png" width="33px" /><button>btn1</button></span>

    <span><textarea v-model="sss.msgiptdata" v-on:keydown.command.enter="sendmsg()" rows="3"
            style="width:40%; vertical-align: middle; background: transparent; color: white; font-size: 15px;"
            placeholder="输入消息(Input message)。。。"></textarea></span>

    <!-- <span><input style="width: 198px;"></span> -->
    <span><button v-on:click="sendmsg()">Send!</button></span>

    <span><button>btn12</button></span>

    <span><select name="ffff" v-model="sss.msgsndmode" v-tooltip="'发送方式，调整发送格式或者发送目标'" on-select="">
            <option>dftim</option>
            <option>gptcf</option>
            <option>gptoa</option>
            <option>misskey</option>
            <option>nostr</option>
            <option>cmd</option>
        </select></span>

    <!-- 怎么不好用呢 -->
    <!-- <v-select :options="['Canada', 'United States']"
    style="display: inline-flex;"></v-select> -->

    <span><img class="button" @click="ssg.msglstScrollHeadTail(false)" width="20px"
            src="../../images/favicon.png" title="SCB: scroll to bottom" /></span>


</template>

