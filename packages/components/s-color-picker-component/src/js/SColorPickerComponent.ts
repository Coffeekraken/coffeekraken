// @ts-nocheck

import {LitElement, html, property, css, unsafeCSS, query, queryAssignedNodes} from 'lit-element';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __Pickr from '@simonwep/pickr';

import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import __css from '../css/s-color-picker.css';

export default class SColorPicker extends LitElement {

    static get properties() {
        return __SComponentUtils.properties({}, __SColorPickerComponentInterface);
    }

    static get styles() {
        return css`${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}`;
    }

    _component = undefined;

    constructor() {
        super();
        const _this = this;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SColorPickerComponentInterface,
            // get rootNode() {
            //     return _this.shadowRoot.querySelector('.s-color-picker');
            // },
            defaultProps: {}
        });
    }
    firstUpdated() {

        const pickr = __Pickr.create({
            el: this.shadowRoot?.querySelector('.s-color-picker__preview'),
            theme: 'nano', // or 'monolith', or 'nano'
            container: this.shadowRoot?.querySelector('.s-color-picker__picker-wrapper'),
            default: this.color,
            // autoReposition: false,
            comparison: false,
            swatches: [
                // 'rgba(244, 67, 54, 1)',
                // 'rgba(233, 30, 99, 0.95)',
                // 'rgba(156, 39, 176, 0.9)',
                // 'rgba(103, 58, 183, 0.85)',
                // 'rgba(63, 81, 181, 0.8)',
                // 'rgba(33, 150, 243, 0.75)',
                // 'rgba(3, 169, 244, 0.7)',
                // 'rgba(0, 188, 212, 0.7)',
                // 'rgba(0, 150, 136, 0.75)',
                // 'rgba(76, 175, 80, 0.8)',
                // 'rgba(139, 195, 74, 0.85)',
                // 'rgba(205, 220, 57, 0.9)',
                // 'rgba(255, 235, 59, 0.95)',
                // 'rgba(255, 193, 7, 1)'
            ],

            components: {

                // Main components
                preview: true,
                opacity: true,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: true,
                    hsla: true,
                    // hsva: true,
                    // cmyk: true,
                    input: true,
                    clear: true,
                    // save: true
                }
            }
        });

        pickr.on('change', (instance) => {
            pickr.applyColor();
        });

        const $app = this.shadowRoot?.querySelector('.pcr-app');
        $app?.classList.add(this._component.className('__picker'))

        const $preview = this.shadowRoot?.querySelector('.pickr');
        $preview?.classList.add(this._component.className('__preview'));

    }
    // createRenderRoot() {
    //     return this;
    // }
    render() {
        return html`
            <div class="${this._component.className('')}">
                <div class="${this._component.className('__picker-wrapper')}"></div>  
                <div class="${this._component.className('__preview')}"></div>    
            </div>
        `;
    }
}

export function webcomponent(tagName = 's-color-picker') {
    customElements.define(tagName, SColorPicker);
}