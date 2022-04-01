import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var SRangeComponent_exports = {};
__export(SRangeComponent_exports, {
  default: () => SRange,
  define: () => define
});
module.exports = __toCommonJS(SRangeComponent_exports);
var import_lit = require("lit");
var import_SRangeComponentInterface = __toESM(require("./interface/SRangeComponentInterface"));
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_s_range = __toESM(require("../../../../src/css/s-range.css"));
class SRange extends import_s_lit_component.default {
  static get properties() {
    return import_s_lit_component.default.properties({}, import_SRangeComponentInterface.default);
  }
  static get styles() {
    return import_lit.css`
            ${(0, import_lit.unsafeCSS)(`
                ${import_s_range.default}
            `)}
        `;
  }
  constructor() {
    super((0, import_deepMerge.default)({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: import_SRangeComponentInterface.default
      }
    }));
  }
  async firstUpdated() {
    this._$input = this.querySelector("input");
    this._$tooltip = this.querySelector(".s-range__tooltip");
    this._$input.addEventListener("input", (e) => {
      this._handleTooltip();
      this._handleTarget();
    });
    if (this.props.target) {
      this._$targets = Array.from(document.querySelectorAll(this.props.target));
    }
    this._handleTooltip();
    this._handleTarget();
  }
  _handleTarget() {
    if (!this._$targets)
      return;
    this._$targets.forEach(($target) => {
      $target.innerHTML = this._$input.value;
      $target.value = this._$input.value;
    });
  }
  _handleTooltip() {
    if (!this._$tooltip)
      return;
    const val = this._$input.value;
    const min = this._$input.min ? this._$input.min : 0;
    const max = this._$input.max ? this._$input.max : 100;
    const newVal = Number((val - min) * 100 / (max - min));
    this._$tooltip.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    this._$tooltip.innerHTML = val;
  }
  render() {
    return import_lit.html`
            <div
                class="${this.componentUtils.className("", "s-tooltip-container")}"
            >
                <input
                    class="${this.componentUtils.className("__input", "s-range")}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.name}"
                    value="${this.value}"
                    min="${this.min}"
                    max="${this.max}"
                    step="${this.step}"
                />
                ${this.props.tooltip ? import_lit.html`
                          <div
                              class="${this.componentUtils.className("__tooltip", "s-tooltip")}"
                          ></div>
                      ` : ""}
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-range") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, SRange);
}
