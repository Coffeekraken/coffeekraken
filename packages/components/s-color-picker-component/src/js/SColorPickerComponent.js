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
            // get rootNode() {
            //     return _this.shadowRoot.querySelector('.s-color-picker');
            // },
            defaultProps: {}
        });
    }
    static get properties() {
        return __SComponentUtils.properties({}, __SColorPickerComponentInterface);
    }
    static get styles() {
        return css `${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}`;
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
                }
            }
        });
        pickr.on('change', (instance) => {
            pickr.applyColor();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yUGlja2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yUGlja2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBWSxHQUFHLEVBQUUsU0FBUyxFQUE0QixNQUFNLGFBQWEsQ0FBQztBQUNsRyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFFdEMsT0FBTyxTQUFTLE1BQU0sMENBQTBDLENBQUM7QUFDakUsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFFOUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsVUFBVTtJQWVoRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBSFosZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUluQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkYsU0FBUyxFQUFFLGdDQUFnQztZQUMzQyxtQkFBbUI7WUFDbkIsZ0VBQWdFO1lBQ2hFLEtBQUs7WUFDTCxZQUFZLEVBQUUsRUFBRTtTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBdkJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBLEdBQUcsU0FBUyxDQUFDO2NBQ2pCLFNBQVM7Y0FDVCxLQUFLO1NBQ1YsQ0FBQyxFQUFFLENBQUM7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