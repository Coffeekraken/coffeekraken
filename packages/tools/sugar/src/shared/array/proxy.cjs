var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var proxy_exports = {};
__export(proxy_exports, {
  default: () => proxy_default
});
module.exports = __toCommonJS(proxy_exports);
var import_uniqid = __toESM(require("../string/uniqid"), 1);
function proxy(array) {
  if (array.__$proxied)
    return array;
  const watchStack = {};
  Object.defineProperty(array, "__$proxied", {
    value: true,
    enumerable: false,
    writable: false
  });
  function _proxyMethod(name, ...args) {
    const handlersStack = [];
    Object.keys(watchStack).forEach((watchId) => {
      const watch = watchStack[watchId];
      if (watch.methods.indexOf(name) === -1)
        return;
      handlersStack.push({
        handlerFn: watch.handlerFn,
        watchObj: {
          oldValue: [...array],
          action: `${name}`,
          fullAction: `Array.${name}`,
          args
        }
      });
    });
    const returnValue = Array.prototype[name].call(array, ...args);
    handlersStack.forEach((handlerObj) => {
      handlerObj.watchObj = __spreadProps(__spreadValues({}, handlerObj.watchObj), {
        value: array,
        returnedValue: returnValue
      });
      handlerObj.handlerFn(handlerObj.watchObj);
    });
    return returnValue;
  }
  Object.getOwnPropertyNames(Array.prototype).forEach((methodName) => {
    const unProxyMethods = ["length", "constructor"];
    if (unProxyMethods.indexOf(methodName) !== -1)
      return;
    Object.defineProperty(array, methodName, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: (...args) => {
        return _proxyMethod(methodName, ...args);
      }
    });
  });
  Object.defineProperty(array, "watch", {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (methods, handlerFn) => {
      const watchId = (0, import_uniqid.default)();
      watchStack[watchId] = {
        methods,
        handlerFn
      };
      return watchId;
    }
  });
  Object.defineProperty(array, "unwatch", {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (watchId) => {
      delete watchStack[watchId];
    }
  });
  return array;
}
var proxy_default = proxy;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
