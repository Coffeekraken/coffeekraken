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
var canHaveChildren_exports = {};
__export(canHaveChildren_exports, {
  default: () => canHaveChildren_default
});
module.exports = __toCommonJS(canHaveChildren_exports);
function canHaveChildren(element) {
  if (typeof element === "string") {
    element = document.createElement(element);
  } else if (!(element instanceof HTMLElement)) {
    throw `The element parameter can be either a string or an HTMLElement node reference... You've passed "${typeof element}"`;
  }
  if ("canHaveHTML" in element)
    return element.canHaveHTML;
  const tagName = element.tagName;
  const closeTag = `</${tagName}>`.toLowerCase();
  if (element.outerHTML.slice((tagName.length + 3) * -1) === closeTag)
    return true;
  return false;
}
var canHaveChildren_default = canHaveChildren;
