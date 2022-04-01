import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SFeature from "@coffeekraken/s-feature";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SSugarFeatureInterface from "./interface/SSugarFeatureInterface";
import __clearTransmations from "@coffeekraken/sugar/js/dom/transmation/clearTransmations";
import __inputAdditionalAttributes from "@coffeekraken/sugar/js/feature/inputAdditionalAttributes";
import __linksStateAttributes from "@coffeekraken/sugar/js/feature/linksStateAttributes";
import __preventScrollRestoration from "@coffeekraken/sugar/js/dom/scroll/preventScrollRestoration";
class SSugarFeature extends __SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      componentUtils: {
        interface: __SSugarFeatureInterface
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
      __inputAdditionalAttributes();
    if (this.componentUtils.props.linksStateAttributes)
      __linksStateAttributes();
    if (this.componentUtils.props.preventScrollRestoration)
      __preventScrollRestoration();
  }
  _clearTransmationsOnResize() {
    let resetFn;
    window.addEventListener("resize", () => {
      if (!this._isResizing) {
        resetFn = __clearTransmations();
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
  __SFeature.defineFeature(name, SSugarFeature, props);
}
export {
  SSugarFeature as default,
  define
};
