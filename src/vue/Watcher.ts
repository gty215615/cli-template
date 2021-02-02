
import Dep, { popTarget, pushTarget } from './Dep'

type TWatcherUpdateFC = () => any
type WatchFC = (newdata?: any, olddata?: any) => void

interface IWatcherOptions {
    lazy?: boolean;
    watch?: boolean;
    watchFC?: WatchFC
}

export default class Watcher {
    updateFC: TWatcherUpdateFC;
    value: any;
    lazy?: boolean;
    watch?: boolean;
    watchFC?: WatchFC;
    dirty?: boolean;
    dep?: Dep;
    constructor(update: TWatcherUpdateFC, options?: IWatcherOptions) {
        this.updateFC = update
        this.lazy = options?.lazy;
        this.dirty = options?.lazy;
        this.watch = options?.watch;
        this.watchFC = options?.watchFC;
        if (this.lazy) {
            this.dep = new Dep();
        } else {
            this.value = this.get()
        }

    }
    get() {
        pushTarget(this)
        const value = this.updateFC()
        popTarget()
        return value
    }
    update() {
        if (this.lazy) {
            this.dirty = true
        } else if (this.watch) {
            const value = this.value;
            this.value = this.get();
            this.watchFC && this.watchFC(this.value, value)
        } else {
            this.value = this.get()
        }

    }
    depend() {
        this.dep?.depend()
    }
    evluate() {
        this.value = this.get()
        this.dep?.notify()
        this.dirty = false
    }
}