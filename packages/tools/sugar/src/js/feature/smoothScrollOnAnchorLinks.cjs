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
var smoothScrollOnAnchorLinks_exports = {};
__export(smoothScrollOnAnchorLinks_exports, {
  default: () => smoothScrollOnAnchorLinks_default
});
module.exports = __toCommonJS(smoothScrollOnAnchorLinks_exports);
var import_querySelectorLive = __toESM(require("../dom/query/querySelectorLive"), 1);
var import_url_parse = __toESM(require("url-parse"), 1);
var import_scrollTo = __toESM(require("../dom/scroll/scrollTo"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
function smoothScrollOnAnchorLinks(settings = {}) {
  settings = (0, import_deepMerge.default)({
    scroll: {},
    checkPathNames: true
  }, settings);
  (0, import_querySelectorLive.default)('a:not([is])[href*="#"]', ($link) => {
    $link.addEventListener("click", (e) => {
      const linkUrl = (0, import_url_parse.default)($link.getAttribute("href"));
      const currentUrl = (0, import_url_parse.default)();
      if (!linkUrl.hash || linkUrl.hash === "#")
        return;
      if (settings.checkPathNames && currentUrl.pathname !== linkUrl.pathname)
        return;
      const $target = document.querySelector(linkUrl.hash);
      if (!$target)
        return;
      e.preventDefault();
      history.pushState({}, null, linkUrl.hash);
      (0, import_scrollTo.default)($target, settings.scroll);
    });
  });
}
var smoothScrollOnAnchorLinks_default = smoothScrollOnAnchorLinks;
