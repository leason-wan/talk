import PatchListeners from "./listener.js";
import PatchIntervals from "./interval.js";

function genCode(code, ctx) {
  window.SANDBOX_GLOBAL = ctx;
  return `;(function(window){
    ${code}
  })(window.SANDBOX_GLOBAL);`;
}

function createSandbox() {
  let status = {
    running: false
  };
  const rawWindow = window;
  let fakeWindow = {};
  let listenersFree;
  let intervalsFree;

  function run(code) {
    const sandboxHandler = {
      get(target, property) {
        return target[property] || rawWindow[property];
      },
      set(target, property, value) {
        target[property] = value;
        return true;
      },
      has(target, p) {
        return p in target || p in rawWindow;
      },
    };
    // proxy vars
    fakeWindow = new Proxy(fakeWindow, sandboxHandler);
    // proxy listeners
    listenersFree = PatchListeners(fakeWindow);
    // proxy Intervals
    intervalsFree = PatchIntervals(fakeWindow);

    const _code = genCode(code, fakeWindow);

    try {
      eval(_code);
      status.running = true;
    } catch (error) {
      console.error(`[sandbox]error: ${error}`);
    }
  }

  function destory() {
    status.running = false;
    fakeWindow = {};
    listenersFree();
    intervalsFree();
  }

  return {
    run,
    status,
    destory,
  };
}

export { createSandbox };
