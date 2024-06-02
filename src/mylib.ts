
// import { useLogger } from "vue-logger-plugin";
// const log = useLogger();
// const logger = require('pino')();
import * as pino from 'pino';
// const getCaller = require('get-caller-file')
let log = pino.pino();
log.level = "debug";

// console.log(pino);
log.warn("hereeee by pino", log.level);
log.debug("hereeee by pino");

// Can't find variable: process
// import * as winston from 'winston';
// const winston = require('winston');
// const log2 = winston.createLogger({
//   level: 'debug',
//   format: winston.format.json(),
//   transports: [new winston.transports.Console()],
// });
// log2.info('Hello from Winston logger! by winston');

// export 就不会提示没有使用过的定义了

export
function dummy() {
    return "dummyfn from module global";
}

///////////// tauri rpc

// todo result format
export
async function callfwdgo(cmd : string, args : [any]) : Promise<string> {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    let prm = { jstr: JSON.stringify({cmd: cmd, argc: args.length, argv: args })};
  //   console.log(prm);
    addmylog2(prm.jstr);
    let retval = await invoke<string>("callfwdgo", prm);
    addmylog2(retval, "of", prm.jstr);
    return retval;
}

export
async function cmd1(...args : any) {
    let respval = await callfwdgo("cmd1", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);
    addmylog2(jso.retc,  jso.retv);
    return jso.retv;
}

export
async function addnum(val: number | string, ...args : any) : Promise<string> {
    args.push(val);
    let respval = await callfwdgo("addnum", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);
    addmylog2(jso.retc,  jso.retv);
    let retval = jso.retv[0];
    // greetMsg.value = jso.retv[0];

    // remlog("log111", "v222", 333);
    return retval;
}

export
async function remlogo(...args : any) /*: Promise<string>*/ {
    let respval = await callfwdgo("remlog", args);    
    // let jso = JSON.parse(respval);
    // console.log(jso.retc, jso.retv);
    // addmylog2(jso.retc,  jso.retv);
    // let retval = jso.retv[0];
    // greetMsg.value = jso.retv[0];

    // remlog("log111", "v222", 333);
    // return retval;
}

/////// sss
var sss = null; //
export 
function setsss(sss2) { sss = sss2; }
export
function addmylog2(...args) {
    // let lst = sss.loglst;
    let str = '';
    for (let i = 0; i < args.length; i++) {
        str += args[i] + ' ';
    }
    // console.log(str);
    if (sss != null) {
        sss.loglst.push(str);
    }
}
export
function addmylog(lst, ...args) {
    // let lst = sss.loglst;
    let str = '';
    for (let i = 0; i < args.length; i++) {
        str += args[i];
    }
    // console.log(str);
    lst.push(str);
}

//////////////
// once, or until, or forever
class fnrunner {
    mode: string = "once" // once, until, forever, times
    ms : number
    times: number = -1
    f : any
    args: any
    tmer : number
    cnter : number = 0
    btime = new Date()
    
    constructor(mode, ms, times, f, ...args) {
        this.f = f;
        this.ms = ms;
        this.times = times;
        this.args = args;
    }
    run() {
        switch (this.mode) {
            case "once":
                this.runonce(); break;
            case "until":
                this.rununtil(); break;
            case "forever":
                this.runforever(); break;
            case "times":
                this.runtimes(); break;
            default:
                console.log("unsupport", this.mode);
        }
    }
    runonce() {
        this.tmer = setTimeout((me) => {
            this.f(...me.args);
            clearTimeout(me.tmer);
            console.log("runok", me.mode, me.ms, me.args);
        }, this.ms, this);
    }
    rununtil() {
        this.tmer = setTimeout((me) => {
            me.cnter++;
            let stop = this.f(...me.args);
            if (stop) {
                clearTimeout(me.tmer);
                console.log("runok", me.mode, me.ms, me.args, me.cnter);
            }else {
                console.log("rungoon",  me.mode, me.ms, me.args, me.cnter);
            }
        }, this.ms, this);
    }
    runforever() {
        this.tmer = setTimeout((me) => {
            me.cnter++;
            this.f(...me.args);
            // clearTimeout(o.tmer);
            // console.log("runok", o.ms, o.args);
        }, this.ms, this);
    }
    runtimes() {
        this.tmer = setTimeout((me) => {
            me.cnter++;
            this.f(...me.args);
            if (me.cnter>me.times) {
                clearTimeout(me.tmer);
                console.log("runok", me.mode, me.ms, me.args);
            }
        }, this.ms, this);
    }
}
export function runonce(ms, f, ...args) {
     (new fnrunner("once", ms, -1, f, ...args)).run();
}
export function rununtil(ms, f, ...args) {
     (new fnrunner("until", ms, -1, f, ...args)).run();
}
export function runforever(ms, f, ...args) {
     (new fnrunner("forever", ms, -1, f, ...args)).run();
}
export function runtimes(ms, times, f, ...args) {
     (new fnrunner("times", ms, times, f, ...args)).run();
}


///////
export 
class ffiparam {
    argc = 0;
    argv = [] ;

    retc  = 0;
    retv = [];

    errmsg = "succ";
    code = 0;
};

export 
class mylib {
    static dummy() {
        return "dummyfn from class static method";
    }
    
}

import { invoke } from "@tauri-apps/api/core";
// import { debug, level } from 'winston';

export default {
    aaa :  2,
    bbb : [2,3,4],
    ccc : ["c","d","e"],

    dummy() {
        return "dummyfn from export default";
    },


};