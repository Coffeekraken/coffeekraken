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
var import_parseArgs = __toESM(require("../parseArgs"), 1);
describe("sugar.shared.cli.parseArgs", () => {
  it("Should parse a simple string correctly", () => {
    const res = (0, import_parseArgs.default)("--something cool -e true");
    expect(res).toEqual({
      something: "cool",
      e: true
    });
  });
  it("Should parse a simple string with a none ending argument correctly", () => {
    const res = (0, import_parseArgs.default)("--something cool -e");
    expect(res).toEqual({
      something: "cool",
      e: true
    });
  });
  it("Should parse a simple string with multiple none value arguments one after the other", () => {
    const res = (0, import_parseArgs.default)("--something cool -e --plop -i");
    expect(res).toEqual({
      something: "cool",
      e: true,
      plop: true,
      i: true
    });
  });
  it('Should parse correctly an object value passed in the string using the valueQuote setting "', () => {
    const res = (0, import_parseArgs.default)(`-o "{'hello': 'world', '__plop': true}" --something World`, {
      valueQuote: '"'
    });
    expect(res).toEqual({
      o: {
        hello: "world",
        __plop: true
      },
      something: "World"
    });
  });
  it("Should parse correctly an object value passed in the string using the valueQuote setting '", () => {
    const res = (0, import_parseArgs.default)(`-o '{"hello": "world", "__plop": true}' --something World`, {
      valueQuote: "'"
    });
    expect(res).toEqual({
      o: {
        hello: "world",
        __plop: true
      },
      something: "World"
    });
  });
  it("Should parse correctly an object value passed in the string using the valueQuote setting `", () => {
    const res = (0, import_parseArgs.default)("-o `{'hello': 'world', '__plop': true}` --something World", {
      valueQuote: "`"
    });
    expect(res).toEqual({
      o: {
        hello: "world",
        __plop: true
      },
      something: "World"
    });
  });
  it("Should parse correctly multiple same args into array", () => {
    const res = (0, import_parseArgs.default)("-s js -s shared", {});
    expect(res).toEqual({
      s: ["js", "shared"]
    });
  });
  it("Should parse correctly a function style arguments with variable names specifies", () => {
    const res = (0, import_parseArgs.default)("($coco: true, $plop: 'hello world')", {
      valueQuote: "'"
    });
    expect(res).toEqual({
      coco: true,
      plop: "hello world"
    });
  });
  it("Should parse correctly an array value passed in the string correctly", () => {
    const res = (0, import_parseArgs.default)("-o `['plop', 'coco']` --something World", {
      valueQuote: "`"
    });
    expect(res).toEqual({
      o: ["plop", "coco"],
      something: "World"
    });
  });
  it("Should parse correctly a function style arguments with variable names specifies", () => {
    const res = (0, import_parseArgs.default)("($coco: true, $plop: 'hello world')", {
      valueQuote: "'"
    });
    expect(res).toEqual({
      coco: true,
      plop: "hello world"
    });
  });
  it("Should parse correctly a function style arguments with variable names specifies and nested functions calls", () => {
    const res = (0, import_parseArgs.default)(`(
          $start: default,
          $end: sugar.color(default, --darken 10%),
          $type: var(--s-gradient-type-inline, linear),
          $angle: var(--s-gradient-angle-inline, 45)
      )`, {});
    expect(res).toEqual({
      start: "default",
      end: "sugar.color(default, --darken 10%)",
      type: "var(--s-gradient-type-inline, linear)",
      angle: "var(--s-gradient-angle-inline, 45)"
    });
  });
  it("Should parse correctly a nested parentheses arguments", () => {
    const res = (0, import_parseArgs.default)(`(
        hsl(var(--something-h, 'Hello'), var(--something-s, 'World'), var(--something-l, 'Plop')),
        hello world,
        'Coco plop'
      )`, {});
    expect(res).toEqual({
      "0": "hsl(var(--something-h, 'Hello'), var(--something-s, 'World'), var(--something-l, 'Plop'))",
      "1": "hello world",
      "2": "Coco plop"
    });
  });
});
