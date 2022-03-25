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
var SComponentUtils_exports = {};
__export(SComponentUtils_exports, {
  default: () => SComponent
});
module.exports = __toCommonJS(SComponentUtils_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"));
var import_s_conductor = __toESM(require("@coffeekraken/s-conductor"));
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_adoptStyleInShadowRoot = __toESM(require("@coffeekraken/sugar/js/dom/css/adoptStyleInShadowRoot"));
var import_injectStyle = __toESM(require("@coffeekraken/sugar/js/dom/css/injectStyle"));
var import_inViewportStatusChange = __toESM(require("@coffeekraken/sugar/js/dom/detect/inViewportStatusChange"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_autoCast = __toESM(require("@coffeekraken/sugar/shared/string/autoCast"));
var import_camelCase = __toESM(require("@coffeekraken/sugar/shared/string/camelCase"));
var import_dashCase = __toESM(require("@coffeekraken/sugar/shared/string/dashCase"));
var import_SComponentUtilsDefaultPropsInterface = __toESM(require("./interface/SComponentUtilsDefaultPropsInterface"));
class SComponent extends import_s_class.default {
  constructor(node, props, settings = {}) {
    super((0, import_deepMerge.default)({
      componentUtils: {}
    }, settings));
    this.state = "pending";
    this._isInViewport = false;
    var _a, _b;
    this.node = node;
    this._props = props;
    this.inViewportStatusChange.on("enter", () => {
      this._isInViewport = true;
    }).on("leave", () => {
      this._isInViewport = false;
    });
    let InterfaceToApply = class InlineSComponentUtilsInterface extends import_s_interface.default {
    };
    InterfaceToApply.definition = __spreadValues(__spreadValues({}, Object.assign({}, import_SComponentUtilsDefaultPropsInterface.default.definition)), (_b = (_a = this.componentUtilsSettings.interface) == null ? void 0 : _a.definition) != null ? _b : {});
    this.InterfaceToApply = InterfaceToApply;
    const styleStr = this.componentUtilsSettings.style;
    this.injectStyle(styleStr != null ? styleStr : "");
  }
  get name() {
    var _a;
    return (_a = this.componentUtilsSettings.name) != null ? _a : this.node.tagName.toLowerCase();
  }
  static setDefaultProps(selector, props) {
    selector = Array.isArray(selector) ? selector : [selector];
    selector.forEach((sel) => {
      var _a;
      this._defaultProps[sel] = __spreadValues(__spreadValues({}, (_a = this._defaultProps[sel]) != null ? _a : {}), props);
    });
  }
  static getDefaultProps(selector) {
    var _a;
    return (_a = this._defaultProps[selector]) != null ? _a : {};
  }
  get componentUtilsSettings() {
    return this._settings.componentUtils;
  }
  get inViewportStatusChange() {
    if (this._inViewportStatusChangePromise)
      return this._inViewportStatusChangePromise;
    this._inViewportStatusChangePromise = (0, import_inViewportStatusChange.default)(this.node);
    return this._inViewportStatusChangePromise;
  }
  waitAndExecute(callback) {
    return import_s_conductor.default.when(this.node, this.props.mountWhen, callback);
  }
  adoptStyleInShadowRoot($shadowRoot, $context) {
    return (0, import_adoptStyleInShadowRoot.default)($shadowRoot, $context);
  }
  get props() {
    if (this._finalProps)
      return this._finalProps;
    const props = this._props;
    let passedProps = {};
    if (props.constructor.name === "NamedNodeMap") {
      Object.keys(props).forEach((key) => {
        var _a, _b, _c;
        let value;
        if (((_a = props[key]) == null ? void 0 : _a.nodeValue) !== void 0) {
          if (props[key].nodeValue === "")
            value = true;
          else
            value = props[key].nodeValue;
        }
        if (!value)
          return;
        passedProps[(0, import_camelCase.default)((_c = (_b = props[key]) == null ? void 0 : _b.name) != null ? _c : key)] = (0, import_autoCast.default)(value);
      });
    } else {
      j;
      passedProps = props;
    }
    this._finalProps = (0, import_deepMerge.default)(this.defaultProps, this.InterfaceToApply.apply(passedProps, {
      descriptor: {
        defaults: false
      }
    }));
    const _this = this;
    this._finalProps = new Proxy(this._finalProps, {
      get(target, prop, receiver) {
        return target[prop];
      },
      set(obj, prop, value) {
        const propDef = _this.InterfaceToApply.definition[prop];
        if (propDef == null ? void 0 : propDef.physical) {
          if (value === false || value === void 0 || value === null) {
            _this.node.removeAttribute((0, import_dashCase.default)(prop));
          } else {
            _this.node.setAttribute((0, import_dashCase.default)(prop), String(value));
          }
        }
        obj[prop] = value;
        return true;
      }
    });
    Object.keys(this._finalProps).forEach((prop) => {
      this._finalProps[prop] = this._finalProps[prop];
    });
    return this._finalProps;
  }
  get defaultProps() {
    var _a, _b, _c;
    if (this._defaultProps)
      return Object.assign({}, this._defaultProps);
    this._defaultProps = Object.assign({}, (0, import_deepMerge.default)(this.InterfaceToApply.defaults(), (_a = this.componentUtilsSettings.defaultProps) != null ? _a : {}, (_b = this.constructor._defaultProps["*"]) != null ? _b : {}, (_c = this.constructor._defaultProps[this.name]) != null ? _c : {}));
    return this._defaultProps;
  }
  static getFinalInterface(int) {
    class InlineSComponentUtilsInterface extends import_s_interface.default {
    }
    InlineSComponentUtilsInterface.definition = import_SComponentUtilsDefaultPropsInterface.default.definition;
    if (int) {
      InlineSComponentUtilsInterface.definition = __spreadValues(__spreadValues({}, import_SComponentUtilsDefaultPropsInterface.default.definition), int.definition);
    }
    return InlineSComponentUtilsInterface;
  }
  injectStyle(css, id = this.tagName) {
    if (this.constructor._injectedStyles.indexOf(id) !== -1)
      return;
    this.constructor._injectedStyles.push(id);
    (0, import_injectStyle.default)(css, id);
  }
  exposeApi(apiObj, ctx = this.node) {
    setTimeout(() => {
      let $on = this.node;
      Object.keys(apiObj).forEach((apiFnName) => {
        const apiFn = apiObj[apiFnName].bind(ctx);
        $on[apiFnName] = apiFn;
      });
    });
  }
  className(cls = "", style = "") {
    let clsString = cls.split(" ").map((clsName) => `${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? "-" : ""}${clsName}`).join(" ");
    if (style && !this.props.bare) {
      clsString += ` ${style}`;
    }
    return clsString;
  }
  isMounted() {
    var _a;
    return (_a = this.node) == null ? void 0 : _a.hasAttribute("mounted");
  }
  isInViewport() {
    return this._isInViewport;
  }
}
SComponent._defaultProps = {};
SComponent._injectedStyles = [];
