
import { isPlainObject } from './util'

import Dep from './Dep'

export type TObserve = object | Array<any>;

interface IReactive {
    [key: string]: any
}

export default class Observe {
    value: TObserve;
    constructor(value: TObserve) {
        this.value = value;
        if (isPlainObject(this.value)) {
            this.walk()
        }
    }
    walk() {
        Reflect.ownKeys(this.value).forEach(key => {
            defineReactive(this.value, key as string)
        })
    }
}



export const defineReactive = (target: IReactive, key: string) => {
    if (!isPlainObject(target)) {
        return false
    }
    let val = target[key];
    if(isPlainObject(val)){
        new Observe(val)
    }
    const dep = new Dep()
    //  劫持对象 . 语法
    Reflect.defineProperty(target, key, {
        get() {
            dep.depend()
            console.log(`${key} was tracked`);
            return val
        },
        set(value) {
            if (val != value) {
                val = value
                dep.notify()
            }
        }
    })
}