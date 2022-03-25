var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const fn = function treatAsValue(promise, settings = {}) {
  settings = __spreadValues({
    during: -1
  }, settings);
  let during = settings.during || -1;
  try {
    const proxy = Proxy.revocable(promise, {
      get(target, prop, receiver) {
        if (prop === "then") {
          return target;
        }
        if (during > 0)
          during--;
        else if (during === 0) {
          proxy.revoke();
        }
        return Reflect.get(...arguments);
      }
    });
    proxy.proxy.restorePromiseBehavior = () => {
      proxy.revoke();
      return promise;
    };
    return proxy.proxy;
  } catch (e) {
    return promise;
  }
};
var treatAsValue_default = fn;
export {
  treatAsValue_default as default
};
