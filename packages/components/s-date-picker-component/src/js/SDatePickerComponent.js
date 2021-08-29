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
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import __pikaday from 'pikaday';
import __whenInteract from '@coffeekraken/sugar/js/dom/detect/whenInteract';
import __moment from 'moment';
import __css from '../css/s-date-picker.css';
import __themeCss from '../css/s-date-picker-theme.css';
import __baseCss from 'pikaday/css/pikaday.css';
export default class SDatePicker extends SLitElement {
    constructor() {
        super();
        this._component = undefined;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SDatePickerComponentInterface,
                defaultProps: {},
            },
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
                ${__themeCss}
            `)}
        `;
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            const $input = yield this._$input;
            let $button;
            if (this._component.props.button)
                $button = yield this._$button;
            yield __whenInteract(this);
            const _this = this;
            this._picker = new __pikaday({
                field: $input,
                format: this._component.props.format,
                trigger: $button,
                firstDay: this._component.props.firstDay,
                minDate: this.parseDate(this._component.props.minDate),
                maxDate: this.parseDate(this._component.props.maxDate),
                disableWeekends: this._component.props.disableWeekends,
                yearRange: this._component.props.yearRange,
                // showWeekNumber: this._component.props.showWeekNumber,
                isRTL: this._component.props.rtl,
                i18n: this._component.props.i18n,
                numberOfMonths: this._component.props.numberOfMonths,
                events: this._component.props.events,
                defaultDate: this._component.props.value,
                theme: this._component.props.defaultStyle ? 's-pikaday' : '',
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
                if (cls.match(/^s-ui/))
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
    parseDate(dateString, format = this._component.props.format) {
        return __moment(dateString, format).toDate();
    }
    dateToString(date, format = this._component.props.format) {
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
                    ?rtl="${this.rtl}"
                    placeholder="${this.placeholder}"
                    autocomplete="off"
                />
                ${this.button
            ? html `
                          <button class="${this._component.className('__button', 's-btn')}">
                              ${staticHTML([this.calendarIcon])}
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
export function webcomponent(props = {}, tagName = 's-date-picker') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatePicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7O0FBRWQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLElBQUksVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sK0JBQStCLE1BQU0sMkNBQTJDLENBQUM7QUFDeEYsT0FBTyxpQkFBaUIsRUFBRSxFQUFFLFdBQVcsRUFBZ0MsTUFBTSxpQ0FBaUMsQ0FBQztBQUUvRyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxjQUFjLE1BQU0sZ0RBQWdELENBQUM7QUFFNUUsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sS0FBSyxNQUFNLDBCQUEwQixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBa0hoRCxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxXQUFXO0lBdUJoRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBVFosZUFBVSxHQUFHLFNBQVMsQ0FBQztRQVVuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2RixjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLCtCQUErQjtnQkFDMUMsWUFBWSxFQUFFLEVBQUU7YUFDbkI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBOUJELE1BQU0sS0FBSyxV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