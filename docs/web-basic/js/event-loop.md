# 事件循环

&emsp;&emsp;当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境。这个过程反复进行，直到执行栈中的代码全部执行完毕。


&emsp;&emsp;js引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）

## 简易事件循环

**简易事件循环图解**

![event loop](https://upload-images.jianshu.io/upload_images/3635292-20ff21d33c514952.png)

## 浏览器环境

```js
eventLoop = {
  taskQueues: {
    events: [], // UI events from native GUI framework
    parser: [], // HTML parser
    callbacks: [], // setTimeout, requestIdleTask
    resources: [], // image loading
    domManipulation: []
  },

  microtaskQueue: [],

  nextTask: function() {
    // Spec says:
    // "Select the oldest task on one of the event loop's task queues"
    // Which gives browser implementers lots of freedom
    // Queues can have different priorities, etc.
    for (let q of taskQueues)
        if (q.length > 0)
            return q.shift();
    return null;
  },

  executeMicrotasks: function() {
    if (scriptExecuting)
        return;
    let microtasks = this.microtaskQueue;
    this.microtaskQueue = [];
    for (let t of microtasks)
        t.execute();
  },

  needsRendering: function() {
    return vSyncTime() && (needsDomRerender() || hasEventLoopEventsToDispatch());
  },

  render: function() {
    dispatchPendingUIEvents();
    resizeSteps();
    scrollSteps();
    mediaQuerySteps();
    cssAnimationSteps();
    fullscreenRenderingSteps();

    animationFrameCallbackSteps();

    intersectionObserverSteps();

    while (resizeObserverSteps()) {
      updateStyle();
      updateLayout();
    }
    paint();
  }
}
 
while(true) {
  task = eventLoop.nextTask();
  if (task) {
    task.execute();
  }
  eventLoop.executeMicrotasks();
  if (eventLoop.needsRendering()) {
    eventLoop.render();
  }
}
```

## node环境

### 事件循环模型

**libuv引擎中的事件循环的模型:**

```
 ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

### 事件循环各阶段详解

从上面这个模型中，我们可以大致分析出node中的事件循环的顺序：

外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段...

以上各阶段的名称是根据我个人理解的翻译，为了避免错误和歧义，下面解释的时候会用英文来表示这些阶段。

这些阶段大致的功能如下：

* timers: 这个阶段执行定时器队列中的回调如 setTimeout() 和 setInterval()。
* I/O callbacks: 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和setImmediate()的回调。
* idle, prepare: 这个阶段仅在内部使用，可以不必理会。
* poll: 等待新的I/O事件，node在一些特殊情况下会阻塞在这里。
* check: setImmediate()的回调会在这个阶段执行。
* close callbacks: 例如socket.on('close', ...)这种close事件的回调。

#### poll阶段

当个v8引擎将js代码解析后传入libuv引擎后，循环首先进入poll阶段。poll阶段的执行逻辑如下： 先查看poll queue中是否有事件，有任务就按先进先出的顺序依次执行回调。 当queue为空时，会检查是否有setImmediate()的callback，如果有就进入check阶段执行这些callback。但同时也会检查是否有到期的timer，如果有，就把这些到期的timer的callback按照调用顺序放到timer queue中，之后循环会进入timer阶段执行queue中的 callback。 这两者的顺序是不固定的，收到代码运行的环境的影响。如果两者的queue都是空的，那么loop会在poll阶段停留，直到有一个i/o事件返回，循环会进入i/o callback阶段并立即执行这个事件的callback。

值得注意的是，poll阶段在执行poll queue中的回调时实际上不会无限的执行下去。有两种情况poll阶段会终止执行poll queue中的下一个回调：1.所有回调执行完毕。2.执行数超过了node的限制。

#### check阶段

check阶段专门用来执行setImmediate()方法的回调，当poll阶段进入空闲状态，并且setImmediate queue中有callback时，事件循环进入这个阶段。

#### close阶段

当一个socket连接或者一个handle被突然关闭时（例如调用了socket.destroy()方法），close事件会被发送到这个阶段执行回调。否则事件会用process.nextTick（）方法发送出去。

#### timer阶段

这个阶段以先进先出的方式执行所有到期的timer加入timer队列里的callback，一个timer callback指得是一个通过setTimeout或者setInterval函数设置的回调函数。

#### I/O callback阶段

这个阶段主要执行大部分I/O事件的回调，包括一些为操作系统执行的回调。例如一个TCP连接生错误时，系统需要执行回调来获得这个错误的报告。

#### process.nextTick,setTimeout与setImmediate的区别与使用场景

在node中有三个常用的用来推迟任务执行的方法：process.nextTick,setTimeout（setInterval与之相同）与setImmediate

这三者间存在着一些非常不同的区别：

* **process.nextTick()**

尽管没有提及，但是实际上node中存在着一个特殊的队列，即nextTick queue。这个队列中的回调执行虽然没有被表示为一个阶段，当时这些事件却会在每一个阶段执行完毕准备进入下一个阶段时优先执行。当事件循环准备进入下一个阶段之前，会先检查nextTick queue中是否有任务，如果有，那么会先清空这个队列。与执行poll queue中的任务不同的是，这个操作在队列清空前是不会停止的。这也就意味着，错误的使用process.nextTick()方法会导致node进入一个死循环。。直到内存泄漏。

那么合适使用这个方法比较合适呢？下面有一个例子：

```js
const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
```

这个例子中当，当`listen`方法被调用时，除非端口被占用，否则会立刻绑定在对应的端口上。这意味着此时这个端口可以立刻触发`listening`事件并执行其回调。然而，这时候`on('listening)`还没有将callback设置好，自然没有callback可以执行。为了避免出现这种情况，node会在`listen`事件中使用`process.nextTick()`方法，确保事件在回调函数绑定后被触发。

* **setTimeout()和setImmediate()**

在三个方法中，这两个方法最容易被弄混。实际上，某些情况下这两个方法的表现也非常相似。然而实际上，这两个方法的意义却大为不同。

setTimeout()方法是定义一个回调，并且希望这个回调在我们所指定的时间间隔后第一时间去执行。注意这个“第一时间执行”，这意味着，受到操作系统和当前执行任务的诸多影响，该回调并不会在我们预期的时间间隔后精准的执行。执行的时间存在一定的延迟和误差，这是不可避免的。node会在可以执行timer回调的第一时间去执行你所设定的任务。

setImmediate()方法从意义上将是立刻执行的意思，但是实际上它却是在一个固定的阶段才会执行回调，即poll阶段之后。有趣的是，这个名字的意义和之前提到过的process.nextTick()方法才是最匹配的。node的开发者们也清楚这两个方法的命名上存在一定的混淆，他们表示不会把这两个方法的名字调换过来---因为有大量的node程序使用着这两个方法，调换命名所带来的好处与它的影响相比不值一提。

setTimeout()和不设置时间间隔的setImmediate()表现上及其相似。猜猜下面这段代码的结果是什么？

```js
setTimeout(() => {
    console.log('timeout');
}, 0);

setImmediate(() => {
    console.log('immediate');
});
```

实际上，答案是不一定。没错，就连node的开发者都无法准确的判断这两者的顺序谁前谁后。这取决于这段代码的运行环境。运行环境中的各种复杂的情况会导致在同步队列里两个方法的顺序随机决定。但是，在一种情况下可以准确判断两个方法回调的执行顺序，那就是在一个I/O事件的回调中。下面这段代码的顺序永远是固定的：

```js
const fs = require('fs');

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});
```

答案永远是：

immediate > timeout

因为在I/O事件的回调中，setImmediate方法的回调永远在timer的回调前执行。