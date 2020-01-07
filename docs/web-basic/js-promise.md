# Promise相关

## Promise是什么

Promise是异步编程的一种解决方案，它包含三种状态：pending、fulfilled、rejected

## Promise解决的问题

* 多层嵌套函数形成回调地狱
* 异步和同步调用顺序控制问题

## Promise的实现

* new Promise时，需要传递一个 callback 执行函数
* callback 函数接收两个参数，分别是 resolve 函数和 reject 函数
* promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled，之后不会再改变
* promise 都有 then 方法并接收两个参数，分别是成功的回调 onFulfilled, 和失败的回调 onRejected
* 如果调用 then 时，promise 的状态是已完成，那么执行 onFulfilled，并将 promise 的值作为参数传递进去
* 如果调用 then 时，promise 的状态是已拒绝，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去
* 如果调用 then 时，promise 的状态是等待中，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
* then 的参数 onFulfilled 和 onRejected 可以缺省
* then 方法可以使用链式调用，并返回一个新的 promise 对象
* 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调(onFulfilled)
* 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
* 如果 then 返回的是一个promise，那么需要等这个promise，那么会等这个promise执行完；promise如果成功，就走下一个then的成功，如果失败，就走下一个then的失败回调

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise(executor) {
    let self = this;
    self.state = PENDING;
    self.onFulfilled = [];//成功的回调
    self.onRejected = []; //失败的回调
    //PromiseA+ 2.1
    function resolve(value) {
        if (self.state === PENDING) {
            self.state = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());//PromiseA+ 2.2.6.1
        }
    }

    function reject(reason) {
        if (self.state === PENDING) {
            self.state = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn());//PromiseA+ 2.2.6.2
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    let self = this;
    //PromiseA+ 2.2.7
    let promise2 = new Promise((resolve, reject) => {
        if (self.state === FULFILLED) {
            //PromiseA+ 2.2.2
            //PromiseA+ 2.2.4 --- setTimeout
            setTimeout(() => {
                try {
                    //PromiseA+ 2.2.7.1
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    //PromiseA+ 2.2.7.2
                    reject(e);
                }
            });
        } else if (self.state === REJECTED) {
            //PromiseA+ 2.2.3
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (self.state === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    });
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    let self = this;
    //PromiseA+ 2.3.1
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used; //PromiseA+2.3.3.3.3 只能调用一次
        try {
            let then = x.then;
            if (typeof then === 'function') {
                //PromiseA+2.3.3
                then.call(x, (y) => {
                    //PromiseA+2.3.3.1
                    if (used) return;
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    //PromiseA+2.3.3.2
                    if (used) return;
                    used = true;
                    reject(r);
                });

            }else{
                //PromiseA+2.3.3.4
                if (used) return;
                used = true;
                resolve(x);
            }
        } catch (e) {
            //PromiseA+ 2.3.3.2
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        //PromiseA+ 2.3.3.4
        resolve(x);
    }
}

```