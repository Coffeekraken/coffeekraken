// @ts-nocheck
import { LitElement, html, css, unsafeCSS } from 'lit-element';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __Pickr from '@simonwep/pickr';
import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import __css from '../css/s-color-picker.css';
export default class SColorPicker extends LitElement {
    constructor() {
        super();
        this._component = undefined;
        const _this = this;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SColorPickerComponentInterface,
            defaultProps: {},
        });
    }
    static get properties() {
        return __SComponentUtils.properties({}, __SColorPickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}
        `;
    }
    firstUpdated() {
        var _a, _b, _c, _d;
        const pickr = __Pickr.create({
            el: (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.s-color-picker__preview'),
            theme: 'nano',
            container: (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.s-color-picker__picker-wrapper'),
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
            const hsla = color.toHSLA(), hsva = color.toHSVA(), rgba = color.toRGBA(), hex = color.toHEXA(), cmyk = color.toCMYK();
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
        const $app = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('.pcr-app');
        $app === null || $app === void 0 ? void 0 : $app.classList.add(this._component.className('__picker'));
        const $preview = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('.pickr');
        $preview === null || $preview === void 0 ? void 0 : $preview.classList.add(this._component.className('__preview'));
    }
    // createRenderRoot() {
    //     return this;
    // }
    render() {
        return html `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yUGlja2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yUGlja2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBWSxHQUFHLEVBQUUsU0FBUyxFQUE2QixNQUFNLGFBQWEsQ0FBQztBQUNwRyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFFdEMsT0FBTyxTQUFTLE1BQU0sMENBQTBDLENBQUM7QUFDakUsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFFOUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsVUFBVTtJQWdCaEQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUhaLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFJbkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLFNBQVMsRUFBRSxnQ0FBZ0M7WUFDM0MsWUFBWSxFQUFFLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQztjQUNWLFNBQVM7Y0FDVCxLQUFLO1NBQ1YsQ0FBQztTQUNELENBQUM7SUFDTixDQUFDO0lBWUQsWUFBWTs7UUFDUixNQUFNLEtBQUss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