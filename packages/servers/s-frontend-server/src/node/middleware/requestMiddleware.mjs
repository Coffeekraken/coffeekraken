import "../../../../../chunk-TD77TI6B.mjs";
import __SBench from "@coffeekraken/s-bench";
function requestMiddleware(settings = {}) {
  return async function(req, res, next) {
    if (!res.templateData)
      res.templateData = {};
    res.templateData.request = {
      baseUrl: req.baseUrl,
      body: req.body,
      fresh: req.fresh,
      hostname: req.hostname,
      ip: req.ip,
      ips: req.ips,
      originalUrl: req.originalUrl,
      params: req.params,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      secure: req.secure,
      stale: req.stale,
      subdomains: req.subdomains,
      xhr: req.xhr
    };
    __SBench.step("request", "requestMiddleware");
    return next();
  };
}
var requestMiddleware_default = requestMiddleware;
export {
  requestMiddleware_default as default
};
