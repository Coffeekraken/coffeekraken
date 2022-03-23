var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var SFeature_exports = {};
__export(SFeature_exports, {
  default: () => SFeature
});
module.exports = __toCommonJS(SFeature_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_querySelectorLive = __toESM(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"), 1);
var import_s_component_utils = __toESM(require("@coffeekraken/s-component-utils"), 1);
class SFeature extends import_s_class.default {
  static setDefaultProps(selector, props) {
    import_s_component_utils.default.setDefaultProps(selector, props);
  }
  static defineFeature(name, feature, defaultProps = {}) {
    this.setDefaultProps(name, defaultProps);
    (0, import_querySelectorLive.default)(`[${name}]`, ($elm) => {
      new feature(name, $elm, import_s_component_utils.default.getDefaultProps(name));
    });
  }
  get featureSettings() {
    return this._settings.feature;
  }
  constructor(name, node, settings = {}) {
    super((0, import_deepMerge.default)({
      componentUtils: {},
      feature: {}
    }, settings));
    var _a;
    this.componentUtils = new import_s_component_utils.default(node, node.attributes, {
      componentUtils: __spreadProps(__spreadValues({}, (_a = this._settings.componentUtils) != null ? _a : {}), {
        name
      })
    });
    this.props = this.componentUtils.props;
    this.name = name;
    this.node = node;
    (async () => {
      var _a2;
      this.componentUtils.waitAndExecute((_a2 = this.mount) == null ? void 0 : _a2.bind(this));
    })();
  }
}
