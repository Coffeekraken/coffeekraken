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
var getMethods_exports = {};
__export(getMethods_exports, {
  default: () => getMethods_default
});
module.exports = __toCommonJS(getMethods_exports);
function getMethods(toCheck) {
  let props = [];
  let obj = toCheck;
  do {
    const _props = Object.getOwnPropertyNames(obj);
    if (_props.indexOf("__defineGetter__") !== -1)
      continue;
    props = props.concat(_props);
  } while (obj = Object.getPrototypeOf(obj));
  return props.sort().filter(function(e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == "function")
      return true;
  });
}
var getMethods_default = getMethods;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
