import {css, unsafeCSS, html} from "lit";
import __SInterface from "@coffeekraken/s-interface";
import __SLitComponent from "@coffeekraken/s-lit-component";
class SRangeComponentInterface extends __SInterface {
}
SRangeComponentInterface.definition = {
  name: {
    type: "String",
    description: 'Specify the name to assign to the internal input[type="range"]'
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
var __css = "s-range {\n    display: block;\n    width: 100%;\n}\n\n    s-range:not([mounted]) > * {\n        display: none;\n    }\n.s-range {\n    display: flex;\n    width: 100%;\n}\n\n.s-range__input {\n    flex-grow: 1;\n}\n\n.s-range__tooltip {\n    transition: none;\n}\n\ns-range[default-style] {\n}\n";
function plainObject(object) {
  if (!object)
    return false;
  if (typeof object !== "object")
    return false;
  if (object.constructor && object.constructor.name !== "Object")
    return false;
  if (Object.prototype.toString.call(object) !== "[object Object]")
    return false;
  if (object !== Object(object))
    return false;
  return true;
}
function __deepMerge(...args) {
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
      return secondObj;
    if (!secondObj && firstObj)
      return firstObj;
    if (!firstObj && !secondObj)
      return {};
    const firstProps = Object.getOwnPropertyNames(firstObj);
    firstProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(firstObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = firstObj[key];
      }
    });
    const secondProps = Object.getOwnPropertyNames(secondObj);
    secondProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else if (plainObject(newObj[key]) && plainObject(secondObj[key])) {
        newObj[key] = merge(newObj[key], secondObj[key]);
      } else {
        newObj[key] = secondObj[key];
      }
    });
    return newObj;
  }
  let currentObj = {};
  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i];
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
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
class SRange extends __SLitComponent {
  static get properties() {
    return __SLitComponent.properties({}, SRangeComponentInterface);
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
        interface: SRangeComponentInterface
      }
    }));
  }
  firstUpdated() {
    return __awaiter(this, void 0, void 0, function* () {
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
  render() {
    return html`
            <div class="${this.componentUtils.className("", "s-tooltip-container")}">
                <input
                    class="${this.componentUtils.className("__input", "s-range")}"
                    type="range"
                    name="${this.name}"
                    value="${this.value}"
                    min="${this.min}"
                    max="${this.max}"
                    step="${this.step}"
                />
                ${this.props.tooltip ? html` <div class="${this.componentUtils.className("__tooltip", "s-tooltip")}"></div> ` : ""}
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-range") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SRange);
}
export default SRange;
export {define};
