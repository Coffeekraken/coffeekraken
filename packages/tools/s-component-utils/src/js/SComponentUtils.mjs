import {
  __spreadValues
} from "../../../../chunk-PG3ZPS4G.mjs";
import __SClass from "@coffeekraken/s-class";
import __SConductor from "@coffeekraken/s-conductor";
import __SInterface from "@coffeekraken/s-interface";
import __adoptStyleInShadowRoot from "@coffeekraken/sugar/js/dom/css/adoptStyleInShadowRoot";
import __injectStyle from "@coffeekraken/sugar/js/dom/css/injectStyle";
import __inViewportStatusChange from "@coffeekraken/sugar/js/dom/detect/inViewportStatusChange";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __autoCast from "@coffeekraken/sugar/shared/string/autoCast";
import __camelCase from "@coffeekraken/sugar/shared/string/camelCase";
import __dashCase from "@coffeekraken/sugar/shared/string/dashCase";
import __SComponentUtilsDefaultPropsInterface from "./interface/SComponentUtilsDefaultPropsInterface";
class SComponent extends __SClass {
  constructor(node, props, settings = {}) {
    super(__deepMerge({
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
    let InterfaceToApply = class InlineSComponentUtilsInterface extends __SInterface {
    };
    InterfaceToApply.definition = __spreadValues(__spreadValues({}, Object.assign({}, __SComponentUtilsDefaultPropsInterface.definition)), (_b = (_a = this.componentUtilsSettings.interface) == null ? void 0 : _a.definition) != null ? _b : {});
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
    this._inViewportStatusChangePromise = __inViewportStatusChange(this.node);
    return this._inViewportStatusChangePromise;
  }
  waitAndExecute(callback) {
    return __SConductor.when(this.node, this.props.mountWhen, callback);
  }
  adoptStyleInShadowRoot($shadowRoot, $context) {
    return __adoptStyleInShadowRoot($shadowRoot, $context);
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
        passedProps[__camelCase((_c = (_b = props[key]) == null ? void 0 : _b.name) != null ? _c : key)] = __autoCast(value);
      });
    } else {
      j;
      passedProps = props;
    }
    this._finalProps = __deepMerge(this.defaultProps, this.InterfaceToApply.apply(passedProps, {
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
            _this.node.removeAttribute(__dashCase(prop));
          } else {
            _this.node.setAttribute(__dashCase(prop), String(value));
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
    this._defaultProps = Object.assign({}, __deepMerge(this.InterfaceToApply.defaults(), (_a = this.componentUtilsSettings.defaultProps) != null ? _a : {}, (_b = this.constructor._defaultProps["*"]) != null ? _b : {}, (_c = this.constructor._defaultProps[this.name]) != null ? _c : {}));
    return this._defaultProps;
  }
  static getFinalInterface(int) {
    class InlineSComponentUtilsInterface extends __SInterface {
    }
    InlineSComponentUtilsInterface.definition = __SComponentUtilsDefaultPropsInterface.definition;
    if (int) {
      InlineSComponentUtilsInterface.definition = __spreadValues(__spreadValues({}, __SComponentUtilsDefaultPropsInterface.definition), int.definition);
    }
    return InlineSComponentUtilsInterface;
  }
  injectStyle(css, id = this.tagName) {
    if (this.constructor._injectedStyles.indexOf(id) !== -1)
      return;
    this.constructor._injectedStyles.push(id);
    __injectStyle(css, id);
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
export {
  SComponent as default
};
