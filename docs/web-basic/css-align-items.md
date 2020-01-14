# DIV居中

## 水平居中

### 已知宽度

* 块状元素

```css
div {
  width: 200px;
  margin: 0 auto;
}
```

* 绝对定位

```css
div {
  position: absolute;
  width: 200px;
  height: 200px;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

### 未知宽度

* 使用 fit-content (不兼容IE)

```css
div {
  width: fit-content;
  margin: auto;
}
```

> 类似属性区分：
> - `fill-available` - 自动填满剩余的空间
> - `max-content` - 适应有定宽的元素的最大宽度，不会进行收缩
> - `min-content` - 适应有定宽的元素的最小宽度，不会进行收缩
> - `fit-content` - 适应内容的实际宽度，进行收缩，加上`margin:auto`可实现水平居中

* 行内元素

```css
.parent {
  text-align: center;

  .child {
    display: inline-block;
  }
}
```

### 使用 relative 实现

用 `float` 或 `inline-block`，使容器大小为内容大小，而非默认的100%

```css
.parent {
  display: inline-block; /* or float: left; */
  position: relative;
  left: 50%;

  .child {
    position: relative;
    left: -50%;
  }
}
```

---

## 水平垂直居中

### 已知高度

相对或绝对定位, 设置外边距margin

```css
div {
  position: relative; /* or position: fixed */
  width: 500px;
  height: 300px;
  top: 50px;
  left: 50px;
  marigin: -150px 0 0 -250px;
}
```

### 未知高度

绝对定位，使用 `transform` 属性

```css
div {
  position: absolute; /* or position: fixed. 使用 relative 后宽度会变成100% */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### flex 布局

```css
.parent {
  display: flex;
  align-items: center;      /* 垂直居中 */
  justify-content: center;  /* 水平居中 */

  .child {
    /* ... */
  }
}
```

### 使用 inline-block

* 水平居中：`text-align: center`
* 垂直居中：设置父元素的`line-height`与`height`为相同值，子元素`vertical-align: middle` [参考事例](https://codepen.io/eeeeeii/pen/jdyVwJ)

```css
.parent {
  text-align: center; /* 水平居中 */

  .child {
    display: inline-block;  /* 核心：宽度自适应，高度可居中 */
    line-height: 20px;      /* 会自动继承，必须设置不同的值来覆盖 */
    vertical-align: middle; /* 垂直居中 */
  }
}

```

### 使用 display：table

```css
.parent {
  display: table;

  .child {
    display: table-cell;
    vertical-align: middle;
  }
}

```