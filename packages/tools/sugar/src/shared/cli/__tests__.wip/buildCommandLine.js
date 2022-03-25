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
var require_buildCommandLine = __commonJS({
  "packages/tools/sugar/src/shared/cli/__tests__.wip/buildCommandLine.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__buildCommandLine) => {
      describe("sugar.js.cli.buildCommandLine", () => {
        it("Should build the command line correctly", (done) => {
          const command = __buildCommandLine("php [hostname]:[port] [rootDir] [arguments]", {
            hostname: {
              type: "String",
              description: "Server hostname",
              default: "localhost"
            },
            port: {
              type: "Number",
              description: "Server port",
              default: 8080
            },
            rootDir: {
              type: "String",
              description: "Root directory",
              default: "."
            },
            arg1: {
              type: "Boolean",
              alias: "a",
              description: "Argument 1",
              default: true
            }
          }, {
            port: 8888
          });
          expect(command).toBe("php localhost:8888 . -a");
          done();
        });
      });
    };
  }
});
export default require_buildCommandLine();
