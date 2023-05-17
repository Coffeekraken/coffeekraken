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
        return {
            values: {},
        };
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
        this.state.values = {};
        // dispatch a new update event
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: Object.assign({}, this.props.values),
        });
        // reset all select
        Array.from(this.querySelectorAll('select')).forEach(($select) => {
            $select.selectedIndex = 0;
        });
        this.requestUpdate();
    }
    _updateSelect(e) {
        const propertyName = (0, string_1.__camelCase)(e.target.name);
        // set the new value
        this.state.values[propertyName] = (0, string_1.__parse)(e.target.value);
        _console.log('^this', this.state.values);
        // dispatch a new update event
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: Object.assign({}, this.state.values),
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
            const options = (_a = this.props.spaces[spaceName]) !== null && _a !== void 0 ? _a : [], value = this.state.values[`${spaceName}${(0, string_1.__upperFirst)(side)}`];
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
                                        @change=${(e) => {
                this._updateSelect(e);
            }}
                                    >
                                        ${options.map((option) => {
                return (0, lit_1.html) `
                                                <option
                                                    .value=${option[this.props.valueProp]}
                                                    ?selected=${selected ===
                    option ||
                    (selected === null &&
                        !option.value)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsdURBQWdGO0FBQ2hGLDZCQUEyQztBQUMzQyxzSEFBZ0c7QUFFaEcsYUFBYTtBQUNiLHNHQUE4RCxDQUFDLCtCQUErQjtBQUU5RixzREFBZ0M7QUFvTVgsaUJBcE1kLGdCQUFRLENBb01ZO0FBaE0zQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFFSCxNQUFxQix3QkFBeUIsU0FBUSx5QkFBZTtJQUNqRSxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRiwyQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQywrQkFBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO0lBQ04sQ0FBQztJQUlEO1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxtQkFBbUI7WUFDekIsU0FBUyxFQUFFLDJDQUFtQztTQUNqRCxDQUFDLENBQ0wsQ0FBQztRQVJOLGlCQUFZLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFTckMsQ0FBQztJQUVELFlBQVk7UUFDUixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLEVBQ2hFLGVBQWUsR0FBRyxXQUFXLENBQUMscUJBQXFCLEVBQUUsRUFDckQsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsRUFDNUQsY0FBYyxHQUFHLFVB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