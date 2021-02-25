function debounce(fn, wait, immediate) {
    let timer = 0
    debounce.cancel=function() {
        clearTimeout(timer)
        timer = null
    }
    return function () {
        const context = this;
        const args = arguments;
        if(timer){
            clearTimeout(timer)
        }
        if (immediate) {
            // 若立即执行，则第一次timer 为0 则callNow 为true，则立即执行，几秒之后清除timer
            var callNow = !timer;
            timer = setTimeout(() => {
                timer = null
            }, wait);
            if(callNow){
                fn.apply(context, args)
            }
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, wait)
        }

    

    }
    
}


