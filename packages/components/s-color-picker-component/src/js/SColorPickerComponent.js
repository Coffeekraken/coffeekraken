// @ts-nocheck
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import __Pickr from '@simonwep/pickr';
import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-color-picker.css';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
export default class SColorPicker extends SLitElement {
    constructor() {
        super();
        this._component = undefined;
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                interface: __SColorPickerComponentInterface,
                defaultProps: {},
            },
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
            default: this.value,
            // autoReposition: false,
            comparison: false,
            swatches: [],
            components: {
                preview: true,
                opacity: true,
                hue: true,
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
export function webcomponent(props = {}, tagName = 's-color-picker') {
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SColorPicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yUGlja2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yUGlja2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxPQUFPLE1BQU0saUJBQWlCLENBQUM7QUFDdEMsT0FBTyxTQUFTLE1BQU0sMENBQTBDLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sS0FBSyxNQUFNLDJCQUEyQixDQUFDO0FBQzlDLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFPMUYsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsV0FBVztJQWdCakQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUhaLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFJbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkYsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSxnQ0FBZ0M7Z0JBQzNDLFlBQVksRUFBRSxFQUFFO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXZCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQztjQUNWLFNBQVM7Y0FDVCxLQUFLO1NBQ1YsQ0FBQztTQUNELENBQUM7SUFDTixDQUFDO0lBYUQsWUFBWTs7UUFDUixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3pCLEVBQUUsRUFBRSxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztZQUM5RCxLQUFLLEVBQUUsTUFBTTtZQUNiLFNBQVMsRUFBRSxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQztZQUM1RSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDbkIseUJBQXlCO1lBQ3pCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEdBQUcsRUFBRSxJQUFJO2dCQUNULFdBQVcsRUFBRTtvQkFDVCxHQUFHLEVBQUUsSUFBSTtvQkFDVCxJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsSUFBSTtvQkFDVixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLElBQUk7b0JBQ1gsYUFBYTtpQkFDaEI7YUFDSjtTQUNKLENBQUMsQ0FBQztRQUVILFNBQVMsYUFBYTtZQUNsQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUN2QixJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUNyQixJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUNyQixHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUNwQixJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRTFCLE9BQU87Z0JBQ0gsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksRUFBRTtvQkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQzlEO2dCQUNELElBQUksRUFBRTtvQkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQzlEO2dCQUNELElBQUksRUFBRTtvQkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQzlEO2dCQUNELEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUNuQixJQUFJLEVBQUU7b0JBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO2lCQUM5RDthQUNKLENBQUM7UUFDTixDQUFDO1FBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ3BCLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNuQixNQUFNLE1BQU0sR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JDLE1BQU07YUFDVCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO1lBQ2xCLE1BQU0sTUFBTSxHQUFHLGFBQWEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFDbkMsTUFBTTthQUNULENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsYUFBYSxFQUFFLENBQUM7WUFDL0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO2dCQUNuQyxNQUFNO2FBQ1QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNwQixNQUFNLE1BQU0sR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUMvQixNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JDLE1BQU07YUFDVCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQUcsTUFBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUUzRCxNQUFNLFFBQVEsR0FBRyxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRCx1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLElBQUk7SUFDSixNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7MEJBQ08sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOzhCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQzs4QkFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDOztTQUUzRCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxRQUE4QyxFQUFFLEVBQUUsT0FBTyxHQUFHLGdCQUFnQjtJQUNyRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2pELENBQUMifQ==