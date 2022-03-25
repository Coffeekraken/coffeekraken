var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import __uniqid from "../string/uniqid";
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
      const watchId = __uniqid();
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
export {
  proxy_default as default
};
