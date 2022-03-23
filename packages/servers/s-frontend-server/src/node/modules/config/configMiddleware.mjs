import "../../../../../../chunk-TD77TI6B.mjs";
import __SBench from "@coffeekraken/s-bench";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SFile from "@coffeekraken/s-file";
function configMiddleware(settings = {}) {
  return async function(req, res, next) {
    var _a;
    const configJson = __SSugarConfig.get("");
    if (!res.templateData)
      res.templateData = {};
    res.templateData.config = configJson;
    res.templateData.configFiles = __SSugarConfig.filesPaths.map((path) => __SFile.new(path).toObject(false));
    if ((_a = req.path) == null ? void 0 : _a.match(/.*\.config\.js$/)) {
      res.templateData.requestedConfig = await __SSugarConfig.toDocblocks(req.path.split("/").pop());
    }
    __SBench.step("request", "configMiddleware");
    return next();
  };
}
var configMiddleware_default = configMiddleware;
export {
  configMiddleware_default as default
};
