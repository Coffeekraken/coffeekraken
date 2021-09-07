// @ts-nocheck
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
import { html, css, unsafeCSS } from 'lit';
import __SRangeComponentInterface from './interface/SRangeComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __css from '../css/s-range.css';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default class SRange extends SLitElement {
    static get properties() {
        return __SLitComponent.properties({}, __SRangeComponentInterface);
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
                sLitElement: {
                    shadowDom: false,
                    interface: __SRangeComponentInterface,
                },
            }),
        );
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
            if (this.props.target) {
                this._$targets = Array.from(document.querySelectorAll(this.props.target));
            }
            // init
            this._handleTooltip();
            this._handleTarget();
        });
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
    render() {
        return html`
            <div class="${this.className('', 's-tooltip-container')}">
                <input
                    class="${this.className('__input', 's-range')}"
                    type="range"
                    name="${this.name}"
                    value="${this.value}"
                    min="${this.min}"
                    max="${this.max}"
                    step="${this.step}"
                />
                ${this.props.tooltip ? html` <div class="${this.className('__tooltip', 's-tooltip')}"></div> ` : ''}
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
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SRange);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JhbmdlQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1JhbmdlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLGFBQTJDLE1BQU0sNkJBQTZCLENBQUM7QUFFdEYsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFDdkMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUF5RHRFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFdBQVc7SUFDM0MsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDO2tCQUNOLEtBQUs7YUFDVixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixXQUFXLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFNBQVMsRUFBRSwwQkFBMEI7YUFDeEM7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFDSyxZQUFZOztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMs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
