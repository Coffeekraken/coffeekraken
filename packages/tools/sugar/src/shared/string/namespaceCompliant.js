var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __simplifySpecialChars from "./simplifySpecialChars";
function namespaceCompliant(str, settings) {
  settings = __spreadValues({
    exclude: []
  }, settings != null ? settings : {});
  str = str.replace(/\s{1,9999999999999999}/gm, "-");
  str = __simplifySpecialChars(str);
  const dict = {
    "\\": "-",
    "(": "-",
    ")": "-",
    "{": "-",
    "}": "-",
    "[": "-",
    "]": "-",
    "=": "-",
    "?": "-",
    "!": "-",
    "&": "-",
    "%": "-",
    "*": "-",
    '"': "-",
    "'": "-",
    "`": "-",
    "+": "-",
    "/": ".",
    "\xB0": "-",
    $: "-",
    "<": "-",
    ">": "-",
    ",": "-",
    ":": "-",
    "#": "-"
  };
  settings.exclude.forEach((char) => {
    delete dict[char];
  });
  Object.keys(dict).forEach((char) => {
    str = str.split(char).join(dict[char]);
  });
  str = str.replace(/\.{2,999}/gm, ".");
  str = str.replace(/^-{1,999}/gm, "");
  str = str.replace(/-{1,999}$/gm, "");
  str = str.replace(/-{2,999}/gm, "-");
  str = str.replace(/[^a-zA-Z0-9@]{1,999}$/, "");
  str = str.replace(/^[^a-zA-Z0-9@]{1,999}/, "");
  return str;
}
export {
  namespaceCompliant as default
};
