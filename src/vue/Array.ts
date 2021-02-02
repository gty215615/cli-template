import Observe from './Observe'
const ArrayProto = Array.prototype;


const enum ArrayMethodEnum {
    SLICE = 'slice',
    PUSH = 'push',
    POP = 'pop',
    SHIFT = 'shift',
    UNSHIFT = 'unshift',
    CONCAT = 'concat',
    SPLICE = 'splice'
}

const ArrayMethods = [
    'slice',
    'push',
    'pop',
    'shift',
    'unshift',
    'concat',
    'splice',
]

ArrayMethods.forEach(method => {
    const originMehods = (ArrayProto as any)[method]
    function rewrite(...args: any[]) {
        const result = originMehods.apply((this), ...args)

        let inserted = null;
        switch (method) {
            case
                ArrayMethodEnum.PUSH,
                ArrayMethodEnum.UNSHIFT:
                inserted = args[0];
                break;
            case
                ArrayMethodEnum.SPLICE:
                inserted = args[2];
        }
        if(inserted){
            new Observe(inserted)
        }
       
    }
    Reflect.defineProperty(ArrayProto, method, {

    })
})