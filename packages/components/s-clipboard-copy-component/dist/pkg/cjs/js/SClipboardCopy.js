"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const lit_1 = require("lit");
const SClipboardCopyComponentInterface_1 = __importDefault(require("./interface/SClipboardCopyComponentInterface"));
// @ts-ignore
const s_clipboard_copy_css_1 = __importDefault(require("../../../../src/css/s-clipboard-copy.css")); // relative to /dist/pkg/esm/js
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
class SClipboardCopy extends s_lit_component_1.default {
    constructor() {
        super((0, deepMerge_1.default)({
            name: 's-clipboard-copy',
            interface: SClipboardCopyComponentInterface_1.default,
        }));
        this.state = {
            state: 'pending',
        };
    }
    static get properties() {
        return s_lit_component_1.default.createProperties({}, SClipboardCopyComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_clipboard_copy_css_1.default)}
        `;
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
        this.state.state = 'copy';
        (0, clipboard_1.__copy)(text)
            .then(() => {
            this.state.state = 'success';
            setTimeout(() => {
                this.state.state = 'pending';
            }, this.props.successTimeout);
        })
            .catch((e) => {
            this.state.state = 'error';
            setTimeout(() => {
                this.state.state = 'pending';
            }, this.props.errorTimeout);
        });
    }
    render() {
        return (0, lit_1.html) `
            <div
                @click=${() => this._copyFromTarget()}
                class="${this.componentUtils.className('__root')}"
                state="${this.state.state}"
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
exports.default = SClipboardCopy;
function define(props = {}, tagName = 's-clipboard-copy') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SClipboardCopy);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCw2REFBdUQ7QUFDdkQsNEZBQXNFO0FBQ3RFLDZCQUEyQztBQUMzQyxvSEFBOEY7QUFFOUYsYUFBYTtBQUNiLG9HQUE2RCxDQUFDLCtCQUErQjtBQVE3Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFFSCxNQUFxQixjQUFlLFNBQVEseUJBQWU7SUFrQnZEO1FBQ0ksS0FBSyxDQUNELElBQUEsbUJBQVcsRUFBQztZQUNSLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsU0FBUyxFQUFFLDBDQUFrQztTQUNoRCxDQUFDLENBQ0wsQ0FBQztRQVZOLFVBQUssR0FBRztZQUNKLEtBQUssRUFBRSxTQUFTO1NBQ25CLENBQUM7SUFTRixDQUFDO0lBeEJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyxnQkFBZ0IsQ0FDbkMsRUFBRSxFQUNGLDBDQUFrQyxDQUNyQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLDhCQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFlRCxlQUFlOztRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFBRSxPQUFPO1FBRTdCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FDWCx3Q0FBd0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLGtCQUFrQixDQUM1RSxDQUFDO1NBQ0w7UUFDRCxNQUFNLElBQUksR0FBRyxNQUFBLElBQUksQ0FBQyxLQUFLLG1DQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUMsSUFBSTtRQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUMxQixJQUFBLGtCQUFNLEVBQUMsSUFBSSxDQUFDO2FBQ1AsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUM3QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztZQUMzQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxNQUFNO1FBQ0YsT0FBTyxJQUFBLFVBQUksRUFBQTs7eUJBRU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTt5QkFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO3lCQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBaUVoQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBaEpELGlDQWdKQztBQUVELFNBQWdCLE1BQU0sQ0FDbEIsUUFBZ0QsRUFBRSxFQUNsRCxPQUFPLEdBQUcsa0JBQWtCO0lBRTVCLHlCQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxhQUFhO0lBQ2IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQVBELHdCQU9DIn0=