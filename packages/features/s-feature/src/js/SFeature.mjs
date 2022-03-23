import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-PG3ZPS4G.mjs";
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
