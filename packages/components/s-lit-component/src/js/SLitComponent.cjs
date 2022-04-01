import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var SLitComponent_exports = {};
__export(SLitComponent_exports, {
  default: () => SLitComponent
});
module.exports = __toCommonJS(SLitComponent_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_dashCase = __toESM(require("@coffeekraken/sugar/shared/string/dashCase"));
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"));
var import_s_component_utils = __toESM(require("@coffeekraken/s-component-utils"));
var import_lit = require("lit");
class SLitComponent extends import_lit.LitElement {
  constructor(settings = {}) {
    super();
    this._settings = {};
    this._shouldUpdate = false;
    var _a, _b, _c, _d, _e, _f, _g;
    this._settings = (0, import_deepMerge.default)({
      componentUtils: {},
      litComponent: {
        shadowDom: true,
        get rootNode() {
          var _a2;
          return (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("*:first-child");
        }
      }
    }, settings);
    this.componentUtils = new import_s_component_utils.default(this, this.attributes, {
      componentUtils: __spreadProps(__spreadValues({}, (_a = this._settings.componentUtils) != null ? _a : {}), {
        style: (_e = (_d = (_b = this.constructor.styles) == null ? void 0 : _b.cssText) != null ? _d : (_c = this._settings.componentUtils) == null ? void 0 : _c.style) != null ? _e : ""
      })
    });
    this.props = this.componentUtils.props;
    if (this.litComponentSettings.shadowDom === false) {
      this.createRenderRoot = () => {
        return this;
      };
    }
    Object.keys(this.componentUtils.props).forEach((prop) => {
      this[prop] = this.componentUtils.props[prop];
    });
    const nodeFirstUpdated = (_f = this.firstUpdated) == null ? void 0 : _f.bind(this);
    this.firstUpdated = async () => {
      if (nodeFirstUpdated) {
        await nodeFirstUpdated();
      }
      this.mounted = true;
    };
    const nodeShouldUpdate = (_g = this.shouldUpdate) == null ? void 0 : _g.bind(this);
    this.shouldUpdate = () => {
      if (nodeShouldUpdate) {
        const res = nodeShouldUpdate();
        if (!res)
          return false;
      }
      return this._shouldUpdate;
    };
    (async () => {
      await this.componentUtils.waitAndExecute(this.mount.bind(this));
    })();
  }
  static setDefaultProps(selector, props) {
    import_s_component_utils.default.setDefaultProps(selector, props);
  }
  get litComponentSettings() {
    return this._settings.litComponent;
  }
  static properties(properties, ...ints) {
    const propertiesObj = {};
    ints.forEach((int) => {
      const InterfaceToApply = import_s_component_utils.default.getFinalInterface(int);
      Object.keys(InterfaceToApply.definition).forEach((prop) => {
        var _a, _b, _c, _d, _e, _f;
        const definition = InterfaceToApply.definition[prop];
        propertiesObj[prop] = __spreadValues({}, (_a = definition.lit) != null ? _a : {});
        if (definition.physical || ((_c = (_b = definition.type) == null ? void 0 : _b.toLowerCase) == null ? void 0 : _c.call(_b)) === "boolean" || ((_f = (_e = (_d = definition.type) == null ? void 0 : _d.type) == null ? void 0 : _e.toLowerCase) == null ? void 0 : _f.call(_e)) === "boolean") {
          propertiesObj[prop].reflect = true;
          propertiesObj[prop].attribute = (0, import_dashCase.default)(prop);
          propertiesObj[prop].converter = {
            toAttribute(value) {
              if (value === "false" || value === false || value === null)
                return null;
              return String(value);
            }
          };
        }
      });
    });
    const props = __spreadValues(__spreadValues({}, propertiesObj), properties != null ? properties : {});
    return props;
  }
  async mount() {
    var _a, _b;
    this._shouldUpdate = true;
    this.requestUpdate();
    await this.updateComplete;
    this.componentUtils.injectStyle((_b = (_a = this.constructor.styles) == null ? void 0 : _a.cssText) != null ? _b : "", this.tagName);
    await (0, import_wait.default)();
    if (this.componentUtils.props.adoptStyle && this.shadowRoot) {
      await this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
    }
    return true;
  }
}
