import { defineStore } from "pinia";
// import { storeToRefs } from 'pinia'
import { ref } from "vue";
// import { reactive, toRefs } from "vue";

// Removes 'readonly' attributes from a type's properties
// type CreateMutable<Type> = {
//     -readonly [Property in keyof Type]: Type[Property];
// };

// nested version
// type CreateMutableNest<T> = { -readonly [P in keyof T]: CreateMutableNest<T[P]> }

// ref usage, 
// import {sss} from './sharestatestore';
// 也可以在.vue中直接引用 sss.items, 只是isRef()==false, 但是修改值还是有效的
// let myvar = sss.items; 
//
export const ssscp = defineStore({
    id: "ssscp",
    state: () => ({
        useval: ref(1), // for dummy
        items: ref([]),
        items2: ref([]),
        items3: ref([]),

        tabpageons1: ref([false,false,true]), ///////////
        tabpageons2: ref([false,false,true]), ///////////
        tabpageons3: ref([false,false,true]), ///////////
        // tabwidget states
        // tabpage0show: false,// as CreateMutable<boolean>,
        // tabpage1show: false,// as CreateMutable<boolean>,
        // tabpage2show: true,// as CreateMutable<boolean>,        
    }),
    

    actions: {
        f1() {

        },

        f2() {

        },

        f3() {

        },

    }
});

// 无效
// export let ssscp = storeToRefs(x());
