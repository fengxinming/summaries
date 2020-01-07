# CSS选择器

## 选择器种类

* id选择器 (#myid)
* 类选择器 (.myclassname)
* 标签选择器 (div, h1, p）
* 紧邻同胞选择器 h1 + p (选的是h1后紧跟的那个p)
* 一般同胞选择器 h1 ~ p (选择所有跟在h1后的p) [css3]
* 子选择器 (ul > li)
* 后代选择器 (li a)
* 通配符选择器 ( * )
* 属性选择器 (a[rel = "external"])
* 伪类选择器 (a:hover, li:nth-child)

## 伪元素和伪类

### 所有伪元素

```
::after
::before
::first-letter
::first-line
::selection
```

### 伪类

```
:active, :hover, :visited
:any
:any-link
:checked
:default
:defined
:dir()
:disabled
:empty
:enabled
:first
:first-child
:first-of-type
:fullscreen
:focus
:focus-visible
:host
:host()
:host-context()
:indeterminate
:in-range
:invalid
:lang()
:last-child
:last-of-type
:left
:link
:not()
:nth-child()
:nth-last-child()
:nth-last-of-type()
:nth-of-type()
:only-child
:only-of-type
:optional
:out-of-range
:read-only
:read-write
:required
:right
:root
:scope
:target
:valid
```

> 匹配 section 孙子元素，而非子元素的 a 标签都会被选中

```css
section * a {
  font-size: 1.3em;
}
```
