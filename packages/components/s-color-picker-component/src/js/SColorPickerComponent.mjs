import "../../../../chunk-PG3ZPS4G.mjs";
import __SLitComponent from "@coffeekraken/s-lit-component";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __Pickr from "@simonwep/pickr";
import __baseCss from "@simonwep/pickr/dist/themes/nano.min.css";
import { css, html, unsafeCSS } from "lit";
import __css from "../css/s-color-picker.css";
import __SColorPickerComponentInterface from "./interface/SColorPickerComponentInterface";
import __STheme from "@coffeekraken/s-theme";
class SColorPicker extends __SLitComponent {
  constructor() {
    super(__deepMerge({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: __SColorPickerComponentInterface
      }
    }));
    this._hasInput = false;
    this._hasButton = false;
    this._$input = this.querySelector("input");
    this._hasInput = this._$input !== null;
    this._$button = this.querySelector("button");
    this._hasButton = this._$button !== null;
  }
  static get properties() {
    return __SLitComponent.properties({}, __SColorPickerComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
            `)}
        `;
  }
  async firstUpdated() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    this._$root = this.querySelector(`.${this.componentUtils.className("")}`);
    if (!this._$input) {
      this._$input = this.querySelector("input");
    } else {
      this._$root.append(this._$input);
    }
    if (!((_a = this._$input) == null ? void 0 : _a.hasAttribute("name"))) {
      (_b = this._$input) == null ? void 0 : _b.setAttribute("name", this.props.name);
    }
    if (!((_c = this._$input) == null ? void 0 : _c.hasAttribute("placeholder"))) {
      (_d = this._$input) == null ? void 0 : _d.setAttribute("placeholder", this.props.placeholder);
    }
    if (!((_e = this._$input) == null ? void 0 : _e.hasAttribute("autocomplete"))) {
      (_f = this._$input) == null ? void 0 : _f.setAttribute("autocomplete", "off");
    }
    if (!this._$button) {
      this._$button = this.querySelector("button");
    } else {
      this._$root.append(this._$button);
    }
    if (this._$button) {
      this._$button.classList.add(this.componentUtils.className("__button"));
    }
    const value = (_i = (_h = this.props.value) != null ? _h : (_g = this._$input) == null ? void 0 : _g.value) != null ? _i : "#ff0000";
    const pickr = __Pickr.create({
      el: this.querySelector(`.${this.componentUtils.className("__picker")}`),
      theme: "nano",
      container: this._$root,
      default: value,
      inline: true,
      comparison: false,
      swatches: [],
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          input: true,
          clear: true
        }
      }
    });
    const $preview = this.querySelector(".pcr-button");
    if ($preview) {
      $preview.innerHTML = `
                ${this.colorIcon ? `
                    ${this.colorIcon}
                ` : `
                    <i class="s-icon s-icon--color"></i>
                `}
            `;
    }
    function getPickrState() {
      const color = pickr.getColor();
      const hsla = color.toHSLA(), hsva = color.toHSVA(), rgba = color.toRGBA(), hex = color.toHEXA(), cmyk = color.toCMYK();
      return {
        isOpened: pickr.isOpen(),
        hsla: {
          h: hsla[0],
          s: hsla[1],
          l: hsla[2],
          a: hsla[3],
          string: `hsla(${hsla[0]},${hsla[1]},${hsla[2]},${hsla[3]})`
        },
        hsva: {
          h: hsva[0],
          s: hsva[1],
          v: hsva[2],
          a: hsva[3],
          string: `hsva(${hsva[0]},${hsva[1]},${hsva[2]},${hsva[3]})`
        },
        rgba: {
          r: rgba[0],
          g: rgba[1],
          b: rgba[2],
          a: rgba[3],
          string: `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`
        },
        hex: hex.toString(),
        cmyk: {
          c: cmyk[0],
          m: cmyk[1],
          y: cmyk[2],
          k: cmyk[3],
          string: `cmyk(${cmyk[0]},${cmyk[1]},${cmyk[2]},${cmyk[3]})`
        }
      };
    }
    __STheme.applyCurrentColor(value, this._$root);
    pickr.on("change", () => {
      pickr.applyColor();
      const detail = getPickrState();
      const change = new CustomEvent("change", {
        bubbles: true,
        detail
      });
      __STheme.applyCurrentColor(detail.hex, this._$root);
      if (this._$input) {
        this._$input.value = detail.hex;
      }
      this.dispatchEvent(change);
    });
    pickr.on("show", () => {
      const detail = getPickrState();
      const change = new CustomEvent("show", {
        detail
      });
      this.dispatchEvent(change);
    });
    pickr.on("hide", () => {
      const detail = getPickrState();
      const change = new CustomEvent("hide", {
        detail
      });
      this.dispatchEvent(change);
    });
    pickr.on("cancel", () => {
      const detail = getPickrState();
      const change = new CustomEvent("cancel", {
        detail
      });
      this.dispatchEvent(change);
    });
    if (this._$input) {
      this._$input.addEventListener("focus", () => {
        pickr.show();
      });
      this._$input.addEventListener("change", () => {
        pickr.setColor(this._$input.value);
      });
    }
    if (this._$button) {
      this._$button.addEventListener("focus", () => {
        pickr.show();
      });
    }
    const $app = this.querySelector(".pcr-app");
    $app == null ? void 0 : $app.classList.add(this.componentUtils.className("__picker"));
  }
  render() {
    return html`
            <div
                class="${this.componentUtils.className("")} ${this.componentUtils.className("")}--${this.props.position}"
            >
                ${!this._hasInput && this.props.input ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="text"
                              autocomplete="off"
                              name="${this.props.name}"
                              value="${this.props.value}"
                              placeholder="${this.props.placeholder}"
                              class="${this.componentUtils.className("__input", "s-input")}"
                          />
                      ` : !this._hasInput ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${this.props.value}"
                          />
                      ` : ``}
                ${!this._hasButton && this.props.button ? html`
                          <button
                              ?disabled=${this.props.disabled}
                              onclick="return false"
                              class="${this.componentUtils.className("__button", "s-btn")}"
                          >
                              ${this.props.colorIcon ? html` ${staticHTML(this.props.colorIcon)} ` : html`
                                        <i class="s-icon s-icon--calendar"></i>
                                    `}
                          </button>
                      ` : ""}
                <div class="${this.componentUtils.className("__picker")}"></div>
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-color-picker") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SColorPicker);
}
export {
  SColorPicker as default,
  define
};
