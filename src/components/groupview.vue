<script setup lang="ts">
import * as vue from 'vue';
import * as ssg from "../sharestatestore";
import {ssscp} from "../sharestatestore";
const sss = ssscp(); sss.useval += 1;
import * as mylig from "../mylib";

vue.onMounted(()=>{mylig.uidebug('mounted')});
vue.onUnmounted(()=>{mylig.uidebug('unmounted')});


</script>

<template>

    lefttttt groupview

    <!-- 放在pc上，width 35%, 放在 android上，100%。 -->

    <div style="height:48px; width: 95%; background: cadetblue;">
            <table border="0" width="100%"><tr><td>
                <img src="../../images/favicon.png" width="23px"/></td>
                <td align="center" title="descccccc"> Nickname <br/>&nbsp;
                    <span style="font-size: 12px;">sfffd{{ sss.useval }}</span> </td>
                <td align="right">
                    x<input style="width: 50%;" placeholder="keywords..."/>
                    <button type="submit">SCH</button>
                </td>
            </tr></table>
        </div>

        <!-- chatroom list -->
        <div style="height: 79%; width: 95%; overflow-y: scroll;  background: #2a2a2a;">
            <!-- <li v-for="item in items">
                {{ item }} yyy
            </li> -->

            <v-list :items="sss.romlst" lines="one" item-props>
                <template v-slot:subtitle="{ subtitle }">
                    <div v-html="subtitle"></div>
                </template>
            </v-list>

        </div>
        <div style="vertical-align: bottom; width: 95%; background: #666; position: absolute; top: 550px">
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><select name="ffff">
                    <option>ffffff</option>
                    <option>bbb</option>
                    <option selected>tttooo</option>
                    <option>eee</option>
                    <option>www</option>
            </select></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>
            <span><button>btn1</button></span>

        </div>



</template>