import __SPromise from "@coffeekraken/s-promise";
import __SBench from "@coffeekraken/s-bench";
function redirectHandler(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, emit }) => {
    __SBench.start("handlers.redirect");
    res.redirect(req.redirect);
    resolve(req.redirect);
    __SBench.end("handlers.redirect", {}).log();
  });
}
export {
  redirectHandler as default
};
