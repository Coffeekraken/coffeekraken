import { Component, Input } from "@angular/core";

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

@Component({
  selector: "s-clipboard-copy-mito",
  template: `
    <div
      (click)="_copyFromTarget()"
      [class]="['s-clipboard-copy'].join(' ')"
      [status]="status"
      [step]="step"
    >
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
    </div>
  `,
})
export default class SClipboardCopyMito {
  @Input() successTimeout: Props["successTimeout"];
  @Input() errorTimeout: Props["errorTimeout"];
  @Input() from: Props["from"];

  status = "idle";
  step = "pending";
  $target = null;
  _copyFromTarget() {
    const text = this.$target.value ?? this.$target.innerHTML;
    this.copy(text);
  }
  copy(text) {
    this.step = "copy";

    __copy(text)
      .then(() => {
        this.step = "success";
        setTimeout(() => {
          this.step = "pending";
        }, this.successTimeout);
      })
      .catch((e) => {
        console.log(e);
        this.step = "error";
        setTimeout(() => {
          this.step = "pending";
        }, this.errorTimeout);
      });
  }

  ngOnInit() {
    __SClipboardCopyComponentInterface;
    const from = this.from;
    this.status = this.status;
    this.$target = document.querySelector(from);

    if (!this.$target) {
      throw new Error(
        `[SClipboardCopy] The target element "${this.from}" does not exist`
      );
    }

    this.status = "mounted";
  }
}
