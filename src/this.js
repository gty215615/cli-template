export function $call() {
    const fn = this;
    const context = arguments[0] || global;
    const args = []

    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    context.fn = fn;
    //  此处传入的参数形式应该为 context.fn('arguments[1]', 'arguments[2]') 才可以获取到参数执行
    let result = eval('context.fn(' + args + ')')
    delete context.fn
    return result
}



export function $apply() {
    const fn = this;
    const context = arguments[0] || global;
    const args = Array.from(arguments)[1];
    let result;
    context.fn = fn
    if (!args) {
        result = context.fn()
    } else {
        result = context.fn(...args)
    }

    delete context.fn;
    return result
}

export function $bind() {
    const fn = this;
    const context = arguments[0]
    const args = Array.from(arguments).slice(1)
    if( typeof this !== 'function' ){
        throw new Error('this is not function')
    }
    function Temp() { }
    let result;
    result = function () {
        let restArgs = Array.from(arguments).slice(0);
        restArgs = args.concat(restArgs)
        //  当 result 用作构造函数时 ， 绑定的this会指向实例
        return fn.$call(this instanceof Temp ? this : context, ...restArgs)
    }
    //  避免直接修改了 this.prototype 
    Temp.prototype = this.prototype
    result.prototype = new Temp()
    return result
}

Function.prototype.$call = $call;
Function.prototype.$apply = $apply;
Function.prototype.$bind = $bind;
Object.prototype.$bind = $bind;




