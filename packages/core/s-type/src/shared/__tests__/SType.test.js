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
var import_SType = __toESM(require("../SType"), 1);
describe(`@coffeekraken/s-type`, () => {
  it("Should handle Numbers correctly", (done) => {
    const type = new import_SType.default("Number");
    expect(type.is(10)).toBe(true);
    expect(type.is("10")).toBe(false);
    expect(type.is(true)).toBe(false);
    expect(type.is(false)).toBe(false);
    expect(type.is(12.4)).toBe(true);
    expect(type.is([10])).toBe(false);
    expect(type.is(null)).toBe(false);
    expect(type.is(void 0)).toBe(false);
    expect(type.is({ something: 10 })).toBe(false);
    expect(type.cast(10)).toBe(10);
    expect(type.cast("10")).toBe(10);
    expect(() => {
      type.cast({ something: 10 });
    }).toThrow();
    expect(() => {
      type.cast([10]);
    }).toThrow();
    expect(() => {
      type.cast(null);
    }).toThrow();
    expect(() => {
      type.cast(void 0);
    }).toThrow();
    done();
  });
});
