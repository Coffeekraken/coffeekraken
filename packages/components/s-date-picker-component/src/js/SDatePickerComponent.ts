// @ts-nocheck

import { html, css, unsafeCSS } from 'lit';
import { html as staticHTML } from 'lit/static-html.js';
import { queryAsync } from 'lit/decorators.js';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __SComponentUtils, {
    SLitElement,
    ISComponentUtilsDefaultProps,
} from '@coffeekraken/s-lit-component';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __pikaday from 'pikaday';
import __whenInteract from '@coffeekraken/sugar/js/dom/detect/whenInteract';

import __moment from 'moment';

import __css from '../css/s-date-picker.css';
import __themeCss from '../css/s-date-picker-theme.css';
import __baseCss from 'pikaday/css/pikaday.css';
import __SLitComponent from '@coffeekraken/s-lit-component';

/**
 * @name                Date Picker
 * @namespace           js
 * @type                Webcomponent
 * @interface           ./interface/SDatePickerComponentInterface.js
 * @menu                Styleguide / Forms              /styleguide/forms/s-date-picker
 * @install             npm i @coffeekraken/s-date-picker-component
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
 * @example         html
 * <label class="s-label s-mb--30">
 *      Min and max date
 *      <s-date-picker
 *          placeholder="Select a date"
 *          class="s-width--50"
 *          min-date="2021-08-10"
 *          max-date="2021-08-20"
 *          name="myDatePicker2"
 *          default-style
 *      ></s-date-picker>
 * </label>
 *
 * <label class="s-label s-mb--30">
 *      Min and max date
 *      <s-date-picker
 *          placeholder="Select a date"
 *          class="s-color:accent\:deep s-width--50"
 *          min-date="2021-08-10"
 *          max-date="2021-08-20"
 *          name="myDatePicker2"
 *          default-style
 *      ></s-date-picker>
 * </label>
 *
 * <label class="s-label s-mb--30">
 *     Disable weekends
 *     <s-date-picker
 *         placeholder="Select a date"
 *         class="s-color:complementary\:deep s-width--50"
 *         name="myDatePicker3"
 *         disable-weekends
 *         default-style
 *     ></s-date-picker>
 * </label>
 *
 * <label class="s-label s-mb--30">
 *     RTL support
 *     <s-date-picker
 *         placeholder="Select a date"
 *         class="s-color:accent\:deep s-width--50"
 *         min-date="2021-08-10"
 *         name="myDatePicker1"
 *         rtl
 *         default-style
 *     ></s-date-picker>
 * </label>
 *
 * <label class="s-label s-mb--30">
 *     Display more than 1 month
 *     <s-date-picker
 *         placeholder="Select a date"
 *         class="s-color:success\:deep s-width--50"
 *         name="myDatePicker4"
 *         number-of-months="2"
 *         default-style
 *     ></s-date-picker>
 * </label>
 *
 * <label class="s-label s-mb--30">
 *     Custom calendar icon
 *     <s-date-picker
 *         placeholder="Select a date"
 *         class="s-color:error\:deep s-width--50"
 *         name="myDatePicker5"
 *         calendar-icon="<?xml version='1.0' encoding='iso-8859-1'?>
 * <*svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 488.901 488.901' style='enable-background:new 0 0 488.901 488.901;' xml:space='preserve'><g><g><g><path fill='currentColor' d='M468.9,56.1h-76.2v-36c0-10.6-9.5-20.1-20.1-20.1s-20.1,8.5-20.1,20.1v36H136.6v-36c0-10.6-9.5-20.1-20.1-20.1
 *			S96.4,8.5,96.4,20.1v36H20.1C9.5,56.1,0,64.6,0,76.2v392.6c0,10.6,8.5,20.1,20.1,20.1h329.1c5.3,0,9.5-1.1,13.8-5.3l119.6-111.1
 *			c4.2-4.2,6.3-9.5,6.3-14.8V76.2C489,65.6,480.5,56.1,468.9,56.1z M40.2,96.3h408.5v241.3H348.2c-10.6,0-20.1,8.5-20.1,20.1v91
 *			H40.2V96.3z M417.7,377.8l-48.4,44.6v-44.6H417.7z'/></g><path fill='currentColor' d='M286.3,256.1c8.7-9.8,13.9-22.7,13.9-36.8c0-30.7-25-55.7-55.7-55.7s-55.7,25-55.7,55.7c0,14.1,5.3,27,13.9,36.8
 *		c-13,11.6-21.2,28.4-21.2,47.1c0,34.7,28.3,63,63,63s63-28.3,63-63C307.5,284.5,299.3,267.7,286.3,256.1z M244.5,198.6
 *		c11.4,0,20.7,9.3,20.7,20.7s-9.3,20.7-20.7,20.7s-20.7-9.3-20.7-20.7S233.1,198.6,244.5,198.6z M244.5,331.3
 *		c-15.4,0-28-12.6-28-28s12.6-28,28-28s28,12.6,28,28S259.9,331.3,244.5,331.3z'/></g></g><g></svg>"
 *         default-style
 *     ></s-date-picker>
 * </label>
 *
 * @example         js
 * import { webcomponent as SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
 * SDatePickerWebcomponent();
 *
 * @todo            Support for the "showWeekNumber" setting
 *
 * @see             https://www.npmjs.com/package/pikaday
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDatePickerComponentProps {
    name: string;
    value: string;
    format: string;
    firstDay: number;
    minDate: string;
    maxDate: string;
    disableWeekends: boolean;
    yearRange: number[];
    // showWeekNumber: boolean;
    rtl: boolean;
    i18n: string;
    numberOfMonths: number;
    events: string[];
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

    @queryAsync('input')
    _$input;

    @queryAsync('button')
    _$button;

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
    async firstUpdated() {
        const $input = await this._$input;
        let $button;
        if (this.props.button) $button = await this._$button;

        await __whenInteract(this);

        const _this = this;
        this._picker = new __pikaday({
            field: $input,
            format: this.props.format,
            trigger: $button,
            firstDay: this.props.firstDay,
            minDate: this.parseDate(this.props.minDate),
            maxDate: this.parseDate(this.props.maxDate),
            disableWeekends: this.props.disableWeekends,
            yearRange: this.props.yearRange,
            // showWeekNumber: this.props.showWeekNumber,
            isRTL: this.props.rtl,
            i18n: this.props.i18n,
            numberOfMonths: this.props.numberOfMonths,
            events: this.props.events,
            defaultDate: this.props.value,
            theme: this.props.defaultStyle ? 's-pikaday' : '',
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
            <div class="${this.componentUtils.className('')}">
                <input
                    class="${this.componentUtils.className(
                        '__input',
                        's-input',
                    )}"
                    type="text"
                    name="${this.name}"
                    ?rtl="${this.rtl}"
                    placeholder="${this.placeholder}"
                    autocomplete="off"
                />
                ${this.button
                    ? html`
                          <button
                              onclick="return false"
                              class="${this.componentUtils.className(
                                  '__button',
                                  's-btn',
                              )}"
                          >
                              ${staticHTML([this.calendarIcon])}
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
export function define(
    props: Partial<ISDatePickerComponentProps> = {},
    tagName = 's-date-picker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatePicker);
}
