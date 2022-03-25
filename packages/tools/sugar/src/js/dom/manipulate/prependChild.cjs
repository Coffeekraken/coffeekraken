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
var prependChild_exports = {};
__export(prependChild_exports, {
  default: () => prependChild_default
});
module.exports = __toCommonJS(prependChild_exports);
function prependChild(elm, refElm) {
  if (!refElm.firstChild) {
    refElm.appendChild(elm);
  } else {
    refElm.insertBefore(elm, refElm.firstChild);
  }
  return elm;
}
var prependChild_default = prependChild;
