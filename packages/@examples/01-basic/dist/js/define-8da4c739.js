import { S as SInterface, n as SSugarConfig, e as SFeature, _ as __querySelectorLive, C as __whenNearViewport, D as __whenStylesheetsReady, c as __deepMerge } from "./index.esm.js";
function readCssDataFrom($elm, settings) {
  Object.assign({}, settings !== null && settings !== void 0 ? settings : {});
  let data;
  const beforeStyle = window.getComputedStyle($elm, "::before");
  if (beforeStyle.content !== "none") {
    try {
      data = JSON.parse(JSON.parse(beforeStyle.content));
    } catch (e) {
    }
  }
  if (!data) {
    const afterStyle = window.getComputedStyle($elm, "::after");
    if (afterStyle.content) {
      try {
        data = JSON.parse(JSON.parse(afterStyle.content));
      } catch (e) {
      }
    }
  }
  return data !== null && data !== void 0 ? data : {};
}
class SDepsFeatureInterface extends SInterface {
  static get _definition() {
    return {
      css: {
        type: "String",
        description: 'Specify the "chunk" css you want to load. This is relative to the "cssChunksBasePath" property and can be a simple id like "welcome" that will resolve to "${cssChunksBasePath}/welcome.css" or directly a path'
      },
      cssChunksBasePath: {
        type: "String",
        description: "Specify the path where are stored your css chunk files",
        get default() {
          return `${SSugarConfig.get("serve.css.path")}/chunks`;
        }
      }
    };
  }
}
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SDepsFeature extends SFeature {
  static registerDeps(selector, props = {}) {
    __querySelectorLive(selector, ($elm, { cancel }) => __awaiter(this, void 0, void 0, function* () {
      const whenNearViewportPromise = __whenNearViewport($elm);
      document.addEventListener("s-deps.resolved", (e) => {
        if (e.detail.selector === selector) {
          whenNearViewportPromise.cancel();
        }
      });
      yield whenNearViewportPromise;
      if (this.resolvedSelectors.includes(selector)) {
        return;
      }
      this.resolvedSelectors.push(selector);
      document.dispatchEvent(new CustomEvent("s-deps.resolved", {
        detail: {
          selector,
          $elm
        }
      }));
      cancel();
      props = SDepsFeatureInterface.apply(props !== null && props !== void 0 ? props : {});
      this._handleDepsForElement($elm, props);
    }));
  }
  /**
   * Check if all is loaded and add the "ready" class and attribute
   */
  static _checkAndApplyReadyStateForElement($elm, props = {}) {
    if (props.css && !$elm._sDepsCssStack) {
      return;
    }
    if ($elm._sDepsCssStack.length) {
      return;
    }
    $elm.setAttribute("resolved", "true");
    $elm.classList.add("resolved");
  }
  /**
   * Handle css dependencies for the passed element
   */
  static _handleCssDepsForElement($elm, props = {}) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
      let finalDepsPath = props.css.split(",").map((l) => l.trim());
      $elm._sDepsCssStack = finalDepsPath;
      for (let [i, finalDepPath] of finalDepsPath.entries()) {
        const $existing = document.querySelector(`link[s-deps-css="${finalDepPath}"]`);
        if ($existing) {
          (_b = (_a = $elm._sDepsCssStack) === null || _a === void 0 ? void 0 : _a.splice) === null || _b === void 0 ? void 0 : _b.call(
            _a,
            // @ts-ignore
            $elm._sDepsCssStack.indexOf(finalDepPath),
            1
          );
          this._checkAndApplyReadyStateForElement($elm, props);
          continue;
        }
        if (!finalDepPath.match(/\.css$/)) {
          finalDepPath += ".css";
        }
        const $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("s-deps-css", props.css);
        $link.setAttribute("rel", "preload");
        $link.setAttribute("as", "style");
        $link.setAttribute("href", `${props.cssChunksBasePath}/${finalDepPath}`);
        document.head.appendChild($link);
        const promise = __whenStylesheetsReady($link);
        promise.then(() => {
          var _a2, _b2;
          $link.setAttribute("rel", "stylesheet");
          (_b2 = (_a2 = $elm._sDepsCssStack) === null || _a2 === void 0 ? void 0 : _a2.splice) === null || _b2 === void 0 ? void 0 : _b2.call(
            _a2,
            // @ts-ignore
            $elm._sDepsCssStack.indexOf(finalDepPath),
            1
          );
          this._checkAndApplyReadyStateForElement($elm, props);
        });
      }
    });
  }
  /**
   * Load a partial if needed
   */
  static _handleDepsForElement($elm, props = {}) {
    if (props.css) {
      this._handleCssDepsForElement($elm, props);
    }
  }
  // @ts-ignore
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      name: "s-deps",
      interface: SDepsFeatureInterface
      // style: __css,
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  mount() {
    return __awaiter(this, void 0, void 0, function* () {
      SDepsFeature._handleDepsForElement(this.node, this.props);
    });
  }
}
SDepsFeature._cssFrontData = readCssDataFrom(document.body);
SDepsFeature.resolvedSelectors = [];
function define(props = {}, name = "s-deps") {
  SDepsFeature.define(name, SDepsFeature, Object.assign({}, props));
}
export {
  define as default
};
