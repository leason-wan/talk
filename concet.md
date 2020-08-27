# what sandbox

维基百科：

在计算机安全领域，沙盒（英语：sandbox，又译为沙箱）是一种安全机制，为运行中的程序提供的隔离环境。通常是作为一些来源不可信、具破坏力或无法判定程序意图的程序提供实验之用。

简单的理解沙盒是一个被限制的隔离环境。

# why sandbox

安全

沙盒中的所有改动对操作系统不会造成任何损失。可以被称为软件监狱。

# how sandbox

微前端中的沙盒。

qiankun：代理了window，定时器，appendChild，事件监听。

## vue

模版禁止了部分全局变量的使用。

```html
  <div id="app">{{ msg }}</div>
```
complier ==> 
```js
function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_v(_s(msg))])
  }
}
```

