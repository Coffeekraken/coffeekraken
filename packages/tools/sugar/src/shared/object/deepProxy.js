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
import __proxy from "../array/proxy";
import __deepMap from "../object/deepMap";
import __clone from "../object/clone";
import __deepMerge from "../object/deepMerge";
function deepProxy(object, handlerFn, settings = {}) {
  const preproxy = /* @__PURE__ */ new WeakMap();
  let isRevoked = false;
  settings = __deepMerge({
    deep: true,
    handleSet: true,
    handleGet: false,
    handleDelete: true
  }, settings);
  function makeHandler(path) {
    return {
      set(target, key, value) {
        if (isRevoked || !settings.handleSet)
          return true;
        if (settings.deep && typeof value === "object") {
          value = proxify(value, [...path, key]);
        }
        const oldValue = target[key];
        target[key] = value;
        handlerFn({
          object,
          target,
          key,
          path: [...path, key].join("."),
          action: "set",
          fullAction: `Object.set`,
          oldValue,
          value
        });
        return true;
      },
      get(target, key, receiver) {
        if (Reflect.has(target, key)) {
          if (!settings.handleGet)
            return target[key];
          const value = handlerFn({
            object,
            target,
            key,
            path: [...path, key].join("."),
            action: "get",
            fullAction: "Object.get"
          });
          if (key === "revoke")
            return receiver.revoke;
          if (value === void 0)
            return target[key];
          return value;
        }
        return void 0;
      },
      deleteProperty(target, key) {
        if (isRevoked || !settings.handleDelete)
          return true;
        if (Reflect.has(target, key)) {
          const oldValue = target[key];
          const deleted = Reflect.deleteProperty(target, key);
          if (deleted) {
            handlerFn({
              object,
              target,
              key,
              path: [...path, key].join("."),
              action: "delete",
              fullAction: "Object.delete",
              oldValue
            });
          }
          return deleted;
        }
        return false;
      }
    };
  }
  function proxify(obj, path) {
    if (obj === null)
      return obj;
    if (settings.deep) {
      for (const key of Object.keys(obj)) {
        if (Array.isArray(obj[key])) {
          obj[key] = __proxy(obj[key]);
          obj[key].watch(Object.getOwnPropertyNames(Array.prototype), (watchObj) => {
            handlerFn(__spreadValues({
              path: [...path, key].join(".")
            }, watchObj));
          });
        } else if (typeof obj[key] === "object") {
          obj[key] = proxify(obj[key], [...path, key]);
        }
      }
    }
    const p = Proxy.revocable(obj, makeHandler(path));
    const revokePropertyObj = {
      writable: true,
      configurable: false,
      enumerable: true,
      value: () => {
        let __copy = __clone(p.proxy, { deep: true });
        isRevoked = true;
        __copy = __deepMap(__copy, ({ value, prop }) => {
          if (prop === "revoke" && typeof value === "function") {
            return -1;
          }
          return value;
        });
        setTimeout(() => {
          __deepMap(p.proxy, ({ value, prop }) => {
            if (prop === "revoke" && typeof value === "function") {
              value();
            }
          }, {});
          p.revoke();
        });
        return __copy;
      }
    };
    if (Array.isArray(p.proxy)) {
      p.proxy.revoke = revokePropertyObj.value;
    } else {
      Object.defineProperties(p.proxy, {
        revoke: revokePropertyObj
      });
    }
    return p.proxy;
  }
  return proxify(object, []);
}
var deepProxy_default = deepProxy;
export {
  deepProxy_default as default
};
