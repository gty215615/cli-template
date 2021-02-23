
function $new() {
    // 模拟new 用法 $new(Constructor,params...)
    // 获取构造函数
    const contr = arguments[0]
    //  获取参数
    const args = Array.prototype.slice.call(arguments, 1)
    // 创建一个空对象
    const obj = Object.create(null)
    //  链接空对象到构造函数的原型
    obj.__proto__ = contr.prototype;
    //  用空对象调用构造函数
    const result = contr.apply(obj, args)
    //  返回值为object 则返回这个结果，否则返回创建的对象
    return typeof result === 'object' ? result : obj
}

function Person(name, sex) {
    this.name = name
    this.sex = sex
}

const student = $new(Person, 'student', 12)

console.log(student.name);
console.log(student.sex);





