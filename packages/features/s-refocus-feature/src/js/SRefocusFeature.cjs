import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var SRefocusFeature_exports = {};
__export(SRefocusFeature_exports, {
  default: () => SRefocusFeature,
  define: () => define
});
module.exports = __toCommonJS(SRefocusFeature_exports);
var import_s_feature = __toESM(require("@coffeekraken/s-feature"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SRefocusFeatureInterface = __toESM(require("./interface/SRefocusFeatureInterface"));
var import_scrollTo = __toESM(require("@coffeekraken/sugar/js/dom/scroll/scrollTo"));
class SRefocusFeature extends import_s_feature.default {
  constructor(name, node, settings) {
    super(name, node, (0, import_deepMerge.default)({
      componentUtils: {
        interface: import_SRefocusFeatureInterface.default
      },
      feature: {}
    }, settings != null ? settings : {}));
  }
  mount() {
    this.props.trigger.forEach((trigger) => {
      switch (trigger) {
        case "anchor":
          setTimeout(() => {
            if (document.location.hash) {
              const $targetElm = this.node.querySelector(document.location.hash);
              if ($targetElm) {
                this._scrollTo($targetElm);
              }
            }
          }, this.props.timeout);
          break;
        case "history":
          window.addEventListener("hashchange", (e) => {
            if (document.location.hash) {
              const $targetElm = this.node.querySelector(document.location.hash);
              if ($targetElm) {
                this._scrollTo($targetElm);
              }
            }
          });
          window.addEventListener("popstate", (e) => {
            if (document.location.hash) {
              const $targetElm = this.node.querySelector(document.location.hash);
              if ($targetElm) {
                this._scrollTo($targetElm);
              }
            }
          });
          break;
        default:
          if (trigger.match(/^event:/)) {
            const event = trigger.replace("event:", "").trim();
            this.node.addEventListener(event, (e) => {
              this._scrollTo(e.target);
            });
          }
          break;
      }
    });
  }
  _scrollTo($elm) {
    var _a;
    (0, import_scrollTo.default)($elm, __spreadValues({
      $elm: this.node
    }, (_a = this.props.scrollToSettings) != null ? _a : {}));
  }
}
function define(props = {}, name = "s-refocus") {
  import_s_feature.default.defineFeature(name, SRefocusFeature, props);
}
