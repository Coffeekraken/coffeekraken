import { html, css, unsafeCSS } from "lit";
import __SRangeComponentInterface from "./interface/SRangeComponentInterface";
import __SLitComponent from "@coffeekraken/s-lit-component";
import __css from "../css/s-range.css";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
class SRange extends __SLitComponent {
  static get properties() {
    return __SLitComponent.properties({}, __SRangeComponentInterface);
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
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: __SRangeComponentInterface
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
    return html`
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
                ${this.props.tooltip ? html`
                          <div
                              class="${this.componentUtils.className("__tooltip", "s-tooltip")}"
                          ></div>
                      ` : ""}
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-range") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SRange);
}
export {
  SRange as default,
  define
};
