import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SClass from "@coffeekraken/s-class";
import __querySelectorLive from "@coffeekraken/sugar/js/dom/query/querySelectorLive";
import __SComponentUtils from "@coffeekraken/s-component-utils";
class SFeature extends __SClass {
  static setDefaultProps(selector, props) {
    __SComponentUtils.setDefaultProps(selector, props);
  }
  static defineFeature(name, feature, defaultProps = {}) {
    this.setDefaultProps(name, defaultProps);
    __querySelectorLive(`[${name}]`, ($elm) => {
      new feature(name, $elm, __SComponentUtils.getDefaultProps(name));
    });
  }
  get featureSettings() {
    return this._settings.feature;
  }
  constructor(name, node, settings = {}) {
    super(__deepMerge({
      componentUtils: {},
      feature: {}
    }, settings));
    var _a;
    this.componentUtils = new __SComponentUtils(node, node.attributes, {
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
export {
  SFeature as default
};
