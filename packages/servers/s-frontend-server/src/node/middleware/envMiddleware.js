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
import __SBench from "@coffeekraken/s-bench";
import __SEnv from "@coffeekraken/s-env";
function envMiddleware(settings = {}) {
  return function(req, res, next) {
    res.templateData = __spreadProps(__spreadValues({}, res.templateData || {}), {
      env: __SEnv.env
    });
    __SBench.step("request", "envMiddleware");
    return next();
  };
}
var envMiddleware_default = envMiddleware;
export {
  envMiddleware_default as default
};
