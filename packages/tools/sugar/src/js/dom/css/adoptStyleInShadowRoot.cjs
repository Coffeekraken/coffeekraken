import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var adoptStyleInShadowRoot_exports = {};
__export(adoptStyleInShadowRoot_exports, {
  default: () => adoptStyleInShadowRoot
});
module.exports = __toCommonJS(adoptStyleInShadowRoot_exports);
const _links = {}, _stylesheets = {};
async function adoptStyleInShadowRoot($shadowRoot, $context = document) {
  const $links = $context.querySelectorAll('link[rel="stylesheet"]');
  if ($links && $shadowRoot) {
    Array.from($links).forEach(async ($link) => {
      $shadowRoot == null ? void 0 : $shadowRoot.appendChild($link.cloneNode());
    });
  }
  return true;
}
