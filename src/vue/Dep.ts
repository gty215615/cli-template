import Watcher from './Watcher'

export default class Dep {
    static target: Watcher | undefined;
    subs: Set<Watcher>
    constructor() {
        this.subs = new Set()
    }
    depend() {
        if (Dep.target) {
            this.subs.add(Dep.target)
        }
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}
export const targetStack:Array<Watcher> = [];

export const pushTarget = (target:Watcher)=>{
    targetStack.push(target);
    Dep.target = target;
}

export const popTarget = ()=>{
    targetStack.pop();
    Dep.target = targetStack[targetStack.length-1];
}