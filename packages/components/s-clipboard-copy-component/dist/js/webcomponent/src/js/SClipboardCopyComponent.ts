import __SComponent from "@coffeekraken/s-component";

// src/components/MyComponent.lite.tsx

/**
 * @name                SClipboardCopyComponent
 * @as                  Clipboard copy
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SClipboardCopyComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-clipboard-copy
 * @platform            html
 * @status              beta
 *
 * This component represent a simple "copy to clipboard" component that will copy a "from" target when clicked.
 *
 * @feature           Copy to clipboard
 * @feature           Specify a "from" target to copy using a simple css selector
 * @feature           Default icons for "copy", "copied" and "error"
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-clipboard-copy-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-clipboard-copy-component';
 * define();
 *
 * @example         html        Copy from an input
 * <div class="s-flex:align-center">
 *      <input class="s-input s-width:30" type="text" value="Hello world" id="my-input" />
 *      <s-clipboard-copy class="s-mis:20" from="my-input"></s-clipboard-copy>
 * </div>
 *
 * @example         html        Using the input container addon
 * <label class="s-label">
 *      <span>Enter something and copy it!</span>
 *      <div class="s-input-container:addon s-width:40">
 *          <input class="s-input" type="text" value="Hello world" id="my-input" />
 *          <div>
 *              <s-clipboard-copy class="s-mis:20" from="my-input"></s-clipboard-copy>
 *          </div>
 *      </div>
 * </span>
 *
 * @example         html        Copy from a paragraph
 * <div class="s-flex:align-center">
 *      <p class="s-typo:p" id="my-paragraph">Hello world</p>
 *      <s-clipboard-copy class="s-mis:20" from="my-paragraph"></s-clipboard-copy>
 * </div>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
type Props = {
  from: string;
  successTimeout: number;
  errorTimeout: number;
};

import { __copy } from "@coffeekraken/sugar/clipboard";
import "../../../../../src/css/s-clipboard-copy.css";
import __SClipboardCopyComponentInterface from "../../../../../src/js/interface/SClipboardCopyComponentInterface";
const DEFAULT_PROPS = __SClipboardCopyComponentInterface.defaults();

/**
 * Usage:
 *
 *  <s-clipboard-copy></s-clipboard-copy>
 *
 */
export default class SClipboardCopy extends HTMLElement {
  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      status: "idle",
      step: "pending",
      $target: null,
      _copyFromTarget() {
        const text = self.state.$target.value ?? self.state.$target.innerHTML;
        self.state.copy(text);
      },
      copy(text) {
        self.state.step = "copy";
        self.update();

        __copy(text)
          .then(() => {
            self.state.step = "success";
            self.update();
            setTimeout(() => {
              self.state.step = "pending";
              self.update();
            }, self.props.successTimeout);
          })
          .catch((e) => {
            console.log(e);
            self.state.step = "error";
            self.update();
            setTimeout(() => {
              self.state.step = "pending";
              self.update();
            }, self.props.errorTimeout);
          });
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = ["successTimeout", "errorTimeout", "from"];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'click' event on div-s-clipboard-copy-1
    this.onDivSClipboardCopy1Click = (event) => {
      this.state._copyFromTarget();
    };

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  destroyAnyNodes() {
    // destroy current view template refs before rendering again
    this.nodesToDestroy.forEach((el) => el.remove());
    this.nodesToDestroy = [];
  }

  connectedCallback() {
    this.getAttributeNames().forEach((attr) => {
      const jsVar = attr.replace(/-/g, "");
      const regexp = new RegExp(jsVar, "i");
      this.componentProps.forEach((prop) => {
        if (regexp.test(prop)) {
          const attrValue = this.getAttribute(attr);
          if (this.props[prop] !== attrValue) {
            this.props[prop] = attrValue;
          }
        }
      });
    });

    // default props
    const defaultProps = __SComponent.getDefaultProps(
      this.tagName.toLowerCase()
    );
    this.props.from =
      this.props.from ?? defaultProps.from ?? DEFAULT_PROPS.from;
    this.props.successTimeout =
      this.props.successTimeout ??
      defaultProps.successTimeout ??
      DEFAULT_PROPS.successTimeout;
    this.props.errorTimeout =
      this.props.errorTimeout ??
      defaultProps.errorTimeout ??
      DEFAULT_PROPS.errorTimeout;

    this._root.innerHTML = `
                        
      <div data-el="div-s-clipboard-copy-1">
        <svg
          class="icon-copy"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z"
              fill="currentColor"
            ></path>
      
            <path
              d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z"
              fill="currentColor"
            ></path>
      
            <path
              d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z"
              fill="currentColor"
            ></path>
          </g>
      
          <defs>
            <clipPath id="clip0">
              <rect width="20" height="20" fill="currentColor"></rect>
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
      </div>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  onMount() {
    // onMount
    __SClipboardCopyComponentInterface;
    const from = this.props.from,
      status = this.state.status;
    this.state.$target = document.querySelector(from);
    this.update();

    if (!this.state.$target) {
      throw new Error(
        `[SClipboardCopy] The target element "${this.props.from}" does not exist`
      );
    }

    this.state.status = "mounted";
    this.update();
  }

  onUpdate() {}

  update() {
    if (this.pendingUpdate === true) {
      return;
    }
    this.pendingUpdate = true;
    this.render();
    this.onUpdate();
    this.pendingUpdate = false;
  }

  render() {
    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();
  }

  updateBindings() {
    this._root
      .querySelectorAll("[data-el='div-s-clipboard-copy-1']")
      .forEach((el) => {
        el.removeEventListener("click", this.onDivSClipboardCopy1Click);
        el.addEventListener("click", this.onDivSClipboardCopy1Click);

        el.className = ["s-clipboard-copy"].join(" ");

        el.setAttribute("status", this.state.status);

        el.setAttribute("step", this.state.step);
      });
  }

  // Helper to render content
  renderTextNode(el, text) {
    const textNode = document.createTextNode(text);
    if (el?.scope) {
      textNode.scope = el.scope;
    }
    if (el?.context) {
      textNode.context = el.context;
    }
    el.after(textNode);
    this.nodesToDestroy.push(el.nextSibling);
  }
}


                            export function define(
                                props = {},
                                tagName = 's-clipboard-copy'
                            ) {
                                __SComponent.setDefaultProps(tagName, props);
                                customElements.define(tagName, class SClipboardCopyComponent extends SClipboardCopy {});
                            }
                            
