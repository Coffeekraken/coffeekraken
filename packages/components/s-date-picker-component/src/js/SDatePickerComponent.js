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
import { html as staticHTML } from 'lit/static-html.js';
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
        this._hasInput = false;
        this._hasButton = false;
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._hasButton = this._$button !== null;
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
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            this._$root = this.querySelector(`.${this.componentUtils.className('')}`);
            if (!this._$input) {
                this._$input = this.querySelector('input');
            }
            else {
                this._$root.append(this._$input);
            }
            if (!((_a = this._$input) === null || _a === void 0 ? void 0 : _a.hasAttribute('name'))) {
                (_b = this._$input) === null || _b === void 0 ? void 0 : _b.setAttribute('name', this.props.name);
            }
            if (!((_c = this._$input) === null || _c === void 0 ? void 0 : _c.hasAttribute('placeholder'))) {
                (_d = this._$input) === null || _d === void 0 ? void 0 : _d.setAttribute('placeholder', this.props.placeholder);
            }
            if (!((_e = this._$input) === null || _e === void 0 ? void 0 : _e.hasAttribute('autocomplete'))) {
                (_f = this._$input) === null || _f === void 0 ? void 0 : _f.setAttribute('autocomplete', 'off');
            }
            // button
            if (!this._$button) {
                this._$button = this.querySelector('button');
            }
            else {
                this._$root.append(this._$button);
            }
            if (this._$button) {
                this._$button.classList.add(this.componentUtils.className('__button'));
            }
            yield __whenInteract(this);
            const _this = this;
            this._picker = new __pikaday({
                field: this._$input,
                format: this.props.format,
                trigger: this._$button,
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
            <div class="${this.componentUtils.className('')}" ${this.props.rtl ? 'dir="rtl"' : ''}>
                ${!this._hasInput && this.props.input ? html `
                    <input type="text" autocomplete="off" name="${this.props.name}" value="${this.props.value}" placeholder="${this.props.placeholder}" class="${this.componentUtils.className('__input', 's-input')}" />
                ` : !this._hasInput ? html `
                    <input type="hidden" name="${this.props.name}" value="${this.props.value}" />
                ` : ``}
                ${!this._hasButton && this.props.button
            ? html `
                          <button
                              onclick="return false"
                              class="${this.componentUtils.className('__button', 's-btn')}"
                          >
                              ${this.calendarIcon ? html `
                                ${staticHTML(this.calendarIcon)}
                              ` : html `
                                <i class="s-icon s-icon--calendar"></i>
                              `}
                          </button>
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export function define(props = {}, tagName = 's-date-picker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatePicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RhdGVQaWNrZXJDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRGF0ZVBpY2tlckNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLElBQUksVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFeEQsT0FBTywrQkFBK0IsTUFBTSwyQ0FBMkMsQ0FBQztBQU14RixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxjQUFjLE1BQU0sZ0RBQWdELENBQUM7QUFFNUUsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sS0FBSyxNQUFNLDBCQUEwQixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hELE9BQU8sU0FBUyxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBK0g1RCxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxlQUFlO0lBcUJwRDtRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsK0JBQStCO2FBQzdDO1NBQ0osQ0FBQyxDQUFDO1FBWFAsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBWWYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEs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