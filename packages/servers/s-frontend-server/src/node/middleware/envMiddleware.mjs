import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
