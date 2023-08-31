import { B as getDefaultExportFromCjs, S as SInterface, h as SLitComponent, i as css, u as unsafeCSS, c as __deepMerge, l as html } from "./index.esm.js";
/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var clipboardCopy_1 = clipboardCopy;
function makeError() {
  return new DOMException("The request is not allowed", "NotAllowedError");
}
async function copyClipboardApi(text) {
  if (!navigator.clipboard) {
    throw makeError();
  }
  return navigator.clipboard.writeText(text);
}
async function copyExecCommand(text) {
  const span = document.createElement("span");
  span.textContent = text;
  span.style.whiteSpace = "pre";
  span.style.webkitUserSelect = "auto";
  span.style.userSelect = "all";
  document.body.appendChild(span);
  const selection = window.getSelection();
  const range = window.document.createRange();
  selection.removeAllRanges();
  range.selectNode(span);
  selection.addRange(range);
  let success = false;
  try {
    success = window.document.execCommand("copy");
  } finally {
    selection.removeAllRanges();
    window.document.body.removeChild(span);
  }
  if (!success)
    throw makeError();
}
async function clipboardCopy(text) {
  try {
    await copyClipboardApi(text);
  } catch (err) {
    try {
      await copyExecCommand(text);
    } catch (err2) {
      throw err2 || err || makeError();
    }
  }
}
const __copy = /* @__PURE__ */ getDefaultExportFromCjs(clipboardCopy_1);
function copy(text) {
  return __copy(text);
}
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
class SClipboardCopyComponentInterface extends SInterface {
  static get _definition() {
    return {
      from: {
        description: 'Specify the element you want to copy from with a simple css selector. Try to get "value" first, then "innerHTML"',
        type: "String"
      },
      successTimeout: {
        description: 'Specify the duration for displaying the "success" icon',
        type: "Number",
        default: 1500
      },
      errorTimeout: {
        description: 'Specify the duration for displaying the "error" icon',
        type: "Number",
        default: 3e3
      }
    };
  }
}
const __css = ".s-clipboard-copy {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    position: relative;\n    cursor: pointer;\n}\n\n    .s-clipboard-copy:not([mounted]) > * {\n        opacity: 0.001;\n        pointer-events: none;\n    }\n\n    .s-clipboard-copy .s-clipboard-copy_root {\n        width: 100%;\n        height: 100%;\n    }\n\n    .s-clipboard-copy .s-clipboard-copy_root[state='pending'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy .s-clipboard-copy_root[state='copy'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy .s-clipboard-copy_root[state='success'] .icon-success {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy .s-clipboard-copy_root[state='error'] .icon-error {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy svg {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        display: block;\n        width: 1em;\n        height: 1em;\n        background-size: contain;\n        opacity: 0;\n        pointer-events: none;\n    }\n";
class SClipboardCopyComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SClipboardCopyComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  static get state() {
    return {
      status: "pending"
    };
  }
  constructor() {
    super(__deepMerge({
      name: "s-clipboard-copy",
      interface: SClipboardCopyComponentInterface
    }));
  }
  _copyFromTarget() {
    var _a;
    if (!this.props.from)
      return;
    let $elm = document.querySelector(this.props.from);
    if (!$elm) {
      $elm = document.querySelector(`#${this.props.from}`);
    }
    if (!$elm) {
      throw new Error(`[SClipboardCopy] The target element "${this.props.from}" does not exist`);
    }
    const text = (_a = $elm.value) !== null && _a !== void 0 ? _a : $elm.innerHTML;
    this.copy(text);
  }
  /**
   * @name                copy
   * @type                Function
   *
   * This method allows you to copy some text through the s-clipboard-copy component that will
   * update itself to display the copy state.
   *
   * @param       {String}            text            The text you want to copy
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  copy(text) {
    this.state.status = "copy";
    setTimeout(() => {
      copy(text).then(() => {
        this.state.status = "success";
        setTimeout(() => {
          this.state.status = "pending";
        }, this.props.successTimeout);
      }).catch((e) => {
        this.state.status = "error";
        setTimeout(() => {
          this.state.status = "pending";
        }, this.props.errorTimeout);
      });
    });
  }
  render() {
    return html`
            <div
                @click=${() => {
      this._copyFromTarget();
    }}
                class="${this.utils.cls("_root")}"
                state="${this.state.status}"
            >
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
                        <path
                            d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z"
                            fill="currentColor"
                        />
                        <path
                            d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z"
                            fill="currentColor"
                        />
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
                    <polygon
                        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                    ></polygon>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-clipboard-copy", settings) {
  SClipboardCopyComponent.define(tagName, SClipboardCopyComponent, props, settings);
}
export {
  define as default
};
