function includes(arr, i) {
  if(arr && arr.length) {
    return arr.includes(i);
  }
  return false;
};

const allowed = ['console'];

const sandboxHandler = {
  has(target, property) {
    const has = property in target;
    const isAllowed = includes(allowed, property);
    if(!has && !isAllowed) {
      console.error(`[sandbox] can not use Invalidate key: ${property} in sanbox.`);
    }
    return has || !isAllowed;
  }
}

module.exports = function initProxy(vm) {
  return new Proxy(vm, sandboxHandler);
}
