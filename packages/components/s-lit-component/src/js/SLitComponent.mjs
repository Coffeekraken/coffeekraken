import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-PG3ZPS4G.mjs";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __dashCase from "@coffeekraken/sugar/shared/string/dashCase";
import __wait from "@coffeekraken/sugar/shared/time/wait";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import { LitElement } from "lit";
class SLitComponent extends LitElement {
  constructor(settings = {}) {
    super();
    this._settings = {};
    this._shouldUpdate = false;
    var _a, _b, _c, _d, _e, _f, _g;
    this._settings = __deepMerge({
      componentUtils: {},
      litComponent: {
        shadowDom: true,
        get rootNode() {
          var _a2;
          return (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("*:first-child");
        }
      }
    }, settings);
    this.componentUtils = new __SComponentUtils(this, this.attributes, {
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
    __SComponentUtils.setDefaultProps(selector, props);
  }
  get litComponentSettings() {
    return this._settings.litComponent;
  }
  static properties(properties, ...ints) {
    const propertiesObj = {};
    ints.forEach((int) => {
      const InterfaceToApply = __SComponentUtils.getFinalInterface(int);
      Object.keys(InterfaceToApply.definition).forEach((prop) => {
        var _a, _b, _c, _d, _e, _f;
        const definition = InterfaceToApply.definition[prop];
        propertiesObj[prop] = __spreadValues({}, (_a = definition.lit) != null ? _a : {});
        if (definition.physical || ((_c = (_b = definition.type) == null ? void 0 : _b.toLowerCase) == null ? void 0 : _c.call(_b)) === "boolean" || ((_f = (_e = (_d = definition.type) == null ? void 0 : _d.type) == null ? void 0 : _e.toLowerCase) == null ? void 0 : _f.call(_e)) === "boolean") {
          propertiesObj[prop].reflect = true;
          propertiesObj[prop].attribute = __dashCase(prop);
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
    await __wait();
    if (this.componentUtils.props.adoptStyle && this.shadowRoot) {
      await this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
    }
    return true;
  }
}
export {
  SLitComponent as default
};
