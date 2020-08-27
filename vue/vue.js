const compiler = require('vue-template-compiler');
const initProxy = require('./proxy');

function createRenderFunction(renderStr) {
  return new Function(renderStr);
}

function Vue(options) {
  this._renderProxy = initProxy(this);
  this._render = function() {
    // const { template } = options;
    // const { render: renderStr } = compiler.compile(template);
    // console.log(renderStr);
    // 由于内部渲染函数较多，这里跳过执行
    const renderStr = `
      with(this){
        console.log(123);
        Date.now();
      }`;
    const renderFn = createRenderFunction(renderStr);
    return renderFn.call(this._renderProxy);
  };
  this.$mount = function () {
    this._render();
  }
}

const vm = new Vue({
  // template: '<div @click="() => console.log(123)">{{msg}}</div>'
  template: '<h1>{{window.location.href}}</h1>'
});

vm.$mount();