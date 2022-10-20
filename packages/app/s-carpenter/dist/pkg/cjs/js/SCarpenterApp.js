"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SCarpenterAppInterface_1 = __importDefault(require("./interface/SCarpenterAppInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
class SClipboardCopyComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-specs-editor',
            interface: SCarpenterAppInterface_1.default,
        }));
        this.state = {
            state: 'pending',
        };
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCarpenterAppInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(__css)}
        `;
    }
    render() {
        return (0, lit_1.html) `
            <div
                class="${this.componentUtils.className('__root')}"
                state="${this.state.state}"
            ></div>
        `;
    }
}
exports.default = SClipboardCopyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGdHQUEwRTtBQUUxRSxzREFBZ0M7QUFtR1gsaUJBbkdkLGdCQUFRLENBbUdZO0FBM0YzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxREc7QUFFSCxNQUFxQix1QkFBd0IsU0FBUSx5QkFBZTtJQWtCaEU7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixTQUFTLEVBQUUsZ0NBQXdCO1NBQ3RDLENBQUMsQ0FDTCxDQUFDO1FBVk4sVUFBSyxHQUFHO1lBQ0osS0FBSyxFQUFFLFNBQVM7U0FDbkIsQ0FBQztJQVNGLENBQUM7SUF4QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsZ0NBQXdCLENBQzNCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBY0QsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7O3lCQUVNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzt5QkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLOztTQUVoQyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbENELDBDQWtDQyJ9