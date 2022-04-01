import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var krakenLogo_exports = {};
__export(krakenLogo_exports, {
  default: () => krakenLogo_default
});
module.exports = __toCommonJS(krakenLogo_exports);
var import_querySelectorLive = __toESM(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"), 1);
function krakenLogo_default() {
  const maxOffset = 6;
  function krakenLogo($elm) {
    let isHover = false, hoverTimeout;
    const $squareItems = $elm.querySelectorAll(".kraken-logo > path");
    $squareItems.forEach(($item) => {
      $item.style.transition = "transform 0.1s cubic-bezier(0.700, 0.000, 0.305, 0.995)";
    });
    function anim() {
      $squareItems.forEach(($squareItem) => {
        const offsetX = maxOffset * -1 + Math.random() * (maxOffset * 2), offsetY = maxOffset * -1 + Math.random() * (maxOffset * 2);
        $squareItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
      if (isHover) {
        hoverTimeout = setTimeout(anim, Math.random() * 100);
      }
    }
    function hover() {
      if (isHover)
        return;
      isHover = true;
      anim();
    }
    function out() {
      clearTimeout(hoverTimeout);
      isHover = false;
      $squareItems.forEach(($squareItem) => {
        $squareItem.style.transform = `translate(0px, 0px)`;
      });
    }
    $elm.addEventListener("mouseover", hover);
    $elm.addEventListener("mouseout", out);
  }
  (0, import_querySelectorLive.default)("[s-kraken-logo]", krakenLogo);
}
