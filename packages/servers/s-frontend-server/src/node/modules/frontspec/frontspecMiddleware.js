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
import __SBench from "@coffeekraken/s-bench";
import __SFrontspec from "@coffeekraken/s-frontspec";
function frontspecMiddleware(settings = {}) {
  return async function(req, res, next) {
    const frontspec = new __SFrontspec();
    if (!res.templateData)
      res.templateData = {};
    if (!res.templateData.frontspec)
      res.templateData.frontspec = {};
    res.templateData.frontspec = __spreadValues(__spreadValues({}, await frontspec.read()), res.templateData.frontspec);
    __SBench.step("request", "frontspecMiddleware");
    return next();
  };
}
var frontspecMiddleware_default = frontspecMiddleware;
export {
  frontspecMiddleware_default as default
};
