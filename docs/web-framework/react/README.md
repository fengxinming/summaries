# React

## React 和 Vue 的区别

* 监听数据变化的实现原理
  * React通过 shouldComponentUpdate 钩子函数控制是否重新渲染整个组件树
  * Vue通过 getter/setter 以及一些函数的劫持，能精确地计算出虚拟dom的差异，渲染依赖的组件树，不需要重新渲染整个组件树

* HOC和mixins
  * React通过HOC在不修改原组件的情况下扩展组件周期函数和功能。
  * Vue使用mixin方法扩展周期函数和功能，这种方式对组件的侵入式强。

* 组件通信
  * React
    * 父组件通过props向子组件传递数据或者回调
    * 通过 Provider/Consumer 进行跨层级的通信
  * Vue
    * 父组件通过props向子组件传递数据和使用事件回调接收子组件回传
    * 通过v-model或者.sync语法糖实现双向数据绑定
    * 通过 provide/inject 进行跨层级的通信

* 模板渲染方式
  * React使用js和html的混合语法jsx开发项目
  * Vue使用vue模板，html、css和js结构分离的形式开发

* 框架本质不同
  * React是前端组件化框架，由后端组件化演变而来
  * Vue本质是MVVM框架，由MVC架构演变而来