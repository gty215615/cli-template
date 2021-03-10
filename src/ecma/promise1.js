


const
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected';

class MyPromise {
    constructor(exector) {
        this.value = undefined;
        this.reason = undefined;
        this.status = 'pending';
        this.resolvedCallback = [];
        this.rejectedCallback = [];
        try {
            exector(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }
    resolve(value) {
        if (this.status === 'pending') {
            this.value = value;
            this.status = 'fulfilled',
                this.resolvedCallback.forEach(resolve => {
                    resolve(value)
                })
        }
    }
    reject(reason) {
        if (this.status === 'pending') {
            this.reason = reason;
            this.status = 'rejected',
                this.rejectedCallback.forEach(reject => {
                    reject(reason)
                })
        }
    }
    then(onFulfilledCb, onRejectedCb) {
        const onResolved = typeof onFulfilledCb === 'function' ? onFulfilledCb : (value) => { return value }
        const onRejected = typeof onRejectedCb === 'function' ? onRejectedCb : (error) => { throw error }
        let promise2, x;
        const self = this;
        if (self.status === 'pending') {

            promise2 = new MyPromise((resolve, reject) => {
                self.resolvedCallback.push(function (value) {
                    try {
                        x = onResolved(value);
                        // 处理 x 的结果 ，根据Promise/A+ 规范对x值得不同做不同的处理 ， 获取结果的状态给 promise2
                        self._resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                self.rejectedCallback.push(function (reason) {
                    try {
                        x = onRejected(reason);
                        // 处理 x 的结果 ，根据Promise/A+ 规范对x值得不同做不同的处理
                        self._resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        } else if (self.status === 'fulfilled') {
            promise2 = new MyPromise((resolve, reject) => {
                try {
                    x = onResolved(self.value);
                    // 处理 x 的结果 ，根据Promise/A+ 规范对x值得不同做不同的处理 ,
                    self._resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        } else if (self.status === 'rejected') {
            promise2 = new MyPromise((resolve, reject) => {
                try {
                    x = onRejected(self.reason);
                    // 处理 x 的结果 ，根据Promise/A+ 规范对x值得不同做不同的处理
                    self._resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        }
        return promise2
    }
    //  根据Promise/A+规范实现的 [[resolve]]
    _resolvePromise(promise, x, resolve, reject) {
        let then, promiseResolveOrReject = false;
        if (x === promise) {
            throw TypeError('type Error!')
        }
        const self = this;
        //  如果 x 为另一个新的 Promise
        if (x instanceof MyPromise) {
            //  此处 x 的状态 可能会是 thenable(即x的状态还未确定) ， 所以要区别对待
            if (x.status === 'pending') {
                x.then((value) => {
                    self._resolvePromise(promise, value, resolve, reject)
                }, reject)
            } else {
                x.then(resolve, reject)
            }
            return
        }
        //  如果 x 为对象，且具有 .then 属性， 通常是为了和别的 promise 实现相互兼容
        if (x !== null && typeof x === 'object' || typeof 'x' === 'function') {
            then = x.then;
            if (typeof then === 'function') {
                try {
                    //  若 then 为函数，则需要将x作为 then的作用域来调用 then
                    then.call(x, function resolvePromise(y) {
                        if (promiseResolveOrReject) return
                        promiseResolveOrReject = true;
                        self._resolvePromise(promise, y, resolve, reject)
                    }, function rejectPromise(r) {
                        if (promiseResolveOrReject) return
                        promiseResolveOrReject = true;
                        reject(r)
                    })
                } catch (e) {
                    if (promiseResolveOrReject) return
                    promiseResolveOrReject = true;
                    reject(e)
                }
            } else {
                resolve(x)
            }

        } else {
            resolve(x)
        }
    }
    catch(onRejectedCb) {
        return this.then(null, onRejectedCb)
    }
    finally(onFinallyCb) {
        return this.then((value) => {
            // 要保證最後執行
            setTimeout(onFinallyCb)

            return value
        }, (reason) => {
            setTimeout(onFinallyCb)
            throw reason
        })
    }
}

MyPromise.all = function (promises) {
    let resloveCount = 0;
    let length = promises.length;
    let resolveArray = new Array(length);
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < length; i++) {
            MyPromise.resolve(promises[i]).then(value => {
                resloveCount++;
                resolveArray.push(value)
                if (resloveCount === length) {
                    resolve(resolveArray)
                }
            }, (e) => {
                reject(e)
            })

        }
    })
}


MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            MyPromise.resolve(promises[i]).then(value => {
                resolve(value)
            }, (e) => {
                reject(e)
            })
        }
    })
}

