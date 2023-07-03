import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __camelCase, __parse, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import __SSpacesSelectorComponentInterface from './interface/SSpacesSelectorComponentInterface';
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
 * import { __define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';
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
        _console.log('^this', this.state.values);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUVoRyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUFJOUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBeUIsU0FBUSxlQUFlO0lBQ2pFLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsbUNBQW1DLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU87WUFDSCxNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7SUFDTixDQUFDO0lBSUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixTQUFTLEVBQUUsbUNBQW1DO1NBQ2pELENBQUMsQ0FDTCxDQUFDO1FBUk4saUJBQVksR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQVNyQyxDQUFDO0lBRUQsWUFBWTtRQUNSLE1BQU0sV0FBVyxH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