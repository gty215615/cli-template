
import Watcher from './vue/Watcher'
import Observe from './vue/Observe'
import computed from './vue/Computed'
import watch from './vue/Watch'

type TVueContainer = string | HTMLElement
interface IVue {
    el: TVueContainer,
    props?: object;
    data?: object;
    methods?: object;
    computed?: object;
    watch?: object;
    setup?: () => any;
}



function proxy(target: any, proxyData: any) {
    let data = target[proxyData]


    Reflect.ownKeys(data).forEach(key => {

        Reflect.defineProperty(target, key, {
            get() {
                return target[proxyData][key]
            },
            set(value) {
                if (value != target[proxyData][key]) {
                    target[proxyData][key] = value
                }
            }
        })
    })
}
class Vue {
    el: HTMLElement;
    options: IVue;
    props?: object;
    data?: object;
    methods?: object;
    computed?: object;
    watch?: object;
    setup?: () => any;
    constructor(options: IVue) {
        this.el = typeof options.el === 'string' ? this.query(options.el) : options.el;
        this.options = options
        this.setup = options && options.setup
        proxy(this.options, 'data')

        proxy(this.options, 'computed')
        this.init()
    }
    query(selector: string): HTMLElement {
        return document.querySelector(selector) as HTMLElement
    }
    init() {

        this.initState()
        this.compile()
        this.setup && this.setup()
    }
    initState() {
        this.data = this.options.data
        this.methods = this.options.methods
        this.computed = this.options.computed
        this.initData()
        this.initComputed()
        this.initWatch()

    }
    initData() {

        this.data && new Observe(this.data)


    }
    initComputed() {
        this.computed && Reflect.ownKeys(this.computed).forEach((key) => {

            const getter = computed(((this.computed as any)[key]))
            Reflect.defineProperty(this, key, {
                get: getter,
                set: () => {

                }
            })
        })
    }
    initWatch() {
        this.watch && Reflect.ownKeys(this.watch).forEach((key) => { watch(() => { return key }, (this.watch as any)[key]) })
    }
    compile() {
        this.data && Reflect.ownKeys(this.data).forEach((key) => {

            const dom = this.query('.' + String(key))

            new Watcher(() => {
                dom.innerHTML = ((this.data as any)[key])
            })
        })
        this.computed && Reflect.ownKeys(this.computed).forEach((key) => {

            const dom = this.query('.' + String(key))

            console.log((this as any)[key])
            // new Watcher(() => {
            //     dom.innerHTML = ((Vue as any)[key])
            // })
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {

    const app = new Vue({
        el: '#app',

        data: {
            count: 1,
            num: 2
        },
        computed: {
            doubleCount: (() => {
                console.log(this);

                return 2
            }),
            // doubleNum: () => {
            //     console.log(Vue);
            //     return (Vue as any).num * 2
            // },
        },
    })


})
