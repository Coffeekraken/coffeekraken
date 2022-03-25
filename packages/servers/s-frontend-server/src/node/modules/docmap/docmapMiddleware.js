import __SBench from "@coffeekraken/s-bench";
import __SDocmap from "@coffeekraken/s-docmap";
let docmapCache;
function docmapMiddleware(settings = {}) {
  return async function(req, res, next) {
    if (!res.templateData)
      res.templateData = {};
    if (docmapCache) {
      res.templateData.docmap = docmapCache;
      return next();
    }
    const docmap = new __SDocmap();
    const docmapJson = await docmap.read();
    res.templateData.docmap = docmapJson;
    docmapCache = docmapJson;
    __SBench.step("request", "docmapMiddleware");
    return next();
  };
}
var docmapMiddleware_default = docmapMiddleware;
export {
  docmapMiddleware_default as default
};
