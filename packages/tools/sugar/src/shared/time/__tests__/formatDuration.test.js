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
var import_formatDuration = __toESM(require("../formatDuration"), 1);
describe("sugar.shared.time.formatDuration", () => {
  it("Should format an estimation under 1s correctly", () => {
    const res = (0, import_formatDuration.default)(600);
    expect(res).toBe("600ms");
  });
  it("Should format an estimation under 1m correctly", () => {
    const res = (0, import_formatDuration.default)(1e3 * 25);
    expect(res).toBe("25s");
  });
  it("Should format an estimation under 1m with ms correctly", () => {
    const res = (0, import_formatDuration.default)(1e3 * 25 + 345);
    expect(res).toBe("25.345s");
  });
  it("Should format an estimation under 1h correctly", () => {
    const res = (0, import_formatDuration.default)(1e3 * 60 * 45);
    expect(res).toBe("45m");
  });
  it("Should format an estimation under 1h with some seconds correctly", () => {
    const res = (0, import_formatDuration.default)(1e3 * 60 * 45 + 1e3 * 35);
    expect(res).toBe("45m35s");
  });
  it("Should format an estimation above 1h correctly", () => {
    const res = (0, import_formatDuration.default)(1e3 * 60 * 60 * 3);
    expect(res).toBe("3h");
  });
  it("Should format an estimation above 1h with some minutes correctly", () => {
    const res = (0, import_formatDuration.default)(1e3 * 60 * 60 * 3 + 1e3 * 60 * 32);
    expect(res).toBe("3h32m");
  });
});
