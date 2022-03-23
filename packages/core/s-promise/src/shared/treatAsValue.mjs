import {
  __spreadValues
} from "../../../../chunk-JETN4ZEY.mjs";
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
