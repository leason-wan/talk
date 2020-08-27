function genCode(code, ctx) {
  global.SANDBOX_GLOBAL_VARS = ctx;
  return `;(function(global){
    ${code}
  })(global.SANDBOX_GLOBAL_VARS);`;
}

let sandboxId = 0;
/**
 * 全局变量控制：代理，禁用变量
 * 事件
 * 定时器
 * @param {object} ctx global vars control
 * {
 *  inject: {},
 *  ban: [],
 * }
 * 
 */
function createSandbox(ctx) {
  let fakeGlobal = ctx.inject;
  let running = false;
  return {
    id: sandboxId++,
    run: code => {
      const sandboxHandler = {
        get(target, property) {
          return target[property] || global[property];
        },
        set(target, property, value) {
          target[property] = value;
        }
      }
      fakeGlobal = new Proxy(fakeGlobal, sandboxHandler);
      const _code = genCode(code, fakeGlobal);
      try {
        eval(_code);  
      } catch (error) {
        console.error(`[sandbox]: id: ${sandboxId}, error: ${error}`);
      }
      running = true;
    },
    destory: _ => {
      running = false;
      fakeGlobal = null;
    },
  }
}

module.exports = {
  createSandbox,
};
