# DIV居中

## 水平垂直居中

### 行内元素text-align搭配line-height

> 父级元素高度已知，子元素宽高度可未知

```html
<div class="container">
  <div class="box"></div>
</div>
<style>
.container {
  width: 100%;
  height: 400px;
  line-height: 400px;
  background: #ccc;
  text-align: center;
}

.container .box {
  width: 100px;
  height: 100px;
  background: yellow;
  display: inline-block;
  vertical-align: middle;
}
</style>
```

### 绝对定位实现水平垂直居中（子元素定高）

> 需要知道子元素的宽高

```html
<div class="container">
  <div class="box"></div>
</div>
<style>
.container {
   width: 100%;
   height: 400px;
   background: #ccc;
   position: relative;
 }

.container .box {
  width: 100px;
  height: 100px;
  background: yellow;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
</style>
```

### 绝对定位实现水平垂直居中（子元素非定高）

> 不需要知道子元素的宽高

```html
<div class="container">
  <div class="box"></div>
</div>
<style>
.container {
  width: 100%;
  height: 400px;
  background: #ccc;
  position: relative;
}

.container .box {
  width: 100px;
  height: 100px;
  background: yellow;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
```

### 通过父元素使用display: table子元素使用`vertical-align: middle;margin: auto`实现水平垂直居中

```html
<div class="container">
  <div class="box">
    <div class="box2"></div>
  </div>
</div>
<style>
.container {
  width: 100%;
  height: 400px;
  background: #ccc;
  display: table;
}

.container .box {
  display: table-cell;
  vertical-align: middle;
}

.container .box2 {
  width: 100px;
  height: 100px;
  background: yellow;
  margin: 0 auto;
}
</style>
```

### 借助伪元素实现水平垂直居中

> 需要知道父元素的高度

```html
<div class="container">
  <div class="box">
    <div class="box2"></div>
  </div>
</div>
<style>
.container {
  text-align: center;
  width: 100%;
  height: 400px;
  background: #ccc;
}

.container:before {
  content: '';
  display: inline-block;
  height: 100%;
  width: 0%;
  vertical-align: middle;
}

.container .box {
  width: 100px;
  height: 100px;
  background: yellow;
  display: inline-block;
  vertical-align: middle;
}
</style>
```
