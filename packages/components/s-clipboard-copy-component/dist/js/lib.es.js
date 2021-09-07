import {css, unsafeCSS, html} from "lit";
import __SInterface from "@coffeekraken/s-interface";
import __SLitComponent from "@coffeekraken/s-lit-component";
import __copy from "clipboard-copy";
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const standardProperty = (options, element) => {
  if (element.kind === "method" && element.descriptor && !("value" in element.descriptor)) {
    return {
      ...element,
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  } else {
    return {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      originalKey: element.key,
      initializer() {
        if (typeof element.initializer === "function") {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
function property(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
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
var __css = ".s-clipboard-copy {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    position: relative;\n    cursor: pointer;\n}\n\n    .s-clipboard-copy:not([mounted]) > * {\n        opacity: 0.001;\n        pointer-events: none;\n    }\n\n    .s-clipboard-copy[state='pending'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy[state='copy'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy[state='success'] {\n        color: hsla(calc(var(--s-theme-color-success-h, 0) + var(--s-theme-color-success-spin ,0)),calc((var(--s-theme-color-success-s, 0) + var(--s-theme-color-success-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-success-l, 0) + var(--s-theme-color-success-lightness-offset, 0)) * 1%),var(--s-theme-color-success-a, 1));\n    }\n\n    .s-clipboard-copy[state='success'] .icon-success {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy[state='error'] {\n        color: hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0) + var(--s-theme-color-error-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-error-l, 0) + var(--s-theme-color-error-lightness-offset, 0)) * 1%),var(--s-theme-color-error-a, 1));\n    }\n\n    .s-clipboard-copy[state='error'] .icon-error {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy svg {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        display: block;\n        width: 1em;\n        height: 1em;\n        background-size: contain;\n        opacity: 0;\n        pointer-events: none;\n    }\n";
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
class SClipboardCopy extends __SLitComponent {
  constructor() {
    super(__deepMerge({
      sLitComponent: {
        interface: SHighlightJsComponentInterface
      }
    }));
    this._state = "pending";
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  copy(text) {
    this._state = "copy";
    copy(text).then(() => {
      this._state = "success";
      setTimeout(() => {
        this._state = "pending";
      }, this.props.successTimeout);
    }).catch((e) => {
      this._state = "error";
      setTimeout(() => {
        this._state = "pending";
      }, this.props.errorTimeout);
    });
  }
  render() {
    return html`
            <div class="${this.componentUtils.className("")}" state="${this._state}">
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
function define(props = {}, tagName = "s-clipboard-copy") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SClipboardCopy);
}
export default SClipboardCopy;
export {define};
