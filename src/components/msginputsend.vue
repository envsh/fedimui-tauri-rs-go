
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

function sentmsgrestore(msg) {
    if (msg.startsWith(sss.sndmsgpfxs.dftim)) {
        return msg.substr(sss.sndmsgpfxs.dftim.length);
    }
    return msg;
}

async function sendmsg(x) {
    // alert('aaa');
    console.log(x);
    mylibg.uidebug(sss.msgsndmode + ' ' + sss.msgiptdata);
    if (sss.msgiptdata == '') {
        toastnote('没有发送消息内容，发送类型：' + sss.msgsndmode + x);
        return;
    }
    let words = sss.sndmsgpfxs["dftim"] + sss.msgiptdata;
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
          feditype: '',
          fedipic: '',
          ctime: mylibg.nowtmstrzh(),
          username : "cfai",
          channame : 'general',
        };

    msgobj.title = resobj.argv[0];
    msgobj.title = sentmsgrestore(resobj.argv[0]);
    msgobj.subtitle = ccobj.content;
    msgobj.dtime = resobj.dtime;
    msgobj.feditype = "gptcf";
    msgobj.fedipic = "../images/cloudflareai.png";
    msgobj.fedipic = sss.tstpics[3];
    msgobj.prependAvatar = msgobj.fedipic;
    items3.push(msgobj);

    console.log("curmsglstcnt", items3.length);
    mylibg.addmylog2("curmsglstcnt", items3.length);
    // ssg.msglstScrollHeadTail(false);
    // window.setTimeout();
    mylibg.runonce(2333, ()=>{ssg.msglstScrollHeadTail(false);});
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

    <span><img src="../../icons/add.png" width="23px" v-tooltip="'添加图片/文件'"/></span>
    <button>btn1</button>

    <!-- <span><textarea v-model="sss.msgiptdata" v-on:keydown.command.enter="sendmsg()" rows="2"
            style="width:40%; vertical-align: middle; background: transparent; color: white; font-size: 15px;"
            placeholder="输入消息(Input message)。。。"></textarea></span> -->
    <v-textarea v-on:keydown.meta.enter="sendmsg" auto-grow clearable
        placeholder="输入消息(Input message)。。。" variant="underlined" rows="2"
        v-model="sss.msgiptdata"></v-textarea>

    <!-- <span><input style="width: 198px;"></span> -->
    <span><button v-on:click="sendmsg">Send!</button></span>
    <img width="33" src="../../icons/cursor_gray64.png" v-tooltip="'Send!'"/>

    <!-- <span><button>btn12</button></span> -->
    &nbsp;

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
            src="../../icons/barbuttonicon_down_2x.png" title="SCB: scroll to bottom" /></span>
</template>

