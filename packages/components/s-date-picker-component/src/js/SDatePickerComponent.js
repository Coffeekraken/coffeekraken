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
import { LitElement, html, css, unsafeCSS, queryAsync } from 'lit-element/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __pikaday from 'pikaday';
import __moment from 'moment';
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
            let $button;
            if (this._component.props.button)
                $button = yield this._$button;
            this._picker = new __pikaday({
                field: $input,
                format: __SSugarConfig.get('datetime.dateFormat'),
                trigger: $button,
                toString(date, format) {
                    return __moment(date).format(format);
                },
                parse(dateString, format) {
                    return __moment(dateString, format).toDate();
                },
            });
            this._picker.setMoment(__moment().dayOfYear(366));
        });
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
            <div class="${this._component.className('')}">
                <input
                    class="${this._component.className('__input', 's-input')}"
                    type="text"
                    name="${this.name}"
                    autocomplete="off"
                />
                ${this._component.props.button
            ? html `
                          <button class="${this._component.className('__button', 's-btn')}">
                              ${unsafeHTML(this._component.props.icon)}
                          </button>
                      `
            : ''}
            </div>
        `;
    }
}
__decorate([
    queryAsync('input')
], SDatePicker.prototype, "_$input", void 0);
__decorate([
    queryAsync('button')
], SDatePicker.prototype, "_$button", void 0);
export function webcomponent(tagName = 's-date-picker') {
    customElements.define(tagName, SDatePicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQVksR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDaEUsT0FBTywrQkFBK0IsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RixPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFOUIsT0FBTyxLQUFLLE1BQU0sMEJBQTBCLENBQUM7QUFDN0MsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFFaEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFZLFNBQVEsVUFBVTtJQXNCL0M7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQVRaLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFVbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkYsU0FBUyxFQUFFLCtCQUErQjtZQUMxQyxZQUFZLEVBQUUsRUFBRTtTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBM0JELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDO2tCQUNOLFNBQVM7a0JBQ1QsS0FBSzthQUNWLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQWlCSyxZQUFZOztZQUNkLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxJQUFJLE9BQU8sQ0FBQztZQUNaLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFBRSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBRWhFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7Z0JBQ3pCLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2dCQUNqRCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNO29CQUNqQixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNO29CQUNwQixPQUFPLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pELENBQUM7YUFDSixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFDRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzs7NkJBRTFCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7OzRCQUVoRCxJQUFJLENBQUMsSUFBSTs7O2tCQUduQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUE7MkNBQ2lCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7Z0NBQ3pELFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7O3VCQUUvQztZQUNILENBQUMsQ0FBQyxFQUFFOztTQUVmLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFwREc7SUFEQyxVQUFVLENBQUMsT0FBTyxDQUFDOzRDQUNaO0FBR1I7SUFEQyxVQUFVLENBQUMsUUFBUSxDQUFDOzZDQUNaO0FBbURiLE1BQU0sVUFBVSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWU7SUFDbEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDaEQsQ0FBQyJ9