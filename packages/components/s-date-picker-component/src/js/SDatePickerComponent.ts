// @ts-nocheck

import { html, property, css, unsafeCSS, queryAsync } from 'lit-element/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __SComponentUtils, { SLitElement, ISComponentUtilsDefaultProps } from '@coffeekraken/s-component-utils';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __pikaday from 'pikaday';

import __moment from 'moment';

import __css from '../css/s-date-picker.css';
import __themeCss from '../css/s-date-picker-theme.css';
import __baseCss from 'pikaday/css/pikaday.css';

/**
 * @name                s-date-picker
 * @namespace           js
 * @type                Webcomponent
 * @platform            html
 * @status              beta
 *
 * This component specify a date picker. It uses under the hood the AMAZING pikaday library with some additional features like
 * sugar theming support as well as some events and more.
 * Almost all the pikaday options are available through properties. Check out the api documentation for more details...
 *
 * @example         html
 * <s-date-picker name="myCoolDate" class="s-ui:accent"></s-date-picker>
 * <s-date-picker name="myOtherDate" number-of-months="3" rtl></s-date-picker>
 *
 * @example         js
 * import { webcomponent as SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
 * SDatePickerWebcomponent();
 *
 * @see             https://www.npmjs.com/package/pikaday
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDatePickerComponentProps extends ISComponentUtilsDefaultProps {
    name: string;
    value: string;
    format: string;
    firstDay: number;
    minDate: string;
    maxDate: string;
    disableWeekends: boolean;
    yearRange: number[];
    showWeekNumber: boolean;
    rtl: boolean;
    i18n: string;
    numberOfMonths: number;
    events: string[];
    button: boolean;
    arrowIcon: string;
    calendarIcon: string;
}

export default class SDatePicker extends SLitElement {
    static get properties() {
        return __SComponentUtils.properties({}, __SDatePickerComponentInterface);
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

    _component = undefined;

    @queryAsync('input')
    _$input;

    @queryAsync('button')
    _$button;

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SDatePickerComponentInterface,
            defaultProps: {},
        });
    }
    async firstUpdated() {
        const $input = await this._$input;
        let $button;
        if (this._component.props.button) $button = await this._$button;

        this._picker = new __pikaday({
            field: $input,
            format: this._component.props.format,
            trigger: $button,
            firstDay: this._component.props.firstDay,
            minDate: this._component.props.minDate,
            maxDate: this._component.props.maxDate,
            disableWeekends: this._component.props.disableWeekends,
            yearRange: this._component.props.yearRange,
            showWeekNumber: this._component.props.showWeekNumber,
            rtl: this._component.props.rtl,
            i18n: this._component.props.i18n,
            numberOfMonths: this._component.props.numberOfMonths,
            events: this._component.props.events,
            defaultDate: this._component.props.value,
            theme: this._component.props.defaultStyle ? 's-pikaday' : '',
            toString(date, format) {
                return __moment(date).format(format);
            },
            parse(dateString, format) {
                return __moment(dateString, format).toDate();
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
            if (cls.match(/^s-ui/)) this._picker.el.classList.add(cls);
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
        return html`
            <div class="${this._component.className('')}">
                <input
                    class="${this._component.className('__input', 's-input')}"
                    type="text"
                    name="${this.name}"
                    autocomplete="off"
                />
                ${this._component.props.button
                    ? html`
                          <button class="${this._component.className('__button', 's-btn')}">
                              ${unsafeHTML(this._component.props.calendarIcon)}
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
export function webcomponent(props: Partial<ISDatePickerComponentProps> = {}, tagName = 's-date-picker') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SDatePicker);
}
