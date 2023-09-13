import { S as SInterface, e as SFeature, c as __deepMerge } from "./index.esm.js";
class SInlineFeatureInterface extends SInterface {
  static get _definition() {
    return {};
  }
}
const sInlineFeature = "";
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
class SInlineFeature extends SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      name: "s-inline",
      interface: SInlineFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  mount() {
    if (this.node.tagName === "IMG") {
      const src = this.node.src;
      this._inlineImg(src);
    } else {
      throw new Error(`Sorry but your s-inline marked Element cannot be inlined. At least for now...`);
    }
  }
  /**
   * Inline image like SVG
   */
  _inlineImg(src) {
    return __awaiter(this, void 0, void 0, function* () {
      const r = yield fetch(src);
      const text = yield r.text();
      const parser = new DOMParser();
      const $svg = parser.parseFromString(text, "text/html").body.firstChild;
      $svg.setAttribute("class", this.node.getAttribute("class"));
      this.node.after($svg);
      this.node.remove();
    });
  }
}
function define(props = {}, name = "s-inline") {
  SInlineFeature.define(name, SInlineFeature, props);
}
export {
  define as default
};
