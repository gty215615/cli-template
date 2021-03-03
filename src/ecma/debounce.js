/**
 * 防抖 ： 函数延迟执行，在延迟期间如果有再次触发函数执行的操作，则会导致延迟的时间重新计时
 * @param {*} fn 
 * @param {*} wait 
 * @param {*} immediate 
 */

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

/**
 * 节流： 函数在一段时间内仅仅执行一次，在此期间后续触发将会忽视
 * @param {*} fn 
 * @param {*} wait 
 */

function throttle(fn,wait) {
    
}


