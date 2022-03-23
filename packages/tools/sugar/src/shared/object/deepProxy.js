var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var deepProxy_exports = {};
__export(deepProxy_exports, {
  default: () => deepProxy_default
});
module.exports = __toCommonJS(deepProxy_exports);
var import_proxy = __toESM(require("../array/proxy"), 1);
var import_deepMap = __toESM(require("../object/deepMap"), 1);
var import_clone = __toESM(require("../object/clone"), 1);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
function deepProxy(object, handlerFn, settings = {}) {
  const preproxy = /* @__PURE__ */ new WeakMap();
  let isRevoked = false;
  settings = (0, import_deepMerge.default)({
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
          obj[key] = (0, import_proxy.default)(obj[key]);
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
        let __copy = (0, import_clone.default)(p.proxy, { deep: true });
        isRevoked = true;
        __copy = (0, import_deepMap.default)(__copy, ({ value, prop }) => {
          if (prop === "revoke" && typeof value === "function") {
            return -1;
          }
          return value;
        });
        setTimeout(() => {
          (0, import_deepMap.default)(p.proxy, ({ value, prop }) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
