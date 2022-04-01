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
var clearTransmations_exports = {};
__export(clearTransmations_exports, {
  default: () => clearTransmations
});
module.exports = __toCommonJS(clearTransmations_exports);
var import_uniqid = __toESM(require("@coffeekraken/sugar/shared/string/uniqid"), 1);
function clearTransmations($elm = document.body, settings) {
  const cls = `s-clear-transmations-${(0, import_uniqid.default)()}`;
  $elm.classList.add(cls);
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.innerHTML = `
        .${cls},
        .${cls}:before,
        .${cls}:after,
        .${cls} *,
        .${cls} *:before,
        .${cls} *:after {
            animation: none !important;
            transition: none !important;
        }
    `;
  document.head.appendChild($tag);
  function reset() {
    $elm.classList.remove(cls);
    $tag.remove();
  }
  if (settings == null ? void 0 : settings.timeout) {
    setTimeout(() => {
      reset();
    }, settings.timeout);
  }
  return reset;
}
