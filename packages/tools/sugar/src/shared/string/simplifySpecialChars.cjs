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
var simplifySpecialChars_exports = {};
__export(simplifySpecialChars_exports, {
  default: () => simplifySpecialChars
});
module.exports = __toCommonJS(simplifySpecialChars_exports);
function simplifySpecialChars(str) {
  const utf8 = {
    a: /[áàâãªä]/gm,
    A: /[ÁÀÂÃÄ]/gm,
    I: /[ÍÌÎÏ]/gm,
    i: /[íìîï]/gm,
    e: /[éèêë]/gm,
    E: /[ÉÈÊË]/gm,
    o: /[óòôõºö]/gm,
    O: /[ÓÒÔÕÖ]/gm,
    u: /[úùûü]/gm,
    U: /[ÚÙÛÜ]/gm,
    c: /ç/gm,
    C: /Ç/gm,
    n: /ñ/gm,
    N: /Ñ/gm,
    "-": /–/gm,
    " ": /[’‘‹›‚“”«»„[] ]/gm
  };
  Object.keys(utf8).forEach((char) => {
    str = str.replace(utf8[char], char);
  });
  return str;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
