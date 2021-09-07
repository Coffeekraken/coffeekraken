// @ts-nocheck
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __Pickr from '@simonwep/pickr';
import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-color-picker.css';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
export default class SColorPicker extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, __SColorPickerComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}
        `;
    }
    constructor() {
        super(__deepMerge({
            sLitComponent: {
                interface: __SColorPickerComponentInterface,
            },
        }));
    }
    firstUpdated() {
        var _a, _b, _c, _d;
        const pickr = __Pickr.create({
            el: (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.s-color-picker__preview'),
            theme: 'nano',
            container: (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.s-color-picker__picker-wrapper'),
            default: this.props.value,
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
        $app === null || $app === void 0 ? void 0 : $app.classList.add(this.componentUtils.className('__picker'));
        const $preview = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('.pickr');
        $preview === null || $preview === void 0 ? void 0 : $preview.classList.add(this.componentUtils.className('__preview'));
    }
    render() {
        return html `
            <div class="${this.componentUtils.className('')}">
                <div class="${this.componentUtils.className('__picker-wrapper')}"></div>
                <div class="${this.componentUtils.className('__preview')}"></div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-color-picker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SColorPicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yUGlja2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yUGlja2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFDOUMsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQU8xRixNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxlQUFlO0lBQ3JELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQztjQUNWLFNBQVM7Y0FDVCxLQUFLO1NBQ1YsQ0FBQztTQUNELENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsYUFBYSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxnQ0FBZ0M7YUFDOUM7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFDRCxZQUFZOztRQUNSLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDekIsRUFBRSxFQUFFLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsYUFBYSxDQUFDLDBCQUEwQixDQUFDO1lBQzlELEtBQUssRUFBRSxNQUFNO1lBQ2IsU0FBUyxFQUFFLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsYUFBYSxDQUFDLGlDQUFpQyxDQUFDO1lBQzVFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDekIseUJBQXlCO1lBQ3pCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEdBQUcsRUFBRSxJQUFJO2dCQUNULFdBQVcsRUFBRTtvQkFDVCxHQUFHLEVBQUUsSUFBSTtvQkFDVCxJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsSUFBSTtvQkFDVixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsS0FBSyxFQUFFLElBQUk7b0JBQ1gsS0FBSyxFQUFFLElBQUk7b0JBQ1gsYUFBYTtpQkFDaEI7YUFDSjtTQUNKLENBQUMsQ0FBQztRQUVILFNBQVMsYUFBYTtZQUNsQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUN2QixJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUNyQixJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUNyQixHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUNwQixJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRTFCLE9BQU87Z0JBQ0gsUUFBUSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksRUFBRTtvQkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQzlEO2dCQUNELElBQUksRUFBRTtvQkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQzlEO2dCQUNELElBQUksRUFBRTtvQkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUc7aUJBQzlEO2dCQUNELEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUNuQixJQUFJLEVBQUU7b0JBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUks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