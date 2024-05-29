
function dummy() {
    return "dummyfn from module global";
}

export class mylib {
    static dummy() {
        return "dummyfn from class static method";
    }
    
}

export default {
    aaa :  2,
    bbb : [2,3,4],
    ccc : ["c","d","e"],

    dummy() {
        return "dummyfn from export default";
    }

}