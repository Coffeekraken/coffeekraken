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
import __packageRootDir from "@coffeekraken/sugar/node/path/packageRootDir";
import __fs from "fs";
import __standardizeJson from "@coffeekraken/sugar/shared/npm/utils/standardizeJson";
import __SBench from "@coffeekraken/s-bench";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
function packageJsonMiddleware(settings = {}) {
  return function(req, res, next) {
    const packageJsonPath = `${__packageRootDir()}/package.json`;
    let pkg;
    if (!__fs.existsSync(packageJsonPath)) {
    } else {
      pkg = __readJsonSync(packageJsonPath);
      res.templateData = __spreadProps(__spreadValues({}, res.templateData || {}), {
        packageJson: __standardizeJson(pkg)
      });
    }
    __SBench.step("request", "packageJsonMiddleware");
    return next();
  };
}
var packageJsonMiddleware_default = packageJsonMiddleware;
export {
  packageJsonMiddleware_default as default
};
