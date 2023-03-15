import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __camelCase, __parse, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import __SSpacesSelectorComponentInterface from './interface/SSpacesSelectorComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-spaces-selector.css'; // relative to /dist/pkg/esm/js
import __define from './define';
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
 * @event           s-spaces-selector.update                Dispatched when a value has been updated with the new values in the `detail`
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
        return {};
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
    _updateSelect(e) {
        const propertyName = __camelCase(e.target.name);
        // set the new value
        this.props.values[propertyName] = __parse(e.target.value);
        // dispatch a new update event
        this.utils.dispatchEvent('change', {
            bubbles: true,
            detail: this.props.values,
        });
    }
    render() {
        console.log('render', this.props.spaces, this.props.values);
        return html `
            <div class="${this.utils.cls('_inner')}">
                ${this._spacesNames.map((spaceName) => html `
                        <div
                            class="${this.utils.cls('_space')} ${this.utils.cls(`_space-${spaceName}`)}"
                        >
                            ${['top', 'right', 'bottom', 'left'].map((side) => {
            var _a;
            const options = (_a = this.props.spaces[spaceName]) !== null && _a !== void 0 ? _a : [], value = this.props.values[`${spaceName}${__upperFirst(side)}`];
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
                                        value="${value}"
                                        @change=${(e) => {
                this._updateSelect(e);
            }}
                                    >
                                        ${options.map((option) => {
                return html `
                                                <option
                                                    value="${option[this.props.valueProp]}"
                                                    ?selected=${selected !==
                    null ||
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
            </div>
        `;
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUVoRyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUFFOUYsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBSWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsZUFBZTtJQUNqRSxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLG1DQUFtQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFJRDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLFNBQVMsRUFBRSxtQ0FBbUM7U0FDakQsQ0FBQyxDQUNMLENBQUM7UUFSTixpQkFBWSxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBU3JDLENBQUM7SUFFRCxZQUFZO1FBQ1Is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