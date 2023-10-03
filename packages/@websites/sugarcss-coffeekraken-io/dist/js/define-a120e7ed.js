import { a as SInterface, l as STheme, D as SLitComponent, E as css, F as unsafeCSS, c as __deepMerge, C as __scrollTo, G as html } from "./index.esm.js";
class SScrollComponentInterface extends SInterface {
  static get _definition() {
    return {
      to: {
        description: "The target when to scroll. Must be a valid css selector",
        type: "String",
        required: true
      },
      duration: {
        description: "Specify the duration of the scroll in ms",
        type: "number",
        default: STheme.get("scroll.duration")
      },
      offset: {
        description: "Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...",
        type: "number",
        default: STheme.get("scroll.offset")
      },
      offsetX: {
        description: "Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...",
        type: "number",
        default: STheme.get("scroll.offsetX")
      },
      offsetY: {
        description: "Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...",
        type: "number",
        default: STheme.get("scroll.offsetY")
      }
    };
  }
}
const __css = "s-scroll {\n    display: inline-block;\n    cursor: pointer;\n}\n";
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
class SScrollComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SScrollComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
  }
  constructor() {
    super(__deepMerge({
      name: "s-scroll",
      interface: SScrollComponentInterface
    }));
  }
  firstUpdated() {
    return __awaiter(this, void 0, void 0, function* () {
      this.addEventListener("click", (e) => {
        e.preventDefault();
        this._scrollTo(this.props.to);
      });
    });
  }
  _scrollTo(target) {
    const scrollConfig = STheme.get("scroll");
    const duration = this.props.duration || (scrollConfig === null || scrollConfig === void 0 ? void 0 : scrollConfig.duration) || 300;
    const offset = this.props.offset || scrollConfig.offset || 0;
    const offsetX = this.props.offsetX || scrollConfig.offsetX || offset;
    const offsetY = this.props.offsetY || scrollConfig.offsetY || offset;
    switch (target) {
      case "top":
        __scrollTo("top", {
          duration,
          offset,
          offsetX,
          offsetY
        });
        break;
      case "bottom":
        __scrollTo("bottom", {
          duration,
          offset,
          offsetX,
          offsetY
        });
        break;
      default:
        const $target = document.querySelector(target);
        if (!$target)
          return;
        __scrollTo($target, {
          duration,
          offset,
          offsetX,
          offsetY
        });
        break;
    }
  }
  render() {
    return html``;
  }
}
function define(props = {}, tagName = "s-scroll", settings) {
  SScrollComponent.define(tagName, SScrollComponent, props, settings);
}
export {
  define as default
};
