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
var wrap_exports = {};
__export(wrap_exports, {
  default: () => wrap_default
});
module.exports = __toCommonJS(wrap_exports);
function wrap($elm, $wrapper) {
  if (typeof $wrapper === "string") {
    $wrapper = document.createElement($wrapper);
  }
  const $parent = $elm.parentNode;
  const $sibling = $elm.nextSibling;
  if ($sibling) {
    $parent.insertBefore($wrapper, $sibling);
  } else {
    $parent.appendChild($wrapper);
  }
  return $wrapper.appendChild($elm);
}
var wrap_default = wrap;
