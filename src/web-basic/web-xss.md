# XSS

## XSS漏洞简介

跨站脚本攻击是指恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该Web页面时，被插入的恶意Script代码会被执行，从而达到恶意攻击用户的目的。[文章介绍](https://segmentfault.com/a/1190000016551188)

## XSS攻击方法

* 存储型XSS
  * 论坛发帖、商品评论、用户私信等
* 反射型XSS
  * 网站搜索、跳转等通过 URL 传递参数的功能
* DOM型XSS
  * 在公共电脑安装浏览器插件

## XSS防御方法

* 改成纯前端渲染，把代码和数据分隔开。
* 对 HTML 做充分转义。