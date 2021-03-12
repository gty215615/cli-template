/*
resolvePromise函数即为根据x的值来决定promise2的状态的函数
也即标准中的[Promise Resolution Procedure](https://promisesaplus.com/#point-47)
x为`promise2 = promise1.then(onResolved, onRejected)`里`onResolved/onRejected`的返回值
`resolve`和`reject`实际上是`promise2`的`executor`的两个实参，因为很难挂在其它的地方，所以一并传进来。
相信各位一定可以对照标准把标准转换成代码，这里就只标出代码在标准中对应的位置，只在必要的地方做一些解释
*/
function MyPromise(exector) {
    this.value = undefined, this.status = 'pending', this.reason = undefined, this.resolveCallback = [], this.rejectedCallback = [];
    this.resolvePromise = resolvePromise;
    const self = this;

    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'fulfilled'
            self.resolveCallback.forEach(resolve => {
                resolve(value)
            })
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected'
            self.rejectedCallback.forEach(resolve => {
                resolve(reason)
            })
        }
    }
    function resolvePromise(promise, x, resolve, reject) {
        let then;
        let promiseCallOrThrow = false;
        if (x === promise) {
            throw TypeError('type error!')
        }
        if (x instanceof MyPromise) {
            if (x.status === 'pending') {
                //  若 x 处于pending状态，那么他的值会是一个 thenable ， 所以需要 [[resolve]](promise,value)
                x.then(function (value) {
                    resolvePromise(promise, value, resolve, reject)
                })
            } else {
                //  若 x 的值已经是确定的，那么直接取他的状态为新的promise的状态
                x.then(resolve, reject)
            }
            return
        }
        if (x !== null && typeof x === 'object' || typeof x === 'function') {
            try {
                then = x.then;
                if (typeof then === 'function') {

                    then.call(x, function re(y) {
                        if (promiseCallOrThrow) return
                        promiseCallOrThrow = true
                        resolvePromise(promise, y, resolve, reject)
                    },
                        function rj(r) {
                            if (promiseCallOrThrow) return
                            promiseCallOrThrow = true
                            reject(r)
                        })

                } else {
                    resolve(x)
                }
            } catch (e) {
                if (promiseCallOrThrow) return
                promiseCallOrThrow = true
                reject(e)
            }
        } else {
            resolve(x)
        }
    }
    try {
        exector(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

MyPromise.prototype.then = function (onFulfilledCb, onRejectedCb) {
    const onResolved = typeof onFulfilledCb === 'function' ? onFulfilledCb : function (value) { return value };
    const onRejected = typeof onRejectedCb === 'function' ? onRejectedCb : function (error) { throw error };

    const self = this;
    let promise2, x;
    if (self.status === 'pending') {
        promise2 = new MyPromise(function (resolve, reject) {
            self.resolveCallback.push(function (value) {
                try {
                    x = onResolved(value)
                    self.resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            self.rejectedCallback.push(function (reason) {
                try {
                    x = onRejected(reason)
                    self.resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    else if (self.status === 'fulfilled') {
        promise2 = new MyPromise(function (resolve, reject) {
            try {
                x = onResolved(self.value)
                self.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
                reject(e)
            }
        })
    } else if (self.status === 'rejected') {
        promise2 = new MyPromise(function (resolve, reject) {
            try {
                x = onRejected(self.reason)
                self.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
                reject(e)
            }
        })
    }
    return promise2
}


MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}


