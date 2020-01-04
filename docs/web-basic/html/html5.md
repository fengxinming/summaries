# HTML5

## 简介

* HTML5 是最新的 HTML 标准。
* HTML5 是专门为承载丰富的 web 内容而设计的，并且无需额外插件。
* HTML5 拥有新的语义、图形以及多媒体元素。
* HTML5 提供的新元素和新的 API 简化了 web 应用程序的搭建。
* HTML5 是跨平台的，被设计为在不同类型的硬件（PC、平板、手机、电视机等等）之上运行。

## 新的变动

### 新的文档类型

```html
<!DOCTYPE html>
<!-- The new character encoding (charset) declaration is also very simple: -->
<meta charset="UTF-8">
<title>Title of the document</title>
</head>

<body>
Content of the document......
</body>

</html>
```

### 新的属性语法

| 类型 | 示例 |
|------|------|
| Empty	| `<input type="text" value="John Doe" disabled>` |
| Unquoted | `<input type="text" value=John Doe>` |
| Double-quoted | `<input type="text" value="John Doe">` |
| Single-quoted	| `<input type="text" value='John Doe'>` |

### 新的特性

* 新的语义元素，比如 `<header>`, `<footer>`, `<article>`, and `<section>`。
* 新的表单控件，比如数字、日期、时间、日历和滑块。
* 强大的图像支持（借由 `<canvas>` 和 `<svg>`）
* 强大的多媒体支持（借由 `<video>` 和 `<audio>`）
* 强大的新 API，比如用本地存储取代 cookie。

### 被删除的标签

* `<acronym>`
* `<applet>`
* `<basefont>`
* `<big>`
* `<center>`
* `<dir>`
* `<font>`
* `<frame>`
* `<frameset>`
* `<noframes>`
* `<strike>`
* `<tt>`