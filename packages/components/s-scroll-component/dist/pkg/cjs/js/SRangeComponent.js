"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const lit_1 = require("lit");
const SRangeComponentInterface_1 = __importDefault(require("./interface/SRangeComponentInterface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
// @ts-ignore
const s_range_css_1 = __importDefault(require("../../../../src/css/s-range.css")); // relative to /dist/pkg/esm/js
class SRange extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.properties({}, SRangeComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(`
                ${s_range_css_1.default}
            `)}
        `;
    }
    constructor() {
        super((0, deepMerge_1.default)({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: SRangeComponentInterface_1.default,
            },
        }));
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
        return (0, lit_1.html) `
            <div
                class="${this.componentUtils.className('', 's-tooltip-container')}"
            >
                <input
                    class="${this.componentUtils.className('__input', 's-range')}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.name}"
                    value="${this.value}"
                    min="${this.min}"
                    max="${this.max}"
                    step="${this.step}"
                />
                ${this.props.tooltip
            ? (0, lit_1.html) `
                          <div
                              class="${this.componentUtils.className('__tooltip', 's-tooltip')}"
                          ></div>
                      `
            : ''}
            </div>
        `;
    }
}
exports.default = SRange;
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
function define(props = {}, tagName = 's-range') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SRange);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw2QkFBMkM7QUFDM0Msb0dBQThFO0FBQzlFLG9GQUV1QztBQUV2Qyw0RkFBc0U7QUFFdEUsYUFBYTtBQUNiLGtGQUFvRCxDQUFDLCtCQUErQjtBQXlFcEYsTUFBcUIsTUFBTyxTQUFRLHlCQUFlO0lBQy9DLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLGtDQUEwQixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDO2tCQUNOLHFCQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxtQkFBVyxFQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSxrQ0FBMEI7YUFDeEM7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFDSyxZQUFZOztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQjtZQUNoQixJQUFJLElBQUks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