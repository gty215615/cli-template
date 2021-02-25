
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function $promise(exector) {
    // promise 状态 ： FULFILLED 解决  REJECTED 拒绝 PENDING 等待 初始为等待状态，状态只能由等待状态转变为 解决 或 拒绝，一旦改变，则不能再次修改
    this.status = PENDING;
    //  终值 当 promise 被解决时会传递给回调的值
    this.value = undefined;
    //  拒绝的原因 ，当promise 被拒绝时会传递给回调的值
    this.reason = undefined;
    this.resolveCallback = [];
    this.rejectCallback = []
    function resolve(value) {
        this.value = value
        this.status = FULFILLED;
        this.resolveCallback.forEach(cb => {
            cb(this.value)
        });
    }
    function reject(reason) {
        this.reason = reason
        this.status = REJECTED;
        this.rejectCallback.forEach(cb => {
            cb(this.reason)
        });
    }
    try {
        exector(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

$promise.prototype.then = function (onFulfilled, onRejected) {
    const fulfilledCb = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value }
    const rejectedCb = typeof onRejected === 'function' ? onRejected : function (e) { throw e }

    const _this = this;
    let promise2
    if (_this.status === PENDING) {
        promise2 = new $promise((resolve, reject) => {
            _this.resolveCallback.push((value) => {
                try {
                    const x = fulfilledCb(value)
                    if (x === promise2) {
                        throw new Error('TypeError')
                    }
                    if (x instanceof $promise) {
                        x.then(resolve, reject)
                    }
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
            _this.rejectCallback.push((reason) => {
                try {
                    const x = rejectedCb(reason)
                    if (x === promise2) {
                        throw new Error('TypeError')
                    }
                    if (x instanceof $promise) {
                        x.then(resolve, reject)
                    }
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
        })
    } else if (_this.status === FULFILLED) {
        promise2 = new $promise((resolve, reject) => {
            _this.resolveCallback.push((value) => {
                try {
                    const x = fulfilledCb(value)
                    if (x === promise2) {
                        throw new Error('TypeError')
                    }
                    if (x instanceof $promise) {
                        x.then(resolve, reject)
                    }
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
        })
    } else if (_this.status === REJECTED) {
        promise2 = new $promise((resolve, reject) => {
            _this.rejectCallback.push((reason) => {
                try {
                    const x = rejectedCb(reason)
                    if (x === promise2) {
                        throw new Error('TypeError')
                    }
                    if (x instanceof $promise) {
                        x.then(resolve, reject)
                    }
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
    return promise2



}