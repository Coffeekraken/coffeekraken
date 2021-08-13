// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LitElement, html, css, unsafeCSS, queryAsync } from 'lit-element';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __pikaday from 'pikaday';
import __css from '../css/s-date-picker.css';
import __baseCss from 'pikaday/css/pikaday.css';
export default class SDatePicker extends LitElement {
    constructor() {
        super();
        this._component = undefined;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SDatePickerComponentInterface,
            defaultProps: {},
        });
    }
    static get properties() {
        return __SComponentUtils.properties({}, __SDatePickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
            `)}
        `;
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $input = yield this._$input;
            console.log($input);
            this._picker = new __pikaday({ field: $input });
        });
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
            <div class="${this._component.className('')}">
                <input class="${this._component.className('__input', 's-input')}" type="text" name="${this.name}" />
            </div>
        `;
    }
}
__decorate([
    queryAsync('input')
], SDatePicker.prototype, "_$input", void 0);
export function webcomponent(tagName = 's-date-picker') {
    customElements.define(tagName, SDatePicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQVksR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckYsT0FBTywrQkFBK0IsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLEtBQUssTUFBTSwwQkFBMEIsQ0FBQztBQUM3QyxPQUFPLFNBQVMsTUFBTSx5QkFBeUIsQ0FBQztBQUVoRCxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxVQUFVO0lBbUIvQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBTlosZUFBVSxHQUFHLFNBQVMsQ0FBQztRQU9uQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2RixTQUFTLEVBQUUsK0JBQStCO1lBQzFDLFlBQVksRUFBRSxFQUFFO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUF4QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLCtCQUErQixDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUM7a0JBQ04sU0FBUztrQkFDVCxLQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBY0ssWUFBWTs7WUFDZCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBQ0QsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0NBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsdUJBQXVCLElBQUksQ0FBQyxJQUFJOztTQUV0RyxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekJHO0lBREMsVUFBVSxDQUFDLE9BQU8sQ0FBQzs0Q0FDWjtBQTJCWixNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlO0lBQ2xELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELENBQUMifQ==