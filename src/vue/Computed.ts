import Watcher from './Watcher'

type ComputedGetter = () => any

const computedWatcherOption = { lazy: true }
interface IComputed {
    value: any
}
export default function computed(getter: ComputedGetter) {
 
    const computedWatcher = new Watcher(getter, computedWatcherOption)

    return (    ()=> {
        computedWatcher.depend()
        if (computedWatcher.dirty) {
            computedWatcher.evluate()
        }
        return computedWatcher.value;
    })
   
   

}