// @ts-nocheck

import __SLitComponent, {
    ISLitComponentDefaultProps
} from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SRangeComponentInterface from './interface/SRangeComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-range.css'; // relative to /dist/pkg/esm/js

/**
 * @name                SRangeComponent
 * @as                  Range (component)
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SRangeComponentInterface.ts
 * @menu                Styleguide / Forms              /styleguide/form/s-range
 * @platform            html
 * @status              beta
 *
 * This component specify a range with some additional features than the native one like
 * displaying the value automatically in tooltip or inline.
 *
 * @feature         All the built-in input type range features are supported
 * @feature         Can **display a tooltip** on top of the thumb to help user know what's the current value
 * @feature         Can have target(s) that will be **automatically filled with the current value**
 * @feature         Support for sugar theming system when activate default style
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install          bash
 * npm i @coffeekraken/s-range-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-range-component';
 * define();
 *
 * @example         html        Simple range
 * <s-range name="myCoolRange" value="90" class="s-color:accent s-mbe:30"></s-range>
 *
 * @example         html        With tooltip
 * <s-range name="myOtherRanfe" class="s-mbe:30" tooltip></s-range>
 *
 * @example         html        With tooltip and colored
 * <s-range name="myOtherRanfe" class="s-mbe:30 s-color:accent" tooltip></s-range>
 *
 * @example         html        With steps
 * <s-range name="myRangeWithSteps" value="70" class="s-color:complementary s-mbe:30" step="5"></s-range>
 *
 * @example         html        Disabled
 * <s-range name="myRangeWithSteps" disabled value="70" class="s-color:complementary s-mbe:30" step="5"></s-range>
 *
 * @example         html        External target input
 * <div class="s-flex:align-center s-mbe:30">
 *  <s-range name="myRangeWithTarget" value="30" target="#my-range-with-target-target"></s-range>
 *  <span class="s-pis:20" id="my-range-with-target-target"></span>
 * </div>
 *
 * @example         html        Some colors
 * <s-range name="myRangeColoredSuccess" value="30" class="s-color:success s-mbe:30"></s-range>
 * <s-range name="myRangeColoredWarning" value="0" class="s-color:warning s-mbe:30"></s-range>
 * <s-range name="myRangeColoredError" value="1" min="0" max="10" class="s-color:error s-mbe:30"></s-range>
 *
 * @see             https://github.com/darlanrod/input-range-scss
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISRangeComponentValuesProp {
    name: string;
    value: any;
}

export interface ISRangeComponentProps extends ISLitComponentDefaultProps {
    name: string;
    value: string;
    values: ISRangeComponentValuesProp[];
    min: number;
    max: number;
    step: number;
    target: string;
    tooltip: boolean;
    disabled: boolean;
}

export default class SRangeComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SRangeComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    constructor() {
        super(
            __deepMerge({
                name: 's-range',
                interface: __SRangeComponentInterface,
            }),
        );
    }
    async firstUpdated() {
        this._$input = this.querySelector('input');
        this._$tooltip = this.querySelector('.s-range_tooltip');

        this._$input.addEventListener('input', (e) => {
            this._handleTooltip();
            this._handleTarget();
        });

        // get target(s)
        if (this.props.target) {
            this._$targets = Array.from(
                document.querySelectorAll(this.props.target),
            );
        }

        // set the value to be sure the display is correct...
        this._$input.value = this.props.value;

        // check if a form exists
        if (this._$input?.form) {
            this._$input.form.addEventListener('reset', () => {
                setTimeout(() => {
                    this._handleTooltip();
                    this._handleTarget();
                });
            });
        }

        // init
        this._handleTooltip();
        this._handleTarget();
    }
    _handleTarget() {
        if (!this._$targets) return;
        this._$targets.forEach(($target) => {
            $target.innerHTML = this._$input.value;
            $target.value = this._$input.value;
        });
    }
    _handleTooltip() {
        if (!this._$tooltip) return;
        const val = this._$input.value;
        const min = this._$input.min ? this._$input.min : 0;
        const max = this._$input.max ? this._$input.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        this._$tooltip.style.left = `calc(${newVal}% + (${
            8 - newVal * 0.15
        }px))`;
        let tooltipValue = val;
        if (this.props.values && this.props.values[val]) {
            tooltipValue = this.props.values[val];
        }
        this._$tooltip.innerHTML = tooltipValue;
    }
    render() {
        return html`
            <div class="${this.utils.cls('_root', 's-tooltip-container')}">
                <input
                    class="${this.utils.cls('_input', 's-range')}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.props.name}"
                    value="${this.props.value}"
                    min="${this.props.min}"
                    max="${this.props.max}"
                    step="${this.props.step}"
                />
                ${this.props.tooltip
                    ? html`
                          <div
                              class="${this.utils.cls(
                                  '_tooltip',
                                  's-tooltip',
                              )}"
                          ></div>
                      `
                    : ''}
            </div>
        `;
    }
}

/**
 * @name            webcomponent
 * @type            Function
 *
 * This function allows you to define (register) your webcomponent with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your webcomponent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export function define(
    props: Partial<ISRangeComponentProps> = {},
    tagName = 's-range',
) {
    __SLitComponent.define(tagName, SRangeComponent, props);
}
