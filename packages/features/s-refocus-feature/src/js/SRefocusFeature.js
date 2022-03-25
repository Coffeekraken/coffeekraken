var __defProp = Object.defineProperty;
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
import __SFeature from "@coffeekraken/s-feature";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SRefocusFeatureInterface from "./interface/SRefocusFeatureInterface";
import __scrollTo from "@coffeekraken/sugar/js/dom/scroll/scrollTo";
class SRefocusFeature extends __SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      componentUtils: {
        interface: __SRefocusFeatureInterface
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
    __scrollTo($elm, __spreadValues({
      $elm: this.node
    }, (_a = this.props.scrollToSettings) != null ? _a : {}));
  }
}
function define(props = {}, name = "s-refocus") {
  __SFeature.defineFeature(name, SRefocusFeature, props);
}
export {
  SRefocusFeature as default,
  define
};
