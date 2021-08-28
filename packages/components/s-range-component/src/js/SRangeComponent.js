// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { html, css, unsafeCSS } from 'lit';
import __SRangeComponentInterface from './interface/SRangeComponentInterface';
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import __css from '../css/s-range.css';
export default class SRange extends SLitElement {
    constructor() {
        super();
        this._component = undefined;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SRangeComponentInterface,
                defaultProps: {},
            },
        });
    }
    static get properties() {
        return __SComponentUtils.properties({}, __SRangeComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    _handleTarget() {
        if (!this._$targets)
            return;
        this._$targets.forEach(($target) => {
            $target.innerHTML = this._$input.value;
            $target.value = this._$input.value;
        });
    }
    _handleTooltip() {
        if (!this._$tooltip)
            return;
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
        return html `
            <div class="${this._component.className('', 's-tooltip-container')}">
                <input
                    class="${this._component.className('__input', 's-range')}"
                    type="range"
                    name="${this.name}"
                    value="${this.value}"
                    min="${this.min}"
                    max="${this.max}"
                    step="${this.step}"
                />
                ${this._component.props.tooltip
            ? html ` <div class="${this._component.className('__tooltip', 's-tooltip')}"></div> `
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
export function webcomponent(props = {}, tagName = 's-range') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SRange);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JhbmdlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1JhbmdlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFnQyxNQUFNLGlDQUFpQyxDQUFDO0FBRS9HLE9BQU8sS0FBSyxNQUFNLG9CQUFvQixDQUFDO0FBeUR2QyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxXQUFXO0lBZTNDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFIWixlQUFVLEdBQUcsU0FBUyxDQUFDO1FBSW5CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsMEJBQTBCO2dCQUNyQyxZQUFZLEVBQUUsRUFBRTthQUNuQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUF0QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUM7a0JBQ04sS0FBSzthQUNWLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQWFLLFlBQVk7O1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxD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