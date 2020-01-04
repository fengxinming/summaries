# 跨域问题

## 什么是跨域

跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。

**广义的跨域**

* 资源跳转： A链接、重定向、表单提交
* 资源嵌入： `<link>`、`<script>`、`<img>`、`<frame>`等dom标签，还有样式中`background:url()`、`@font-face()`等文件外链
* 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等

**狭义的跨域**

是由浏览器同源策略限制的一类请求场景

### 同源策略

同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

**同源策略限制**

* Cookie、LocalStorage 和 IndexDB 无法读取
* DOM 和 Js对象无法获得
* AJAX 请求不能发送

## 常见跨域场景

| URL | 说明 | 是否允许通信 |
|-----|:----:|------------:|
| http://www.domain.com/a.js<br/>http://www.domain.com/b.js<br/>http://www.domain.com/b.js | 同一域名，不同文件或路径 | 允许 |
| http://www.domain.com:8000/a.js<br/>http://www.domain.com/b.js | 同一域名，不同端口 | 不允许 |
| http://www.domain.com/a.js<br/>https://www.domain.com/b.js | 同一域名，不同协议 | 不允许 |
| http://www.domain.com/a.js<br/>http://192.168.4.12/b.js | 域名和域名对应相同ip | 不允许 |
| http://www.domain.com/a.js<br/>http://x.domain.com/b.js<br/>http://domain.com/c.js | 主域相同，子域不同 | 不允许 |
| http://www.domain1.com/a.js<br/>http://www.domain2.com/b.js | 不同域名 | 不允许 |

## 跨域解决方案

* [jsonp跨域](#jsonp跨域)
* [form表单 + 隐藏的iframe](#form表单-隐藏的iframe)
* [document.domain + iframe](#document-domain-iframe)
* [location.hash + iframe](#location-hash-iframe)
* [window.name + iframe](#window-name-iframe)
* postMessage跨域
* 跨域资源共享（CORS）
* nginx代理跨域
* nodejs中间件代理跨域
* WebSocket协议跨域

### jsonp跨域

* 实现原理：动态创建script标签，请求一个带参数的地址实现跨域通信
* 缺点：只能发送GET请求

客户端实现：

```html
<script>
  var script = document.createElement('script');
  script.type = 'text/javascript';

  // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
  script.src = 'http://example.com:8080/api/method?callback=handleCallback';
  document.head.appendChild(script);

  // 回调执行函数
  function handleCallback(res) {
      alert(JSON.stringify(res));
  }
</script>
```

node端实现：

```js
const express = require('express');
const app = express();
app.get('/api/method', (req, res) => {
  const data = { code: 1, message: 'success' };
  res
    .type('application/javascript')
    .status(200)
    .send(`${req.query.callback}(${JSON.stringify(data)})`);
});
app.listen(3000);

```

### form表单 + 隐藏的iframe

* 实现原理：动态创建隐藏iframe和form表单，表单提交后从iframe中取出字符串，返回结果页面需要加上domain的设置 `<script>document.domain="xxxx.com";</script>`
* 优点：可以发送POST请求
* 缺点：实现复杂

客户端实现：

```js
// 创建iframe
var iframeName = 'myframe';
var iframe = document.createElement('iframe');
iframe.name = iframeName;
iframe.style.display = 'none';
document.body.appendChild(iframe);

var onLoad = function() {
  var body = iframe.contentDocument.body;
  var data = JSON.parse(body.textContent || body.innerText || '{}');
}

if (iframe.readyState){
  iframe.onreadystatechange = function() {
    if (iframe.readyState && iframe.readyState=='complete'){
      onLoad();
    }
  }
} else {
  iframe.onload = onLoad;
}

// 创建form
var form = document.createElement('form');
form.action = 'http://example.com/api/method';
form.target = iframeName;     // 重要
form.method = 'post';
    
var input = document.createElement('input');
input.name = {inputName};
input.value = {inputValue};
input.type = 'hidden';
form.appendChild(input);
    
document.body.appendChild(form);
form.submit();
```

### document.domain + iframe

* 实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
* 缺点：仅限主域相同，子域不同的跨域应用场景。

1. 父窗口：(http://www.domain.com/a.html)

```html
<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
  document.domain = 'domain.com';
  var user = 'admin';
</script>
```

2. 子窗口：(http://child.domain.com/b.html)

```html
<script>
  document.domain = 'domain.com';
  // 获取父窗口中变量
  alert('get js data from parent ---> ' + window.parent.user);
</script>
```

### location.hash + iframe

* 实现原理： a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。即：A域：a.html -> B域：b.html -> A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，但c与a同域，所以c可通过parent.parent访问a页面所有对象。
* 缺点：传输数据量少，特殊字符传递前后需要编码和转码

1. a.html：(http://www.domain1.com/a.html)

```html
<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>
  var iframe = document.getElementById('iframe');

  // 向b.html传hash值
  setTimeout(function() {
    iframe.src = iframe.src + '#user=admin';
  }, 1000);
  
  // 开放给同域c.html的回调方法
  function onCallback(res) {
    alert('data from c.html ---> ' + res);
  }
</script>
```

2. b.html：(http://www.domain2.com/b.html)

```html
<iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"></iframe>
<script>
    var iframe = document.getElementById('iframe');

    // 监听a.html传来的hash值，再传给c.html
    window.onhashchange = function () {
        iframe.src = iframe.src + location.hash;
    };
</script>
```

3. c.html：(http://www.domain1.com/c.html)

```html
<script>
  // 监听b.html传来的hash值
  window.onhashchange = function () {
    // 再通过操作同域a.html的js回调，将结果传回
    window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
  };
</script>
```

### window.name + iframe

* 实现原理：通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

1. a.html：(http://www.domain1.com/a.html)

```js
var state = 0;
var iframe = document.createElement('iframe');
iframe.src = 'http://www.domain2.com/b.html';
iframe.onload = function() {
  if (state === 1) {
    // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
    callback(iframe.contentWindow.name);
    destoryFrame();

  } else if (state === 0) {
    // 第1次onload(跨域页)成功后，切换到同域代理页面
    iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
    state = 1;
  }
};
```

2. proxy.html：(http://www.domain1.com/proxy.html)
中间代理页，与a.html同域，内容为空即可。

3. b.html：(http://www.domain2.com/b.html)

```html
<script>
    window.name = 'This is domain2 data!';
</script>
```

