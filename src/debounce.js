export function debounce(callback, wait) {
    let timeout;

    return function () {
        const context = this;
        clearTimeout(timeout)
        let args = Array.from(arguments)
        timeout = setTimeout(() => {
            callback.apply(context, args)
        }, wait)
    }
}


export function throllte() {
    let timeout
}