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
import { html, css, unsafeCSS } from 'lit';
import { html as staticHTML } from 'lit/static-html.js';
import { queryAsync } from 'lit/decorators.js';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __pikaday from 'pikaday';
import __whenInteract from '@coffeekraken/sugar/js/dom/detect/whenInteract';
import __moment from 'moment';
import __css from '../css/s-date-picker.css';
import __themeCss from '../css/s-date-picker-theme.css';
import __baseCss from 'pikaday/css/pikaday.css';
import __SLitComponent from '@coffeekraken/s-lit-component';
export default class SDatePicker extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SDatePickerComponentInterface,
            },
        });
    }
    static get properties() {
        return __SLitComponent.properties({}, __SDatePickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
                ${__themeCss}
            `)}
        `;
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._$root = this.querySelector(`.${this.componentUtils.className('')}`);
            this._$input = this.querySelector('input');
            if (!this._$input) {
                this._$input = document.createElement('input');
                this._$input.setAttribute('type', this.props.noInput ? 'hidden' : 'text');
                if (!this.props.noInput) {
                    this._$input.setAttribute('class', this.componentUtils.className('__input', 's-input'));
                }
            }
            else {
                this._$input.classList.add(this.componentUtils.className('__input'));
            }
            if (!this._$input.hasAttribute('name')) {
                this._$input.setAttribute('name', this.props.name);
            }
            if (!this._$input.hasAttribute('placeholder')) {
                this._$input.setAttribute('placeholder', this.props.placeholder);
            }
            if (!this._$input.hasAttribute('autocomplete')) {
                this._$input.setAttribute('autocomplete', 'off');
            }
            if (this.props.rtl)
                this._$input.setAttribute('rtl', 'true');
            this._$root.prepend(this._$input);
            let $button;
            if (!this.props.noButton)
                $button = yield this._$button;
            yield __whenInteract(this);
            const _this = this;
            this._picker = new __pikaday({
                field: this._$input,
                format: this.props.format,
                trigger: $button,
                firstDay: this.props.firstDay,
                minDate: this.parseDate(this.props.minDate),
                maxDate: this.parseDate(this.props.maxDate),
                disableWeekends: this.props.disableWeekends,
                yearRange: this.props.yearRange,
                container: this,
                position: this.props.rtl ? 'bottom right' : 'bottom left',
                reposition: true,
                // showWeekNumber: this.props.showWeekNumber,
                isRTL: this.props.rtl,
                i18n: this.props.i18n,
                numberOfMonths: this.props.numberOfMonths,
                events: this.props.events,
                defaultDate: this.props.value,
                theme: !this.props.bare ? 's-pikaday' : '',
                toString(date, format) {
                    return _this.dateToString(date, format);
                },
                parse(dateString, format) {
                    return _this.parseDate(dateString, format);
                },
                onSelect: () => {
                    this._dispatchEvent('select');
                },
                onOpen: () => {
                    this._dispatchEvent('open');
                },
                onClose: () => {
                    this._dispatchEvent('close');
                },
                onDraw: () => {
                    this._dispatchEvent('draw');
                },
            });
            Array.from(this.classList).forEach((cls) => {
                if (cls.match(/^s-cs/))
                    this._picker.el.classList.add(cls);
            });
            [
                'toString',
                'getDate',
                'setDate',
                'getMoment',
                'clear',
                'gotoDate',
                'gotoToday',
                'gotoMonth',
                'nextMonth',
                'prevMonth',
                'gotoYear',
                'setMinDate',
                'setMaxDate',
                'setStartRange',
                'setEndRange',
                'isVisible',
                'show',
                'adjustPosition',
                'hide',
                'destroy',
            ].forEach((key) => {
                this[key] = this._picker[key].bind(this._picker);
            });
        });
    }
    parseDate(dateString, format = this.props.format) {
        return __moment(dateString, format).toDate();
    }
    dateToString(date, format = this.props.format) {
        return __moment(date).format(format);
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
    render() {
        return html `
            <div class="${this.componentUtils.className('')}">
                <slot></slot>
                ${!this.props.noButton
            ? html `
                          <button
                              onclick="return false"
                              class="${this.componentUtils.className('__button', 's-btn')}"
                          >
                              ${staticHTML([this.calendarIcon])}
                          </button>
                      `
            : ''}
            </div>
        `;
    }
}
__decorate([
    queryAsync('button')
], SDatePicker.prototype, "_$button", void 0);
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
export function define(props = {}, tagName = 's-date-picker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatePicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLElBQUksVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBc0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBTXhGLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGNBQWMsTUFBTSxnREFBZ0QsQ0FBQztBQUU1RSxPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFOUIsT0FBTyxLQUFLLE1BQU0sMEJBQTBCLENBQUM7QUFDN0MsT0FBTyxVQUFVLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEQsT0FBTyxTQUFTLE1BQU0seUJBQXlCLENBQUM7QUFDaEQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUE4SDVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLGVBQWU7SUFxQnBEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSwrQkFBK0I7YUFDN0M7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBN0JELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsK0JBQStCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQztrQkFDTixTQUFTO2tC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