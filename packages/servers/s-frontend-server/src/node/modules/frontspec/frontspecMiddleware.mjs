import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
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
