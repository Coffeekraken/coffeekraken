var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var prettierPluginCoffeekraken_exports = {};
__export(prettierPluginCoffeekraken_exports, {
  languages: () => languages,
  parsers: () => parsers
});
module.exports = __toCommonJS(prettierPluginCoffeekraken_exports);
const languages = [
  {
    name: "SugarCss",
    parsers: ["sugar-css"]
  }
];
const loc = (prop) => (node) => {
  return node.loc && node.loc[prop] && node.loc[prop].offset;
};
const parsers = {
  "sugar-css": {
    parse,
    astFormat: "sugar-css-ast",
    hasPragma,
    locStart: loc("start"),
    locEnd: loc("end"),
    preprocess
  }
};
function parse(text, parsers2, options) {
}
function hasPragma(text) {
}
function preprocess(text, options) {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  languages,
  parsers
});
