
function $new(target) {
    //  new 关键字的作用
    const args = [].slice.call(arguments, 1)
    //  1. 创建一个空对象
    const obj = Object.create(target.prototype);
    //  2. 将对象的原型链接到目标对象上

    //  3. 执行目标函数
    let result = target.apply(obj, args)
    //  4. 若目标函数返回的为对象，则将该对象返回，否则将返回创建的对象
    result =  (result && typeof result === 'object') ? result : obj;

    return result
}


function Person(name, sex) {
    this.name = name
    this.sex = sex
}

const student = $new(Person, 'student', 12)

console.log(student.name);
console.log(student.sex);





