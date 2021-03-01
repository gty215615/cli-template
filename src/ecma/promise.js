
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
    this.rejectCallback = [];
    const _this = this;

    function resolve(value) {

        if (_this.status == PENDING) {
            _this.value = value
            _this.status = FULFILLED;
            _this.resolveCallback.forEach(cb => {
                cb(_this.value)
            });
        }
    }
    function reject(reason) {
        if (_this.status == PENDING) {
            _this.reason = reason
            _this.status = REJECTED;
            _this.rejectCallback.forEach(cb => {
                cb(_this.reason)
            });
        }

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
        promise2 = new $promise(function (resolve, reject) {
            _this.resolveCallback.push(function(value) {
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
            _this.rejectCallback.push(function(reason) {
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
        promise2 = new $promise(function(resolve, reject) {
            _this.resolveCallback.push(function(value) {
                try {
                    const x = fulfilledCb(_this.value)
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
        promise2 = new $promise(function(resolve, reject)  {
            _this.rejectCallback.push(function(reason) {
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


new $promise(function (resolve,reject) {
    resolve(1)
}).then(res => {
    console.log('=======1=======');
    console.log(res);
}).then(res => {
    console.log('=======2=======');
    console.log(res);
})