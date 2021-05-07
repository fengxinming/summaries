(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{156:function(l,v,t){"use strict";t.r(v);var _=t(0),i=Object(_.a)({},(function(){var l=this,v=l.$createElement,t=l._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":l.$parent.slotKey}},[t("h1",{attrs:{id:"es6相关"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#es6相关"}},[l._v("#")]),l._v(" es6相关")]),l._v(" "),t("h2",{attrs:{id:"es6新增特性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#es6新增特性"}},[l._v("#")]),l._v(" es6新增特性")]),l._v(" "),t("ul",[t("li",[l._v("let声明变量和const声明常量，两个都有块级作用域\n"),t("ul",[t("li",[l._v("ES5中是没有块级作用域的，并且var有变量提升，在let中，使用的变量一定要进行声明")])])]),l._v(" "),t("li",[l._v("箭头函数\n"),t("ul",[t("li",[l._v("ES6中可使用了 ()=> 定义函数，并把当前 this 作用域指向上层作用域")])])]),l._v(" "),t("li",[l._v("模板字符串\n"),t("ul",[t("li",[l._v("模板字符串是增强版的字符串，用反引号（`）标识，可以当作普通字符串使用，也可以用来定义多行字符串")])])]),l._v(" "),t("li",[l._v("解构赋值\n"),t("ul",[t("li",[l._v("ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值")])])]),l._v(" "),t("li",[l._v("for of循环\n"),t("ul",[t("li",[l._v("for...of循环可以遍历数组、Set和Map结构、某些类似数组的对象、对象，以及字符串")])])]),l._v(" "),t("li",[l._v("import、export导入导出\n"),t("ul",[t("li",[l._v("ES6标准中，Js原生支持模块(module)。将JS代码分割成不同功能的小块进行模块化，将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用")])])]),l._v(" "),t("li",[l._v("set数据结构\n"),t("ul",[t("li",[l._v("Set数据结构，类似数组。所有的数据都是唯一的，没有重复的值。它本身是一个构造函数")])])]),l._v(" "),t("li",[l._v("... 展开运算符\n"),t("ul",[t("li",[l._v("可以将数组或对象里面的值展开；还可以将多个值收集为一个变量")])])]),l._v(" "),t("li",[l._v("装饰器decorator\n"),t("ul",[t("li",[l._v("decorator是一个函数，用来修改类甚至于是方法的行为。修饰器本质就是编译时执行的函数")])])]),l._v(" "),t("li",[l._v("class类及继承\n"),t("ul",[t("li",[l._v("ES6中不再像ES5一样使用原型链实现继承，而是引入Class这个概念")])])]),l._v(" "),t("li",[l._v("async、await\n"),t("ul",[t("li",[l._v("使用 async/await, 搭配promise,可以通过编写形似同步的代码来处理异步流程, 提高代码的简洁性和可读性")]),l._v(" "),t("li",[l._v("async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成")])])]),l._v(" "),t("li",[l._v("promise\n"),t("ul",[t("li",[l._v("Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理、强大")])])]),l._v(" "),t("li",[l._v("Symbol\n"),t("ul",[t("li",[l._v("Symbol是一种基本类型。Symbol 通过调用symbol函数产生，它接收一个可选的名字参数，该函数返回的symbol是唯一的")])])]),l._v(" "),t("li",[l._v("Proxy代理\n"),t("ul",[t("li",[l._v("使用代理（Proxy）监听对象的操作，然后可以做一些相应事情")])])])]),l._v(" "),t("h2",{attrs:{id:"var、let、const之间的区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#var、let、const之间的区别"}},[l._v("#")]),l._v(" var、let、const之间的区别")]),l._v(" "),t("ul",[t("li",[l._v("var声明变量可以重复声明，而let不可以重复声明")]),l._v(" "),t("li",[l._v("var是不受限于块级的，而let是受限于块级")]),l._v(" "),t("li",[l._v("var会与window相映射（会挂一个属性），而let不与window相映射")]),l._v(" "),t("li",[l._v("var可以在声明的上面访问变量，而let有暂存死区，在声明的上面访问变量会报错")]),l._v(" "),t("li",[l._v("const声明之后必须赋值，否则会报错")]),l._v(" "),t("li",[l._v("const定义不可变的量，改变了就会报错")]),l._v(" "),t("li",[l._v("const和let一样不会与window相映射、支持块级作用域、在声明的上面访问变量会报错")])]),l._v(" "),t("h2",{attrs:{id:"使用箭头函数应注意什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用箭头函数应注意什么"}},[l._v("#")]),l._v(" 使用箭头函数应注意什么")]),l._v(" "),t("ul",[t("li",[l._v("用了箭头函数，this就不是指向window，而是父级（指向是可变的）")]),l._v(" "),t("li",[l._v("不能够使用arguments对象\n"),t("ul",[t("li",[l._v("在箭头函数中的arguments指向上级arguments对象，如果上级作用域是window对象，就不存在arguments属性")])])]),l._v(" "),t("li",[l._v("不能用作构造函数，这就是说不能够使用new命令，否则会抛出一个错误\n"),t("ul",[t("li",[l._v("使用new关键字创建对象，实际上是调用函数并创建一个新的对象作为函数的this作用域，箭头函数的this作用域始终指向上级作用域")])])]),l._v(" "),t("li",[l._v("不可以使用yield命令，因此箭头函数不能用作 Generator 函数")])])])}),[],!1,null,null,null);v.default=i.exports}}]);