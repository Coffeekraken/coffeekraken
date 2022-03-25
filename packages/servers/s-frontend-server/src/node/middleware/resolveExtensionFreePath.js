import __fs from "fs";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __extension from "@coffeekraken/sugar/node/fs/extension";
import __SBench from "@coffeekraken/s-bench";
function resolveExtensionFreePath(settings = {}) {
  settings = __deepMerge({
    rootDir: void 0,
    extensions: [],
    exclude: []
  }, settings);
  return function(req, res, next) {
    if (settings.exclude.indexOf(req.path) !== -1) {
      return next();
    }
    const pathExtension = __extension(req.path).trim();
    if (pathExtension)
      return next();
    const rootDir = settings.rootDir;
    const filePath = req.path.slice(0, 1) === "/" ? req.path.slice(1) : req.path;
    for (let i = 0; i < settings.extensions.length; i++) {
      const ext = settings.extensions[i];
      const potentialFilePath = `${rootDir}/${filePath}.${ext}`;
      if (__fs.existsSync(potentialFilePath)) {
        res.redirect(`/${filePath}.${ext}`);
        break;
      }
    }
    __SBench.step("request", "resolveExtensionFreePathMiddleware");
    return next();
  };
}
var resolveExtensionFreePath_default = resolveExtensionFreePath;
export {
  resolveExtensionFreePath_default as default
};
