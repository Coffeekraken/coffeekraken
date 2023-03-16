"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const lit_1 = require("lit");
const SSpacesSelectorComponentInterface_1 = __importDefault(require("./interface/SSpacesSelectorComponentInterface"));
// @ts-ignore
const s_spaces_selector_css_1 = __importDefault(require("../../../../src/css/s-spaces-selector.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
/**
 * @name                SSpacesSelectorComponent
 * @as                  Spaces selector
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSpacesSelectorComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-spaces-selector
 * @platform            html
 * @status              beta
 *
 * This component represent a simple "spaces selector" component (margins, paddings).
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           s-spaces-selector.change                Dispatched when a value has been updated with the new values in the `detail`
 *
 * @import          import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';
 *
 * @snippet         __SSpacesSelectorComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-spaces-selector-component
 *
 * @install           js
 * import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';
 * __SSpacesSelectorComponentDefine();
 *
 * @example         html        Simple selector
 * <s-spaces-selector></s-spaces-selector>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSpacesSelectorComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SSpacesSelectorComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_spaces_selector_css_1.default)}
        `;
    }
    static get state() {
        return {};
    }
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-spaces-selector',
            interface: SSpacesSelectorComponentInterface_1.default,
        }));
        this._spacesNames = ['margin', 'padding'];
    }
    firstUpdated() {
        const $marginLeft = this.querySelector('select[name="margin-left"]'), marginLeftBound = $marginLeft.getBoundingClientRect(), $marginTop = this.querySelector('select[name="margin-top"]'), marginTopBound = $marginTop.getBoundingClientRect();
        this.style.setProperty('--s-spaces-selector-offset-y', `${marginTopBound.height}px`);
        this.style.setProperty('--s-spaces-selector-offset-x', `${marginLeftBound.width}px`);
    }
    clear() {
        // reset the values
        this.props.values = {};
        // dispatch a new update event
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: Object.assign({}, this.props.values),
        });
    }
    _updateSelect(e) {
        const propertyName = (0, string_1.__camelCase)(e.target.name);
        // set the new value
        this.props.values[propertyName] = (0, string_1.__parse)(e.target.value);
        // dispatch a new update event
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: Object.assign({}, this.props.values),
        });
    }
    render() {
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_inner')}">
                ${this._spacesNames.map((spaceName) => (0, lit_1.html) `
                        <div
                            class="${this.utils.cls('_space')} ${this.utils.cls(`_space-${spaceName}`)}"
                        >
                            ${['top', 'right', 'bottom', 'left'].map((side) => {
            var _a;
            const options = (_a = this.props.spaces[spaceName]) !== null && _a !== void 0 ? _a : [], value = this.props.values[`${spaceName}${(0, string_1.__upperFirst)(side)}`];
            let selected = null;
            options.forEach((option) => {
                if (value &&
                    option[this.props.valueProp] == value) {
                    selected = option;
                }
            });
            return (0, lit_1.html) `
                                    <select
                                        class="${this.utils.cls('_select')} ${this.utils.cls(`_select-${spaceName}-${side}`)}"
                                        name="${spaceName}-${side}"
                                        .value=${value}
                                        @change=${(e) => {
                this._updateSelect(e);
            }}
                                    >
                                        ${options.map((option) => {
                return (0, lit_1.html) `
                                                <option
                                                    value="${option[this.props.valueProp]}"
                                                    ?selected=${selected ===
                    option ||
                    (selected === null &&
                        option.default)}
                                                >
                                                    ${option.name}
                                                </option>
                                            `;
            })}
                                    </select>
                                `;
        })}
                        </div>
                    `)}

                <button
                    class="${this.utils.cls('_clear')}"
                    @pointerup=${() => {
            this.clear();
        }}
                >
                    Clear
                </button>
            </div>
        `;
    }
}
exports.default = SSpacesSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsdURBQWdGO0FBQ2hGLDZCQUEyQztBQUMzQyxzSEFBZ0c7QUFFaEcsYUFBYTtBQUNiLHNHQUE4RCxDQUFDLCtCQUErQjtBQUU5RixzREFBZ0M7QUEwTFgsaUJBMUxkLGdCQUFRLENBMExZO0FBdEwzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFFSCxNQUFxQix3QkFBeUIsU0FBUSx5QkFBZTtJQUNqRSxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRiwyQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQywrQkFBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFJRDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLFNBQVMsRUFBRSwyQ0FBbUM7U0FDakQsQ0FBQyxDQUNMLENBQUM7UUFSTixpQkFBWSxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBU3JDLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxFQUNoRSxlQUFlLEdBQUcsV0FBVyxDQUFDLHFCQUFxQixFQUFFLEVBQ3JELFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLEVBQzVELGNBQWMsR0FBRyxVQUFVLENBQUMscUJBQXFCLEVBQUUs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