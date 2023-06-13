import { S as SInterface, j as SLitComponent, k as css, u as unsafeCSS, _ as __deepMerge, l as html } from "./index-1ed0cb73.js";
class SRangeComponentInterface extends SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        description: 'Specify the name to assign to the internal input[type="range"]'
      },
      value: {
        type: "Number",
        description: "Specify the initial range value"
      },
      values: {
        type: "Object",
        description: 'Specify some values in array like ["hello","world"] that will be used for tooltip. Your range steps MUST be integers for this to work properly'
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
      },
      disabled: {
        type: "Boolean",
        description: "Specify if this range is disabled",
        default: false
      }
    };
  }
}
const __css = `.sp5 {
    display: block;
    width: 100%;
}

    .sp5:not([mounted]) > * {
        display: none;
    }

    .sp5[disabled] {
        pointer-events: none;
    }
.sbmL {
    display: flex;
    width: 100%;
}
.sbmM {
    flex-grow: 1;
    opacity: 1 !important;
}
.sbmM:hover + .sbmN,
.sbmM:focus + .sbmN {
    opacity: 1 !important;
}
.sbmN {
    transition: none;
}body:after {
                    display: none;;
                    content: '{"lod":{"enabled":false,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">=","cssProperties":{"animation":2,"animation-delay":2,"animation-direction":2,"animation-duration":2,"animation-fill-mode":2,"animation-iteration-count":2,"animation-name":2,"animation-play-state":2,"animation-timing-function":2,"backdrop-filter":3,"background":1,"background-attachment":1,"background-blend-mode":3,"background-clip":1,"background-color":1,"background-image":1,"background-origin":1,"background-position":1,"background-repeat":1,"background-size":1,"border":1,"border-bottom":1,"border-bottom-color":1,"border-bottom-left-radius":1,"border-bottom-right-radius":1,"border-bottom-style":1,"border-bottom-width":1,"border-collapse":1,"border-color":1,"border-image":1,"border-image-outset":1,"border-image-repeat":1,"border-image-slice":1,"border-image-source":1,"border-image-width":1,"border-left":1,"border-left-color":1,"border-left-style":1,"border-left-width":1,"border-radius":1,"border-right":1,"border-right-color":1,"border-right-style":1,"border-right-width":1,"border-spacing":1,"border-style":1,"border-top":1,"border-top-color":1,"border-top-left-radius":1,"border-top-right-radius":1,"border-top-style":1,"border-top-width":1,"border-width":1,"box-shadow":1,"caret-color":1,"color":1,"column-count":1,"column-fill":1,"column-rule":1,"column-rule-color":1,"column-rule-style":1,"column-rule-width":1,"counter-increment":1,"counter-reset":1,"filter":1,"list-style-image":1,"outline":1,"outline-color":1,"outline-offset":1,"outline-style":1,"outline-width":1,"text-decoration":1,"text-decoration-color":1,"text-decoration-line":1,"text-indent":1,"text-justify":1,"text-overflow":1,"text-shadow":2,"text-transform":1,"transition":1,"transition-delay":1,"transition-duration":1,"transition-property":1,"transition-timing-function":1,"word-break":1,"word-spacing":1,"word-wrap":1}},"clean":{"variables":false},"compress":{"variables":false}}';
}
`;
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
class SRangeComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SRangeComponentInterface);
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
      name: "s-range",
      interface: SRangeComponentInterface
    }));
  }
  firstUpdated() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      this._$input = this.querySelector("input");
      this._$tooltip = this.querySelector(".s-range_tooltip");
      this._$input.addEventListener("input", (e) => {
        this._handleTooltip();
        this._handleTarget();
      });
      if (this.props.target) {
        this._$targets = Array.from(document.querySelectorAll(this.props.target));
      }
      this._$input.value = this.props.value;
      if ((_a = this._$input) === null || _a === void 0 ? void 0 : _a.form) {
        this._$input.form.addEventListener("reset", () => {
          setTimeout(() => {
            this._handleTooltip();
            this._handleTarget();
          });
        });
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
    let tooltipValue = val;
    if (this.props.values && this.props.values[val]) {
      tooltipValue = this.props.values[val];
    }
    this._$tooltip.innerHTML = tooltipValue;
  }
  render() {
    return html`
            <div class="${this.utils.cls("_root", "s-tooltip-container")}">
                <input
                    class="${this.utils.cls("_input", "s-range")}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.props.name}"
                    value="${this.props.value}"
                    min="${this.props.min}"
                    max="${this.props.max}"
                    step="${this.props.step}"
                />
                ${this.props.tooltip ? html`
                          <div
                              class="${this.utils.cls("_tooltip", "s-tooltip")}"
                          ></div>
                      ` : ""}
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-range", settings) {
  SRangeComponent.define(tagName, SRangeComponent, props, settings);
}
export {
  define as default
};
