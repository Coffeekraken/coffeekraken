// @ts-nocheck

import { html, css, unsafeCSS } from 'lit-element/lit-element';
import __SRangeComponentInterface from './interface/SRangeComponentInterface';
import __SComponentUtils, { SLitElement, ISComponentUtilsDefaultProps } from '@coffeekraken/s-component-utils';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

import __css from '../css/s-range.css';

/**
 * @name                s-range
 * @namespace           js
 * @type                Webcomponent
 * @platform            html
 * @status              beta
 *
 * This component specify a range with some additional features that the native one like
 * displaying the value automatically in tooltip or inline.
 *
 * @example         html
 * <s-range name="myCoolRange" class="s-ui:accent"></s-range>
 * <s-range name="myOtherRanfe" tooltip></s-range>
 *
 * @example         js
 * import { webcomponent as SRangeWebcomponent } from '@coffeekraken/s-range-component';
 * SRangeWebcomponent();
 *
 * @see             https://github.com/darlanrod/input-range-scss/blob/master
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
            interface: __SRangeComponentInterface,
            defaultProps: {},
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
                    ? html` <div class="${this._component.className('__tooltip', 's-tooltip')}">Hello</div> `
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
