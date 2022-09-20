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
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SRangeComponentInterface from './interface/SRangeComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-range.css'; // relative to /dist/pkg/esm/js
export default class SRangeComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.createProperties({}, __SRangeComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    constructor() {
        super(__deepMerge({
            name: 's-range',
            interface: __SRangeComponentInterface,
        }));
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this._$input = this.querySelector('input');
            this._$tooltip = this.querySelector('.s-range__tooltip');
            this._$input.addEventListener('input', (e) => {
                this._handleTooltip();
                this._handleTarget();
            });
            // get target(s)
            if (this.props.target) {
                this._$targets = Array.from(document.querySelectorAll(this.props.target));
            }
            // set the value to be sure the display is correct...
            this._$input.value = this.props.value;
            // check if a form exists
            if ((_a = this._$input) === null || _a === void 0 ? void 0 : _a.form) {
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
    render() {
        return html `
            <div
                class="${this.componentUtils.className('__root', 's-tooltip-container')}"
            >
                <input
                    class="${this.componentUtils.className('__input', 's-range')}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.props.name}"
                    value="${this.props.value}"
                    min="${this.props.min}"
                    max="${this.props.max}"
                    step="${this.props.step}"
                />
                ${this.props.tooltip
            ? html `
                          <div
                              class="${this.componentUtils.className('__tooltip', 's-tooltip')}"
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
export function define(props = {}, tagName = 's-range') {
    __SLitComponent.define(tagName, SRangeComponent, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFFOUUsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLGlDQUFpQyxDQUFDLENBQUMsK0JBQStCO0FBMEVwRixNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsZUFBZTtJQUN4RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQztrQkFDTixLQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsMEJBQTBCO1NBQ3hDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUNLLFlBQVk7OztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxF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