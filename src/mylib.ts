
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
    let retval = await invoke<string>("callfwdgo", prm);
    return retval;
}

export
async function cmd1(...args : any) {
    let respval = await callfwdgo("cmd1", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);
}

export
async function addnum(val: number, ...args : any) : Promise<string> {
    args.push(val);
    let respval = await callfwdgo("addnum", args);
    let jso = JSON.parse(respval);
    console.log(jso.retc, jso.retv);
    let retval = jso.retv[0];
    // greetMsg.value = jso.retv[0];

    // remlog("log111", "v222", 333);
    return retval;
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