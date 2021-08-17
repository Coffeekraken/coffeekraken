// @ts-nocheck

import { LitElement, html, property, css, unsafeCSS, query, queryAssignedNodes } from 'lit-element';
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
        return css`
            ${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}
        `;
    }

    _component = undefined;

    constructor() {
        super();
        const _this = this;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SColorPickerComponentInterface,
            defaultProps: {},
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
                },
            },
        });

        function getPickrState() {
            const color = pickr.getColor();
            const hsla = color.toHSLA(),
                hsva = color.toHSVA(),
                rgba = color.toRGBA(),
                hex = color.toHEXA(),
                cmyk = color.toCMYK();

            return {
                isOpened: pickr.isOpen(),
                hsla: {
                    h: hsla[0],
                    s: hsla[1],
                    l: hsla[2],
                    a: hsla[3],
                    string: `hsla(${hsla[0]},${hsla[1]},${hsla[2]},${hsla[3]})`,
                },
                hsva: {
                    h: hsva[0],
                    s: hsva[1],
                    v: hsva[2],
                    a: hsva[3],
                    string: `hsva(${hsva[0]},${hsva[1]},${hsva[2]},${hsva[3]})`,
                },
                rgba: {
                    r: rgba[0],
                    g: rgba[1],
                    b: rgba[2],
                    a: rgba[3],
                    string: `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`,
                },
                hex: hex.toString(),
                cmyk: {
                    c: cmyk[0],
                    m: cmyk[1],
                    y: cmyk[2],
                    k: cmyk[3],
                    string: `cmyk(${cmyk[0]},${cmyk[1]},${cmyk[2]},${cmyk[3]})`,
                },
            };
        }

        pickr.on('change', () => {
            pickr.applyColor();
            const detail = getPickrState();
            const change = new CustomEvent('change', {
                detail,
            });
            this.dispatchEvent(change);
        });
        pickr.on('show', () => {
            const detail = getPickrState();
            const change = new CustomEvent('show', {
                detail,
            });
            this.dispatchEvent(change);
        });
        pickr.on('hide', () => {
            const detail = getPickrState();
            const change = new CustomEvent('hide', {
                detail,
            });
            this.dispatchEvent(change);
        });
        pickr.on('cancel', () => {
            const detail = getPickrState();
            const change = new CustomEvent('cancel', {
                detail,
            });
            this.dispatchEvent(change);
        });

        const $app = this.shadowRoot?.querySelector('.pcr-app');
        $app?.classList.add(this._component.className('__picker'));

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
