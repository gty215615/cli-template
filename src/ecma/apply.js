Function.prototype.$apply = function () {
    // 获取宿主对象
    const context = arguments[0]
    //  获取待执行函数
    const fn = this
    //  挂载函数到宿主对象上
    context._fn = fn
    //  获取参数,参数以数组的形式传入待执行函数
    if (!Array.isArray(arguments[1])) {
        throw Error('type arguemnts is not array!')
    }
    const args = arguments[1]

    //  执行函数
    const result = context._fn(...args)
    //  删除宿主对象上的函数
    delete context._fn
    //  返回函数执行结果
    return result
}


function person(name,sex) {
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

person.$apply(mike, ['mike', 'man'])

console.log(mike);