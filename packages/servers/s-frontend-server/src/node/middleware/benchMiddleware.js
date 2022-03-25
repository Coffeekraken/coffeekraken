import __SBench from "@coffeekraken/s-bench";
import __SPromise from "@coffeekraken/s-promise";
function benchEndMiddleware(settings = {}) {
  return function(req, res, next) {
    return new __SPromise(({ resolve, reject, pipe }) => {
      __SBench.start("request");
      function afterResponse() {
        __SBench.end("request", {}).log();
      }
      res.on("finish", afterResponse);
      setTimeout(() => {
        next();
      }, 100);
    });
  };
}
var benchMiddleware_default = benchEndMiddleware;
export {
  benchMiddleware_default as default
};
