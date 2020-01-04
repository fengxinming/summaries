# position详解

## position的定义

* `absolute` - （绝对定位） 对象脱离标准文档流，使用top, right, bottom, left 等属性进行绝对定位（相对于static定位以外的第一个父元素进行绝对定位） 同时可通过z-index定义层叠关系。
* `fixed` - （固定定位） 对象脱离标准文档流，使用top, right, bottom, left 等属性进行绝对定位（相对于浏览器窗口进行绝对定位）同时可通过z-index定义层叠关系。
* `relative` - （相对定位） 对象遵循标准文档流中，依赖top, right, bottom, left 等属性相对于该对象在标准文档流中的位置进行偏移，同时可通过z-index定义层叠关系。
* `static` - 默认值。（静态定位） 对象遵循标准文档流中，top, right, bottom, left 等属性失效。
* `inherit` - 规定应该从父元素继承 position 属性的值。