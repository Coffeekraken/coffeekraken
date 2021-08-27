// @ts-nocheck

import { html, css, unsafeCSS } from 'lit-element';
import __SRangeComponentInterface from './interface/SRangeComponentInterface';
import __SComponentUtils, { SLitElement, ISComponentUtilsDefaultProps } from '@coffeekraken/s-component-utils';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __css from '../css/s-range.css';

/**
 * @name                s-range
 * @namespace           js
 * @type                Webcomponent
 * @interface           ./interface/SRangeComponentInterface.js        param
 * @menu                Styleguide / Forms              /styleguide/forms/s-range
 * @install             npm i @coffeekraken/s-range-component
 * @platform            html
 * @status              beta
 *
 * This component specify a range with some additional features that the native one like
 * displaying the value automatically in tooltip or inline.
 *
 * @feature         All the built-in input type range features are supported
 * @feature         Can display a tooltip on top of the thumb to help user know what's the current value
 * @feature         Can have target(s) that will be automatically filled with the current value
 * @feature         Support for sugar theming system when activate default style
 *
 * @example         html
 * <s-range name="myCoolRange" value="90" class="s-ui:accent s-mb:30"></s-range>
 *
 * <s-range name="myOtherRanfe" class="s-mb:30" tooltip></s-range>
 *
 * <s-range name="myOtherRanfe" class="s-mb:30 s-ui:accent" tooltip></s-range>
 *
 * <s-range name="myRangeWithSteps" value="70" class="s-ui:complementary s-mb:30" step="5"></s-range>
 *
 * <div class="s-flex:align-center s-mb:30">
 *  <s-range name="myRangeWithTarget" value="30" target="#my-range-with-target-target"></s-range>
 *  <span class="s-pl:20" id="my-range-with-target-target"></span>
 * </div>
 *
 * <s-range name="myRangeColoredSuccess" value="30" class="s-ui:success s-mb:30"></s-range>
 * <s-range name="myRangeColoredWarning" value="0" class="s-ui:warning s-mb:30"></s-range>
 * <s-range name="myRangeColoredError" value="1" min="0" max="10" class="s-ui:error s-mb:30"></s-range>
 *
 * @example         js
 * import { webcomponent as SRangeWebcomponent } from '@coffeekraken/s-range-component';
 * SRangeWebcomponent();
 *
 * @see             https://github.com/darlanrod/input-range-scss
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISRangeComponentProps extends ISComponentUtilsDefaultProps {
    name: string;
    value: string;
    min: number;
    max: number;
    step: number;
    target: string;
    tooltip: boolean;
}

export default class SRange extends SLitElement {
    static get properties() {
        return __SComponentUtils.properties({}, __SRangeComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    _component = undefined;

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SRangeComponentInterface,
                defaultProps: {},
            },
        });
    }
    async firstUpdated() {
        this._$input = this.querySelector('input');
        this._$tooltip = this.querySelector('.s-range__tooltip');

        this._$input.addEventListener('input', (e) => {
            this._handleTooltip();
            this._handleTarget();
        });

        // get target(s)
        if (this._component.props.target) {
            this._$targets = Array.from(document.querySelectorAll(this._component.props.target));
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
        this._$tooltip.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
        this._$tooltip.innerHTML = val;
    }
    _dispatchEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: {
                dateStr: this._picker.toString(),
                date: this._picker.getDate(),
            },
        });
        this.dispatchEvent(event);
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html`
            <div class="${this._component.className('', 's-tooltip-container')}">
                <input
                    class="${this._component.className('__input', 's-range')}"
                    type="range"
                    name="${this._component.props.name}"
                    value="${this._component.props.value}"
                    min="${this._component.props.min}"
                    max="${this._component.props.max}"
                    step="${this._component.props.step}"
                />
                ${this._component.props.tooltip
                    ? html` <div class="${this._component.className('__tooltip', 's-tooltip')}"></div> `
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export function webcomponent(props: Partial<ISRangeComponentProps> = {}, tagName = 's-range') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SRange);
}
