Function.prototype.$call = function () {
    // 获取宿主对象
    const context = arguments[0]
    //  获取调用函数
    const fn = this;
    //  将调用函数挂载到宿主对象
    context._fn = fn
    //  拼接传入的参数
    let args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    //  将参数传入调用
    let result = eval('context._fn(' + args + ')')
    //  删除宿主对象上的调用函数
    delete context._fn;
    return result
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
    age:12
}

person.$call(mike,'mike','man')

console.log(mike);