(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{10:function(t,e,o){"use strict";function n(t,e,o,n,i,s,r,a){var _,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=o,c._compiled=!0),n&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),r?(_=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=_):i&&(_=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),_)if(c.functional){c._injectStyles=_;var l=c.render;c.render=function(t,e){return _.call(e),l(t,e)}}else{var d=c.beforeCreate;c.beforeCreate=d?[].concat(d,_):[_]}return{exports:t,options:c}}o.d(e,"a",(function(){return n}))},134:function(t,e,o){"use strict";o.r(e);var n=o(10),i=Object(n.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"position详解"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#position详解"}},[t._v("#")]),t._v(" position详解")]),t._v(" "),o("h2",{attrs:{id:"position的定义"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#position的定义"}},[t._v("#")]),t._v(" position的定义")]),t._v(" "),o("ul",[o("li",[o("code",[t._v("absolute")]),t._v(" - （绝对定位） 对象脱离标准文档流，使用top, right, bottom, left 等属性进行绝对定位（相对于static定位以外的第一个父元素进行绝对定位） 同时可通过z-index定义层叠关系。")]),t._v(" "),o("li",[o("code",[t._v("fixed")]),t._v(" - （固定定位） 对象脱离标准文档流，使用top, right, bottom, left 等属性进行绝对定位（相对于浏览器窗口进行绝对定位）同时可通过z-index定义层叠关系。")]),t._v(" "),o("li",[o("code",[t._v("relative")]),t._v(" - （相对定位） 对象遵循标准文档流中，依赖top, right, bottom, left 等属性相对于该对象在标准文档流中的位置进行偏移，同时可通过z-index定义层叠关系。")]),t._v(" "),o("li",[o("code",[t._v("static")]),t._v(" - 默认值。（静态定位） 对象遵循标准文档流中，top, right, bottom, left 等属性失效。")]),t._v(" "),o("li",[o("code",[t._v("inherit")]),t._v(" - 规定应该从父元素继承 position 属性的值。")])])])}),[],!1,null,null,null);e.default=i.exports}}]);