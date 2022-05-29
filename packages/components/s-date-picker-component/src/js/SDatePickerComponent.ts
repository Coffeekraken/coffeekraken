// @ts-nocheck

import { html, css, unsafeCSS } from 'lit';
import { html as staticHTML } from 'lit/static-html.js';
import { queryAsync, queryAssignedNodes } from 'lit/decorators.js';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __SComponentUtils, {
    SLitElement,
    ISComponentUtilsDefaultProps,
} from '@coffeekraken/s-lit-component';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __pikaday from 'pikaday';
import __whenInteract from '@coffeekraken/sugar/js/dom/detect/whenInteract';

import __moment from 'moment';

import __baseCss from 'pikaday/css/pikaday.css';
import __SLitComponent from '@coffeekraken/s-lit-component';

// @ts-ignore
import __css from '../../../../src/css/s-date-picker.css'; // relative to /dist/pkg/esm/js
import __themeCss from '../../../../src/css/s-date-picker-theme.css'; // relative to /dist/pkg/esm/js

/**
 * @name                SDatePickerComponent
 * @as                Date Picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SDatePickerComponentInterface.js
 * @menu                Styleguide / Forms              /styleguide/form/s-date-picker
 * @platform            html
 * @status              beta
 *
 * This component specify a date picker. It uses under the hood the **AMAZING pikaday library** with some additional features like
 * sugar theming support as well as some events and more.
 * Almost all the pikaday options are available through properties. Check out the api documentation for more details...
 *
 * @feature           All the pikaday features are supported
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install         bash
 * npm i @coffeekraken/s-date-picker-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-date-picker-component';
 * define();
 *
 * @example         html            Min and max dates
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-date-picker
 *          placeholder="Choose a date"
 *          class="s-width:40"
 *          min-date="2021-08-10"
 *          max-date="2021-08-20"
 *          name="myDatePicker2"
 *          input
 *      ></s-date-picker>
 * </label>
 *
 * @example         html            Disable weekends
 * <label class="s-label:responsive">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         class="s-width:40"
 *         name="myDatePicker3"
 *         disable-weekends
 *         input
 *     ></s-date-picker>
 * </label>
 *
 * @example         html            With a button
 * <label class="s-label:responsive">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         class="s-width:40"
 *         name="myDatePicker4"
 *         input
 *         button
 *     ></s-date-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         class="s-width:40"
 *         name="myDatePicker4"
 *          disabled
 *         input
 *         button
 *     ></s-date-picker>
 * </label>
 *
 * @example         html            Display more than 1 month
 * <label class="s-label:responsive">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         class="s-width:40"
 *         name="myDatePicker4"
 *         number-of-months="2"
 *          input
 *          button
 *     ></s-date-picker>
 * </label>
 *
 * @example         html            With custom input
 * <label class="s-label:responsive">
 *      Choose a date
 *      <s-date-picker name="something">
 *          <input type="text" name="something" placeholder="Choose a date" class="s-width:40" />
 *      </s-date-picker>
 * </label>
 *
 * @example         html            With a custom button
 * <label class="s-label:responsive">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         name="myDatePicker5"
 *     >
 *       <button class="s-btn">Choose a date</button>
 *     </s-date-picker>
 * </label>
 *
 * @example         html            With a custom input and button
 * <label class="s-label:responsive">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         name="myDatePicker5"
 *     >
 *       <input type="text" name="something" placeholder="Choose a date" class="s-width:40" />
 *       <button class="s-btn">Choose a date</button>
 *     </s-date-picker>
 * </label>
 *
 * @example         html            Colors (non-exhaustive)
 * <label class="s-label:responsive s-mbe:20">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         name="myDatePicker5"
 *          input
 *         button
 *     >
 *     </s-date-picker>
 * </label>
 * <label class="s-label:responsive s-mbe:20 s-color:accent">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         name="myDatePicker5"
 *          input
 *         button
 *     >
 *     </s-date-picker>
 * </label>
 * <label class="s-label:responsive s-mbe:20 s-color:complementary">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         name="myDatePicker5"
 *          input
 *         button
 *     >
 *     </s-date-picker>
 * </label>
 * <label class="s-label:responsive s-mbe:20 s-color:error">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         name="myDatePicker5"
 *          input
 *         button
 *     >
 *     </s-date-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive" dir="rtl">
 *      Choose a date
 *     <s-date-picker
 *         placeholder="Choose a date"
 *         class="s-width:40"
 *         min-date="2021-08-10"
 *         name="myDatePicker1"
 *         input
 *         rtl
 *     ></s-date-picker>
 * </label>
 *
 * @todo            Support for the "showWeekNumber" setting
 *
 * @see             https://github.com/Pikaday/Pikaday
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISDatePickerComponentProps {
    name: string;
    value: string;
    format: string;
    firstDay: number;
    minDate: string;
    maxDate: string;
    disableWeekends: boolean;
    disabled: boolean;
    yearRange: number[];
    // showWeekNumber: boolean;
    rtl: boolean;
    i18n: string;
    numberOfMonths: number;
    events: string[];
    input: boolean;
    button: boolean;
    arrowIcon: string;
    calendarIcon: string;
}

export default class SDatePicker extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, __SDatePickerComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
                ${__themeCss}
            `)}
        `;
    }

    _$root;
    _$input;
    _$button;
    _hasInput = false;
    _hasButton = false;

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SDatePickerComponentInterface,
            },
        });

        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._hasButton = this._$button !== null;
    }
    async firstUpdated() {
        this._$root = this.querySelector(
            `.${this.componentUtils.className('')}`,
        );

        if (!this._$input) {
            this._$input = this.querySelector('input');
        } else {
            this._$root.append(this._$input);
        }

        if (!this._$input?.hasAttribute('name')) {
            this._$input?.setAttribute('name', this.props.name);
        }
        if (!this._$input?.hasAttribute('placeholder')) {
            this._$input?.setAttribute('placeholder', this.props.placeholder);
        }
        if (!this._$input?.hasAttribute('autocomplete')) {
            this._$input?.setAttribute('autocomplete', 'off');
        }

        // button
        if (!this._$button) {
            this._$button = this.querySelector('button');
        } else {
            this._$root.append(this._$button);
        }
        if (this._$button) {
            this._$button.classList.add(
                this.componentUtils.className('__button'),
            );
        }

        await __whenInteract(this);

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
            if (cls.match(/^s-cs/)) this._picker.el.classList.add(cls);
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
        return html`
            <div
                class="${this.componentUtils.className('')}"
                ${this.props.rtl ? 'dir="rtl"' : ''}
            >
                ${!this._hasInput && this.props.input
                    ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="text"
                              autocomplete="off"
                              name="${this.props.name}"
                              value="${this.props.value}"
                              placeholder="${this.props.placeholder}"
                              class="${this.componentUtils.className(
                                  '__input',
                                  's-input',
                              )}"
                          />
                      `
                    : !this._hasInput
                    ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${this.props.value}"
                          />
                      `
                    : ``}
                ${!this._hasButton && this.props.button
                    ? html`
                          <button
                              ?disabled=${this.props.disabled}
                              onclick="return false"
                              class="${this.componentUtils.className(
                                  '__button',
                                  's-btn',
                              )}"
                          >
                              ${this.calendarIcon
                                  ? html` ${staticHTML(this.calendarIcon)} `
                                  : html`
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export function define(
    props: Partial<ISDatePickerComponentProps> = {},
    tagName = 's-date-picker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatePicker);
}
