import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SFeature from "@coffeekraken/s-feature";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SPageTransitionFeatureInterface from "./interface/SPageTransitionFeatureInterface";
import __SRequest from "@coffeekraken/s-request";
import __querySelectorUp from "@coffeekraken/sugar/js/dom/query/querySelectorUp";
import __scrollTo from "@coffeekraken/sugar/js/dom/scroll/scrollTo";
class SPageTransitionFeature extends __SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      componentUtils: {
        interface: __SPageTransitionFeatureInterface
      },
      feature: {}
    }, settings != null ? settings : {}));
    window.history.pushState({
      html: this.node.innerHTML
    }, document.title, document.location.href);
    window.addEventListener("popstate", (e) => {
      var _a;
      if (!((_a = e.state) == null ? void 0 : _a.html))
        return;
      if (e.state.containerId) {
        const $elm = document.querySelector(`[s-page-transition-container="${e.state.containerId}"]`);
        if (!$elm)
          return;
        $elm.innerHTML = e.state.html;
        __scrollTo($elm);
      } else {
        this.node.innerHTML = e.state.html;
        __scrollTo(this.node);
      }
    });
    window.addEventListener("location.href", (e) => {
      this.transitionTo(e.detail, e.target);
    });
    window.addEventListener("click", (e) => {
      const $target = e.target;
      if ($target.hasAttribute("href") && !$target.getAttribute("href").match(/^https?:\/\//) && !$target.hasAttribute("target")) {
        e.preventDefault();
        this.transitionTo($target.getAttribute("href"), $target);
      } else {
        const $upHrefElm = __querySelectorUp($target, "a[href]");
        if ($upHrefElm) {
          e.preventDefault();
          this.transitionTo($upHrefElm.getAttribute("href"), $upHrefElm);
        }
      }
    });
  }
  mount() {
  }
  transitionTo(url, $source) {
    return new Promise(async (resolve, reject) => {
      var _a, _b, _c, _d, _e;
      $source.dispatchEvent(new CustomEvent("page-transition-start", {
        detail: {
          url
        },
        bubbles: true
      }));
      document.body.classList.add("s-page-transition");
      document.body.classList.add("loading");
      document.body.setAttribute("loading", true);
      $source.classList.add("s-page-transition-source");
      $source.classList.add("loading");
      $source.setAttribute("loading", true);
      (_b = (_a = this.props).before) == null ? void 0 : _b.call(_a, {
        url,
        $source
      });
      const request = new __SRequest({
        url
      });
      const response = await request.send();
      console.log(response);
      const domParser = new DOMParser();
      const dom = domParser.parseFromString((_c = response.data) != null ? _c : "", "text/html");
      const $inPageContainer = document.querySelector("[s-page-transition]");
      const $container = dom.querySelector("[s-page-transition]");
      const $inPageScopedContainer = document.querySelector("[s-page-transition-container]");
      const $scopedContainer = dom.querySelector("[s-page-transition-container]");
      if (!$container || !$inPageContainer) {
        return reject();
      }
      if (this.props.patchBody) {
        const $inPageBody = document.querySelector("body");
        const $newBody = dom.querySelector("body");
        if ($inPageBody && $newBody) {
          const newAttrNames = [];
          for (let attr of $newBody.attributes) {
            $inPageBody.setAttribute(attr.name, attr.value);
            newAttrNames.push(attr.name);
          }
          for (let attr of $inPageBody.attributes) {
            if (!newAttrNames.includes(attr.name)) {
              $inPageBody.removeAttribute(attr.name);
            }
          }
        }
      }
      let newState = {};
      if ($inPageScopedContainer && $scopedContainer && ($inPageScopedContainer == null ? void 0 : $inPageScopedContainer.getAttribute("s-page-transition-container")) === $scopedContainer.getAttribute("s-page-transition-container")) {
        $inPageScopedContainer.innerHTML = $scopedContainer.innerHTML;
        newState.html = $scopedContainer.innerHTML;
        newState.containerId = $scopedContainer.getAttribute("s-page-transition-container");
      } else {
        $inPageContainer.innerHTML = $container.innerHTML;
        newState.html = $container.innerHTML;
      }
      window.history.pushState(newState, document.title, url);
      if (this.props.scrollTop) {
        __scrollTo($inPageScopedContainer != null ? $inPageScopedContainer : $inPageContainer);
      }
      document.body.classList.remove("s-page-transition");
      document.body.classList.remove("loading");
      document.body.removeAttribute("loading");
      $source.classList.remove("s-page-transition-source");
      $source.classList.remove("loading");
      $source.removeAttribute("loading");
      (_e = (_d = this.props).after) == null ? void 0 : _e.call(_d, {
        url,
        $source
      });
      $source.dispatchEvent(new CustomEvent("page-transition-end", {
        detail: {
          url
        },
        bubbles: true
      }));
    });
  }
}
function define(props = {}, name = "s-page-transition") {
  __SFeature.defineFeature(name, SPageTransitionFeature, props);
}
export {
  SPageTransitionFeature as default,
  define
};
