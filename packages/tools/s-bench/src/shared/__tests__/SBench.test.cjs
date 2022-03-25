var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_exports = __toESM(require("../exports"), 1);
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"), 1);
describe("s-bench", () => {
  it("Should handle a basic time benchmark correctly", (done) => {
    const bench = new import_exports.default("testing");
    bench.on("log", (log) => {
      console.log((0, import_parseHtml.default)(log.value));
    });
    bench.start();
    bench.step("compilation");
    bench.end();
    done();
  });
  it("Should handle a basic time benchmark using static methods correctly", (done) => {
    import_exports.default.start("testing").on("log", (log) => {
      console.log((0, import_parseHtml.default)(log.value));
    });
    import_exports.default.start("testing");
    import_exports.default.step("testing", "compilation");
    import_exports.default.end("testing");
    done();
  });
});
