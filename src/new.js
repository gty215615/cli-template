export function $new() {
    const fn = arguments[0]
    const args = Array.from(arguments).slice(1)
    let instance = Object.create(fn.prototype);
    const result = fn.apply(instance, args)

    if (Object.prototype.toString.call(result).slice(8, -1) === 'Object') {
        return result
    } else {
        return instance
    }

}