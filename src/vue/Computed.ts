import Watcher from './Watcher'

type ComputedGetter = () => any

const computedWatcherOption = { lazy: true }
interface IComputed {
    value:any
}
export default function computed(getter: ComputedGetter) {
    let dir:IComputed = {value:''}
    const computedWatcher = new Watcher(getter, computedWatcherOption)
    Reflect.defineProperty(dir, 'value', {
        get() {
            computedWatcher.depend()
            if (computedWatcher.dirty) {
                computedWatcher.evluate()
            }
            return computedWatcher.value;
        },
    })

    return dir
}