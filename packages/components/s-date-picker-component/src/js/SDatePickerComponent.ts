// @ts-nocheck

import { LitElement, html, property, css, unsafeCSS, queryAsync } from 'lit-element';
import __SDatePickerComponentInterface from './interface/SDatePickerComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __pikaday from 'pikaday';

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

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SDatePickerComponentInterface,
            defaultProps: {},
        });
    }
    async firstUpdated() {
        const $input = await this._$input;
        console.log($input);

        this._picker = new __pikaday({ field: $input });
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html`
            <div class="${this._component.className('')}">
                <input class="${this._component.className('__input', 's-input')}" type="text" name="${this.name}" />
            </div>
        `;
    }
}

export function webcomponent(tagName = 's-date-picker') {
    customElements.define(tagName, SDatePicker);
}
