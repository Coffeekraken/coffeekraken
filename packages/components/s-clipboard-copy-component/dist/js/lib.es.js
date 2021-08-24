import {css, unsafeCSS, html, property} from "lit-element";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils, {SLitElement} from "@coffeekraken/s-component-utils";
import __copy from "clipboard-copy";
class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
  successTimeout: {
    type: "Number",
    default: 1500
  },
  errorTimeout: {
    type: "Number",
    default: 3e3
  }
};
function copy(text) {
  return __copy(text);
}
var __css = '.root {\n    display: inline-block;\n    width: 1em; height: 1em;\n    position: relative;\n    cursor: pointer;\n}\n\n    .root[state="pending"] .icon-copy {\n            opacity: 1;\n        }\n\n    .root[state="copy"] .icon-copy {\n            opacity: 1;\n        }\n\n    .root[state="success"] {\n        color: hsla(calc(var(--s-theme-color-success-h, 0) + var(--s-theme-color-success-spin ,0)),calc((var(--s-theme-color-success-s, 0) + var(--s-theme-color-success-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-success-l, 0) + var(--s-theme-color-success-lightness-offset, 0)) * 1%),var(--s-theme-color-success-a, 1));\n    }\n\n    .root[state="success"] .icon-success {\n            opacity: 1;\n        }\n\n    .root[state="error"] {\n        color: hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0) + var(--s-theme-color-error-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-error-l, 0) + var(--s-theme-color-error-lightness-offset, 0)) * 1%),var(--s-theme-color-error-a, 1));\n    }\n\n    .root[state="error"] .icon-error {\n            opacity: 1;\n        }\n\nsvg {\n    position: absolute;\n    top: 50%; left: 50%;\n    transform: translate(-50%, -50%);\n    display: block;\n    width: 1em;\n    height: 1em;\n    background-size:contain;\n    opacity: 0;\n    pointer-events: none;\n}';
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class SClipboardCopy extends SLitElement {
  constructor() {
    super();
    this._state = "pending";
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      componentUtils: {
        interface: SHighlightJsComponentInterface,
        defaultProps: {}
      }
    });
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  firstUpdated() {
  }
  copy(text) {
    this._state = "copy";
    copy(text).then(() => {
      this._state = "success";
      setTimeout(() => {
        this._state = "pending";
      }, this._component.props.successTimeout);
    }).catch((e) => {
      this._state = "error";
      setTimeout(() => {
        this._state = "pending";
      }, this._component.props.errorTimeout);
    });
  }
  render() {
    return html`
            <div class="root" ref="root" state="${this._state}">
                <svg
                    ref="svg"
                    class="icon-copy"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0)">
                        <path d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z" fill="currentColor" />
                        <path
                            d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z"
                            fill="currentColor"
                        />
                        <path d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z" fill="currentColor" />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="20" height="20" fill="currentColor" />
                        </clipPath>
                    </defs>
                </svg>
                <svg
                    class="icon-success"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <svg
                    class="icon-error"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
        `;
  }
}
__decorate([
  property()
], SClipboardCopy.prototype, "_state", void 0);
function webcomponent(props = {}, tagName = "s-clipboard-copy") {
  __SComponentUtils.setDefaultProps(tagName, props);
  customElements.define(tagName, SClipboardCopy);
}
export default SClipboardCopy;
export {webcomponent};
