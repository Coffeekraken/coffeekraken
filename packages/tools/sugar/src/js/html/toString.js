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
var toString_exports = {};
__export(toString_exports, {
  default: () => toString_default
});
module.exports = __toCommonJS(toString_exports);
function toStringFn(html, deep = true) {
  if (document !== void 0 && document.createElement !== void 0) {
    const cont = document.createElement("div");
    cont.appendChild(html.cloneNode(deep));
    return cont.innerHTML;
  }
  return html;
}
var toString_default = toStringFn;
