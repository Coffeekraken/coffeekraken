import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __camelCase, __parse, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import __SSpacesSelectorComponentInterface from './interface/SSpacesSelectorComponentInterface.js';
// @ts-ignore
import __css from '../../../../src/css/s-spaces-selector.css'; // relative to /dist/pkg/esm/js
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
export default class SSpacesSelectorComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SSpacesSelectorComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static get state() {
        return {
            values: {},
        };
    }
    constructor() {
        super(__deepMerge({
            name: 's-spaces-selector',
            interface: __SSpacesSelectorComponentInterface,
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
        const propertyName = __camelCase(e.target.name);
        // set the new value
        this.state.values[propertyName] = __parse(e.target.value);
        // dispatch a new update event
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: Object.assign({}, this.state.values),
        });
    }
    render() {
        return html `
            <div class="${this.utils.cls('_inner')}">
                ${this._spacesNames.map((spaceName) => html `
                        <div
                            class="${this.utils.cls('_space')} ${this.utils.cls(`_space-${spaceName}`)}"
                        >
                            ${['top', 'right', 'bottom', 'left'].map((side) => {
            var _a;
            const options = (_a = this.props.spaces[spaceName]) !== null && _a !== void 0 ? _a : [], value = this.state.values[`${spaceName}${__upperFirst(side)}`];
            let selected = null;
            options.forEach((option) => {
                if (value &&
                    option[this.props.valueProp] == value) {
                    selected = option;
                }
            });
            return html `
                                    <select
                                        class="${this.utils.cls('_select')} ${this.utils.cls(`_select-${spaceName}-${side}`)}"
                                        name="${spaceName}-${side}"
                                        @change=${(e) => {
                this._updateSelect(e);
            }}
                                    >
                                        ${options.map((option) => {
                return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxtQ0FBbUMsTUFBTSxrREFBa0QsQ0FBQztBQUVuRyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUFJOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBQ2pFLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsbUNBQW1DLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU87WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7SUFDTixDQUFDO0lBSUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixTQUFTLEVBQUUsbUNBQW1DO1NBQ2pELENBQUMsQ0FDTCxDQUFDO1FBUk4saUJBQVksR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQVNyQyxDQUFDO0lBRUQsWUFBWTtRQUNSLE1BQU0sV0FBVyxH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