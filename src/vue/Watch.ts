

import Watcher from './Watcher'
type WatchGetter = (newdata: any, olddata: any) => any

const WatchWatcherOption = { watch: true, }

export default function watch(getter: () => any, watchFC: WatchGetter) {
    const watchWatcher = new Watcher(getter, { ...WatchWatcherOption, watchFC })
}