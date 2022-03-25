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
var SSugarFeature_exports = {};
__export(SSugarFeature_exports, {
  default: () => SSugarFeature,
  define: () => define
});
module.exports = __toCommonJS(SSugarFeature_exports);
var import_s_feature = __toESM(require("@coffeekraken/s-feature"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SSugarFeatureInterface = __toESM(require("./interface/SSugarFeatureInterface"));
var import_clearTransmations = __toESM(require("@coffeekraken/sugar/js/dom/transmation/clearTransmations"));
var import_inputAdditionalAttributes = __toESM(require("@coffeekraken/sugar/js/feature/inputAdditionalAttributes"));
var import_linksStateAttributes = __toESM(require("@coffeekraken/sugar/js/feature/linksStateAttributes"));
var import_preventScrollRestoration = __toESM(require("@coffeekraken/sugar/js/dom/scroll/preventScrollRestoration"));
class SSugarFeature extends import_s_feature.default {
  constructor(name, node, settings) {
    super(name, node, (0, import_deepMerge.default)({
      componentUtils: {
        interface: import_SSugarFeatureInterface.default
      },
      feature: {}
    }, settings != null ? settings : {}));
    this._isResizing = false;
  }
  mount() {
    if (this.componentUtils.props.scrolled)
      this._scrolled();
    if (this.componentUtils.props.vhvar)
      this._vhvar();
    if (this.componentUtils.props.resizeTransmations)
      this._clearTransmationsOnResize();
    if (this.componentUtils.props.inputAdditionalAttributes)
      (0, import_inputAdditionalAttributes.default)();
    if (this.componentUtils.props.linksStateAttributes)
      (0, import_linksStateAttributes.default)();
    if (this.componentUtils.props.preventScrollRestoration)
      (0, import_preventScrollRestoration.default)();
  }
  _clearTransmationsOnResize() {
    let resetFn;
    window.addEventListener("resize", () => {
      if (!this._isResizing) {
        resetFn = (0, import_clearTransmations.default)();
      }
      this._isResizing = true;
      clearTimeout(this._clearTransmationsOnResizeTimeout);
      this._clearTransmationsOnResizeTimeout = setTimeout(() => {
        this._isResizing = false;
        resetFn == null ? void 0 : resetFn();
      }, 100);
    });
  }
  _scrolled() {
    document.addEventListener("scroll", (e) => {
      if (window.scrollY >= this.componentUtils.props.scrolledDelta) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    });
  }
  _vhvar() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
}
function define(props = {}, name = "s-sugar") {
  import_s_feature.default.defineFeature(name, SSugarFeature, props);
}
