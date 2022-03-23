var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var SPageTransitionFeature_exports = {};
__export(SPageTransitionFeature_exports, {
  default: () => SPageTransitionFeature,
  define: () => define
});
module.exports = __toCommonJS(SPageTransitionFeature_exports);
var import_s_feature = __toESM(require("@coffeekraken/s-feature"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_SPageTransitionFeatureInterface = __toESM(require("./interface/SPageTransitionFeatureInterface"), 1);
var import_s_request = __toESM(require("@coffeekraken/s-request"), 1);
var import_querySelectorUp = __toESM(require("@coffeekraken/sugar/js/dom/query/querySelectorUp"), 1);
var import_scrollTo = __toESM(require("@coffeekraken/sugar/js/dom/scroll/scrollTo"), 1);
class SPageTransitionFeature extends import_s_feature.default {
  constructor(name, node, settings) {
    super(name, node, (0, import_deepMerge.default)({
      componentUtils: {
        interface: import_SPageTransitionFeatureInterface.default
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
        (0, import_scrollTo.default)($elm);
      } else {
        this.node.innerHTML = e.state.html;
        (0, import_scrollTo.default)(this.node);
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
        const $upHrefElm = (0, import_querySelectorUp.default)($target, "a[href]");
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
      const request = new import_s_request.default({
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
        (0, import_scrollTo.default)($inPageScopedContainer != null ? $inPageScopedContainer : $inPageContainer);
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
  import_s_feature.default.defineFeature(name, SPageTransitionFeature, props);
}
