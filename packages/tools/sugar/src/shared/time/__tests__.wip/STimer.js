var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { fileURLToPath } from "url";
import path from "path";
var getFilename, getDirname, __dirname, __filename;
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
    getFilename = () => fileURLToPath(import.meta.url);
    getDirname = () => path.dirname(getFilename());
    __dirname = /* @__PURE__ */ getDirname();
    __filename = /* @__PURE__ */ getFilename();
  }
});
var require_STimer = __commonJS({
  "packages/tools/sugar/src/shared/time/__tests__.wip/STimer.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__STimer) => {
      let doneComplete;
      let tickCount = 0;
      const timer = new __STimer(1e3, {
        tickInterval: "100ms"
      }).on("tick", () => {
        tickCount++;
      }).on("complete", () => {
        doneComplete();
      });
      timer.start();
      it("The timer remaining time has to be around 500", (done) => {
        setTimeout(() => {
          expect(timer.remaining).toBeLessThan(600);
          expect(timer.remaining).toBeGreaterThan(100);
          done();
        }, 500);
      });
      it("The timer has to tick 10 times", (done) => {
        doneComplete = done;
        setTimeout(() => {
          expect(tickCount).toBe(10);
        }, 600);
      });
    };
  }
});
export default require_STimer();
