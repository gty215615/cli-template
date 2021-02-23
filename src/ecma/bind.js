Function.prototype.$bind = function () {
    // 获取宿主对象
    const context = arguments[0]
    // 获取执行函数
    const fn = this;
    // 获取参数
    const args = Array.prototype.slice.call(arguments, 1)
    // 将执行函数绑定到宿主对象上返回
    //  通过new 调用 ，即fn通过构造函数调用，及实例的__proto__应该指向fn.prototype 而不是返回的匿名函数，且会忽略宿主对象
    const bindFn = function () {
        fn.apply(this instanceof fn ? this : context, args.concat(Array.from(arguments)))
    }
    function Temp() { }
    //  防止构造函数fn的原型被修改
    Temp.prototype = fn.prototype;
    bindFn.prototype = new Temp()
    return bindFn
}

function person(name, sex) {
    this.name = name
    this.sex = sex
    console.log(this);
    console.log(this.name);
    console.log(this.sex);
    console.log(this.age);
}


const mike = {
    age: 12
}

const bindFn = person.$bind(mike)

bindFn('mike', 'man')