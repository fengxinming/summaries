# Webpack简介

## 概念

webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。[传送门](https://webpack.docschina.org/)

## Webpack构建流程

1. 加载配置文件，初始化 Compiler 对象
2. 加载所有的内置插件，执行 Compiler 对象的run方法
3. 根据配置中的 entry 找出所有的入口文件，开始递归的分析依赖，对每个依赖模块进行构建
4. 使用文件对应的 loader 加载并转换成 js 代码，并用 acom 模块解析 js 代码生成抽象语法树
5. 遍历此抽象语法树，当遇到 require 等表达式，触发 `call require` 事件回调，收集依赖
6. 所有依赖构建完成后，开始优化chunk，比如：合并、抽取公共模块、添加hash等等
7. 生成入口文件对应的输出代码
8. 把各个chunk输出到 dist 目录中

![Webpack流程图](https://image-static.segmentfault.com/409/704/4097041329-5bb819bb224a7_articlex)

```js
const {
    Tapable,
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook
} = require("tapable");

class Compiler extends Tapable {
  constructor(context) {
    super();
    this.hooks = {
      /** @type {SyncBailHook<Compilation>} */
      //所有需要输出的文件已经生成好，询问插件哪些文件需要输出，哪些不需要。
      shouldEmit: new SyncBailHook(["compilation"]),
      /** @type {AsyncSeriesHook<Stats>} */
      //成功完成一次完成的编译和输出流程。
      done: new AsyncSeriesHook(["stats"]),
      /** @type {AsyncSeriesHook<>} */
      additionalPass: new AsyncSeriesHook([]),
      /** @type {AsyncSeriesHook<Compiler>} */
      beforeRun: new AsyncSeriesHook(["compiler"]),
      /** @type {AsyncSeriesHook<Compiler>} */
      //启动一次新的编译
      run: new AsyncSeriesHook(["compiler"]),
      /** @type {AsyncSeriesHook<Compilation>} */
      // 确定好要输出哪些文件后，执行文件输出，可以在这里获取和修改输出内容。
      emit: new AsyncSeriesHook(["compilation"]),
      /** @type {AsyncSeriesHook<Compilation>} */
      // 输出完毕
      afterEmit: new AsyncSeriesHook(["compilation"]),
                    // 以上几个事件(除了run，beforerun为编译阶段)其余为输出阶段的事件
      /** @type {SyncHook<Compilation, CompilationParams>} */
      // compilation 创建之前挂载插件的过程
      thisCompilation: new SyncHook(["compilation", "params"]),
      /** @type {SyncHook<Compilation, CompilationParams>} */
      // 创建compilation对象
      compilation: new SyncHook(["compilation", "params"]),
      /** @type {SyncHook<NormalModuleFactory>} */
      // 初始化阶段：初始化compilation参数
      normalModuleFactory: new SyncHook(["normalModuleFactory"]),
      /** @type {SyncHook<ContextModuleFactory>}  */
      // 初始化阶段：初始化compilation参数
      contextModuleFactory: new SyncHook(["contextModulefactory"]),

      /** @type {AsyncSeriesHook<CompilationParams>} */
      beforeCompile: new AsyncSeriesHook(["params"]),
      /** @type {SyncHook<CompilationParams>} */
      // 该事件是为了告诉插件一次新的编译将要启动，同时会给插件带上 compiler 对象
      compile: new SyncHook(["params"]),
      /** @type {AsyncParallelHook<Compilation>} */
      //一个新的 Compilation 创建完毕，即将从 Entry 开始读取文件，根据文件类型和配置的 Loader 对文件进行编译，编译完后再找出该文件依赖的文件，递归的编译和解析。
      make: new AsyncParallelHook(["compilation"]),
      /** @type {AsyncSeriesHook<Compilation>} */
      // 一次Compilation执行完成
      afterCompile: new AsyncSeriesHook(["compilation"]),

      /** @type {AsyncSeriesHook<Compiler>} */
      //监听模式下启动编译（常用于开发阶段）
      watchRun: new AsyncSeriesHook(["compiler"]),
      /** @type {SyncHook<Error>} */
      failed: new SyncHook(["error"]),
      /** @type {SyncHook<string, string>} */
      invalid: new SyncHook(["filename", "changeTime"]),
      /** @type {SyncHook} */
      // 如名字所述
      watchClose: new SyncHook([]),

      // TODO the following hooks are weirdly located here
      // TODO move them for webpack 5
      /** @type {SyncHook} */
      //初始化阶段：开始应用 Node.js 风格的文件系统到compiler 对象，以方便后续的文件寻找和读取。
      environment: new SyncHook([]),
      /** @type {SyncHook} */
      // 参照上文
      afterEnvironment: new SyncHook([]),
      /** @type {SyncHook<Compiler>} */
      // 调用完内置插件以及配置引入插件的apply方法，完成了事件订阅
      afterPlugins: new SyncHook(["compiler"]),
      /** @type {SyncHook<Compiler>} */
      afterResolvers: new SyncHook(["compiler"]),
      /** @type {SyncBailHook<string, EntryOptions>} */
      // 读取配置的 Entrys，为每个 Entry 实例化一个对应的 EntryPlugin，为后面该 Entry 的递归解析工作做准备。
      entryOption: new SyncBailHook(["context", "entry"])
    };
  }
}
```