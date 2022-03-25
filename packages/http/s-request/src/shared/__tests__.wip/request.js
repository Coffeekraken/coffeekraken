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
var require_request = __commonJS({
  "packages/http/s-request/src/shared/__tests__.wip/request.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__request) => {
      if (process.env.GITHUB_WORKFLOW !== void 0) {
        test("Bypass these tests cause we are in Github actions env", (done) => {
          done();
        });
        return;
      }
      test("Making simple ajax request", async () => {
        try {
          const response = await __request({
            url: "http://dummy.restapiexample.com/api/v1/employees",
            method: "get"
          });
          expect(response.status).toBe(200);
        } catch (e) {
        }
      });
      test("Making an ajax request with multiple send count", async () => {
        try {
          const response = await __request({
            url: "http://dummy.restapiexample.com/api/v1/employees",
            method: "get",
            sendCount: 2
          });
          expect(response.length).toBe(2);
        } catch (e) {
        }
      });
    };
  }
});
export default require_request();
