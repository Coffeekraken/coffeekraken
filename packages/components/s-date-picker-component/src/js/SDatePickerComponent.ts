// @ts-nocheck

import { LitElement, html, property, css, unsafeCSS, queryAsync } from 'lit-element/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __pikaday from 'pikaday';

import __moment from 'moment';

import __css from '../css/s-date-picker.css';
import __baseCss from 'pikaday/css/pikaday.css';

export default class SDatePicker extends LitElement {
    static get properties() {
        return __SComponentUtils.properties({}, __SDatePickerComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
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
                              ${unsafeHTML(this._component.props.icon)}
                          </button>
                      `
                    : ''}
            </div>
        `;
    }
}

export function webcomponent(tagName = 's-date-picker') {
    customElements.define(tagName, SDatePicker);
}
