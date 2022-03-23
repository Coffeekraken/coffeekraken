import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
