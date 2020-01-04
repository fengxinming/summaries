# CSS优先级

* 优先级就近原则，同权重情况下样式定义最近者为准
* 载入样式以最后载入的定位为准

## 优先级

### 相同权重

**权限由高到低**

* 元素标签里 (行内样式/内联样式)
* 写在`<style>`标签里 (嵌入样式)
* 写在单独的 CSS 样式表中 (链接样式)
* 在样式表中链接其他样式表：`@import url(css/styles2.css)`

### 不同权重

`!important` >  id > class > tag

> `!important` 优先于一切

## 权重计算

**选择器的特殊性值表述为4个部分，用0,0,0,0表示**

* 行间样式的特殊性是1,0,0,0
* ID选择器的特殊性值，加0,1,0,0
* 类选择器、属性选择器或伪类，加0,0,1,0
* 元素和伪元素，加0,0,0,1
* 通配选择器 `*` 对特殊性没有贡献，即0,0,0,0
* !important，它没有特殊性值，但它的优先级是最高的，即1,0,0,0,0

> [详细的优先级计算方法](https://www.cnblogs.com/wangmeijian/p/4207433.html)

## 属性继承

* **所有元素可继承的属性**

```
visibility
cursor
```

* **内联元素可继承的属性**

```
letter-spacing
word-spacing
white-space
line-height
color
font 
font-family 
font-size 
font-style 
font-variant    /* 把段落设置为小型大写字母字体 */
font-weight
text-decoration 
text-transform  /* 控制文本中的字母的大小写 */
direction

```

* **块状元素可继承的属性**

```
text-indent     /* 文本块中首行文本的缩进 */
text-align
```

* **列表元素可继承的属性**

```
list-style
list-style-type
list-style-position
list-style-image
```

* **表格元素可继承的属性**

```
/*
    1. separate	默认值。边框会被分开。
      不会忽略 border-spacing 和 empty-cells 属性。
    2. collapse	如果可能，边框会合并为一个单一的边框。
      会忽略 border-spacing 和 empty-cells 属性。
    3. inherit	规定应该从父元素继承 border-collapse 属性的值。
*/
border-collapse
```

* **不可继承的属性**

```
display
position 
left 
right 
top  
bottom 
z-index
height 
min-height 
max-height
width 
min-width 
max-width
padding 
margin
border 
background
overflow
float 
clear
vertical-align

table-layout     /*表格宽度是否自适应。值：automatic，fixed，inherit*/
/*打印时强制分页*/
page-break-after 
page-break-before 
unicode-bidi     /*与direction合用，控制文字方向*/
```