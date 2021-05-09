# React的生命周期

React的生命周期分为4个阶段：

* 挂载（4个）
* 更新（5个）
* 卸载（1个）
* 错误处理（2个）

## 挂载时阶段

* constructor()
组件加载时调用一次，初始化state。

* static getDerivedStateFromProps(nextProps, prevState)
组件加载时调用，返回一个对象来更新state。

* render()
返回虚拟DOM树

* componentDidMount(prevProps, prevState)
组件挂载之后调用一次

更新时阶段

* static getDerivedStateFromProps(nextProps, prevState)
组件更新时都会调用，返回一个对象来更新state。

* shouldComponentUpdate(nextProps, nextState)
当 props 或 state 发生变化时，在渲染前调用，如果返回 true 就继续调用后面的 render 函数；如果返回 false 就阻止调用后面的钩子函数。

* render()
返回虚拟DOM树

* getSnapshotBeforeUpdate(prevProps, prevState)
在最近一次的渲染更新到 DOM 节点之前调用，返回一个值作为 componentDidUpdate 的第三个参数。

* componentDidUpdate(prevProps, prevState, snapshot)
组件更新之后调用

## 卸载时阶段

* componentWillUnmount()
在组件销毁之前直接调用

## 错误处理阶段

* static getDerivedStateFromError(error)
在渲染阶段调用，它将抛出的错误作为参数，并返回一个对象来更新state

* componentDidCatch(error, info)
在提交阶段被调用，用于记录错误

