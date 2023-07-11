import __SLitComponent from '@coffeekraken/s-lit-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { __camelCase, __parse, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import __SSpacesSelectorComponentInterface from './interface/SSpacesSelectorComponentInterface.js';

// @ts-ignore
import __css from '../../../../src/css/s-spaces-selector.css'; // relative to /dist/pkg/esm/js

export interface ISSpacesSelectorComponentProps {}

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
        return __SLitComponent.propertiesFromInterface(
            {},
            __SSpacesSelectorComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static get state() {
        return {
            values: {},
        };
    }

    _spacesNames = ['margin', 'padding'];

    constructor() {
        super(
            __deepMerge({
                name: 's-spaces-selector',
                interface: __SSpacesSelectorComponentInterface,
            }),
        );
    }

    firstUpdated() {
        const $marginLeft = this.querySelector('select[name="margin-left"]'),
            marginLeftBound = $marginLeft.getBoundingClientRect(),
            $marginTop = this.querySelector('select[name="margin-top"]'),
            marginTopBound = $marginTop.getBoundingClientRect();

        this.style.setProperty(
            '--s-spaces-selector-offset-y',
            `${marginTopBound.height}px`,
        );
        this.style.setProperty(
            '--s-spaces-selector-offset-x',
            `${marginLeftBound.width}px`,
        );
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
        return html`
            <div class="${this.utils.cls('_inner')}">
                ${this._spacesNames.map(
                    (spaceName) => html`
                        <div
                            class="${this.utils.cls('_space')} ${this.utils.cls(
                                `_space-${spaceName}`,
                            )}"
                        >
                            ${['top', 'right', 'bottom', 'left'].map((side) => {
                                const options =
                                        this.props.spaces[spaceName] ?? [],
                                    value =
                                        this.state.values[
                                            `${spaceName}${__upperFirst(side)}`
                                        ];

                                let selected = null;
                                options.forEach((option) => {
                                    if (
                                        value &&
                                        option[this.props.valueProp] == value
                                    ) {
                                        selected = option;
                                    }
                                });

                                return html`
                                    <select
                                        class="${this.utils.cls(
                                            '_select',
                                        )} ${this.utils.cls(
                                            `_select-${spaceName}-${side}`,
                                        )}"
                                        name="${spaceName}-${side}"
                                        @change=${(e) => {
                                            this._updateSelect(e);
                                        }}
                                    >
                                        ${options.map((option) => {
                                            return html`
                                                <option
                                                    .value=${option[
                                                        this.props.valueProp
                                                    ]}
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
                    `,
                )}

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
