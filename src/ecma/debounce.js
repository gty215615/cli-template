export function debounce(callback, wait, immediate) {
    let timeout;
    let first = true
    return function () {
        const context = this;
        let args = Array.from(arguments)
        // 
        if (immediate && first) {
            callback.apply(context, args)
            first = false
        } else {
            timeout && clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback.apply(context, args)
            }, wait)
        }

    }
}


export function throllte() {
    let timeout
}