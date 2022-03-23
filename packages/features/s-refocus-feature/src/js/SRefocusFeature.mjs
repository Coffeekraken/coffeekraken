import {
  __spreadValues
} from "../../../../chunk-PG3ZPS4G.mjs";
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
