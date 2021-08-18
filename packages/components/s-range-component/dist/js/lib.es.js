import {css, unsafeCSS, html} from "lit-element";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils, {SLitElement} from "@coffeekraken/s-component-utils";
class SRangeComponentInterface extends __SInterface {
}
SRangeComponentInterface.definition = {
  name: {
    type: "String",
    description: 'Specify the name to assign to the internal input[type="range"]',
    required: true
  },
  value: {
    type: "String",
    description: "Specify the initial range value"
  },
  min: {
    type: "Number",
    description: "Specify the minimal value or the range",
    default: 0
  },
  max: {
    type: "Number",
    description: "Specify the maximal value of the range",
    default: 100
  },
  step: {
    type: "Number",
    description: "Specify the steps between each values"
  },
  target: {
    type: "String",
    description: "Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"
  },
  tooltip: {
    type: "Boolean",
    description: "Specify if you want to display the value inside a tooltip on top of the thumb",
    default: false
  }
};
var __css = "s-range {\n    display: block;\n    width: 100%;\n}\n.s-range {\n    display: flex;\n    width: 100%;\n}\n\n.s-range__input {\n    flex-grow: 1;\n}\n\n.s-range__tooltip {\n    transition: none;\n}\n\ns-range[default-style] {\n}\n";
var __awaiter = function(thisArg, _arguments, P, generator) {
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
class SRange extends SLitElement {
  constructor() {
    super();
    this._component = void 0;
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      interface: SRangeComponentInterface,
      defaultProps: {}
    });
  }
  static get properties() {
    return __SComponentUtils.properties({}, SRangeComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
  }
  firstUpdated() {
    return __awaiter(this, void 0, void 0, function* () {
      this._$input = this.querySelector("input");
      this._$tooltip = this.querySelector(".s-range__tooltip");
      this._$input.addEventListener("input", (e) => {
        this._handleTooltip();
        this._handleTarget();
      });
      if (this._component.props.target) {
        this._$targets = Array.from(document.querySelectorAll(this._component.props.target));
      }
      this._handleTooltip();
      this._handleTarget();
    });
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
  _dispatchEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: {
        dateStr: this._picker.toString(),
        date: this._picker.getDate()
      }
    });
    this.dispatchEvent(event);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
            <div class="${this._component.className("", "s-tooltip-container")}">
                <input
                    class="${this._component.className("__input", "s-range")}"
                    type="range"
                    name="${this._component.props.name}"
                    value="${this._component.props.value}"
                    min="${this._component.props.min}"
                    max="${this._component.props.max}"
                    step="${this._component.props.step}"
                />
                ${this._component.props.tooltip ? html` <div class="${this._component.className("__tooltip", "s-tooltip")}">Hello</div> ` : ""}
            </div>
        `;
  }
}
function webcomponent(props = {}, tagName = "s-range") {
  __SComponentUtils.setDefaultProps(tagName, props);
  customElements.define(tagName, SRange);
}
export default SRange;
export {webcomponent};
