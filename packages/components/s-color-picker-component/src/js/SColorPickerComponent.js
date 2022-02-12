// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __Pickr from '@simonwep/pickr';
import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-color-picker.css';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name                Color Picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SColorPickerComponentInterface.js
 * @menu                Styleguide / Forms              /styleguide/form/s-color-picker
 * @platform            html
 * @status              beta
 *
 * This component specify a color picker. It uses under the hood the **AMAZING Pickr library** with some additional features like
 * sugar theming support as well as some events and more.
 * Almost all the Pickr options are available through properties. Check out the api documentation for more details...
 *
 * @feature           All the Pickr features are supported
 * @feature           Full support for sugar theming system for easy integration
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install         bash
 * npm i @coffeekraken/s-color-picker-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-color-picker-component';
 * define();
 *
 * @event           change              Emitted when the color is changing inside the picker
 * @event           show                Emitted when the color picker is shown
 * @event           hide                Emitted when the color picker is hided
 *
 * @example         html            Simple input
 * <s-color-picker value="#FABB03" placeholder="Select a color" input></s-color-picker>
 *
 * @example         html            With an input and a button
 * <s-color-picker value="#5101FF" placeholder="Select a color" input button></s-color-picker>
 *
 * @example         html            Just a button
 * <s-color-picker value="#55FFFF" button></s-color-picker>
 *
 * @example         html            With a custom input
 * <s-color-picker>
 *      <input type="text" placeholder="Select a color" value="#FABB03" />
 * </s-color-picker>
 *
 * @example         html            With a custom button
 * <s-color-picker>
 *      <button class="s-btn s-color:error">Select a color</button>
 * </s-color-picker>
 *
 * @example         html            With a custom input and button
 * <s-color-picker>
 *      <input type="text" placeholder="Select a color" value="#FABB03" />
 *      <button class="s-btn s-color:error">Select a color</button>
 * </s-color-picker>
 *
 * @example         html            With a custom button
 * <s-color-picker>
 *      <button class="s-btn s-color:error">Select a color</button>
 * </s-color-picker>
 *
 * @example         html            Disabled
 * <s-color-picker disabled input button>
 * </s-color-picker>
 *
 * @example         html            RTL
 * <s-color-picker value="#FABB03" placeholder="Select a color" input button dir="rtl"></s-color-picker>
 *
 * @see             https://www.npmjs.com/package/@simonwep/pickr
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SColorPicker extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SColorPickerComponentInterface,
            },
        }));
        this._hasInput = false;
        this._hasButton = false;
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._hasButton = this._$button !== null;
    }
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
    firstUpdated() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            this._$root = this.querySelector(`.${this.componentUtils.className('')}`);
            // input
            if (!this._$input) {
                this._$input = this.querySelector('input');
            }
            else {
                this._$root.append(this._$input);
            }
            if (!((_a = this._$input) === null || _a === void 0 ? void 0 : _a.hasAttribute('name'))) {
                (_b = this._$input) === null || _b === void 0 ? void 0 : _b.setAttribute('name', this.props.name);
            }
            if (!((_c = this._$input) === null || _c === void 0 ? void 0 : _c.hasAttribute('placeholder'))) {
                (_d = this._$input) === null || _d === void 0 ? void 0 : _d.setAttribute('placeholder', this.props.placeholder);
            }
            if (!((_e = this._$input) === null || _e === void 0 ? void 0 : _e.hasAttribute('autocomplete'))) {
                (_f = this._$input) === null || _f === void 0 ? void 0 : _f.setAttribute('autocomplete', 'off');
            }
            // button
            if (!this._$button) {
                this._$button = this.querySelector('button');
            }
            else {
                this._$root.append(this._$button);
            }
            if (this._$button) {
                this._$button.classList.add(this.componentUtils.className('__button'));
            }
            const value = (_j = (_g = this.props.value) !== null && _g !== void 0 ? _g : (_h = this._$input) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : '#ff0000';
            const pickr = __Pickr.create({
                el: this.querySelector(`.${this.componentUtils.className('__picker')}`),
                theme: 'nano',
                container: this._$root,
                default: value,
                inline: true,
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
            const $preview = this.querySelector('.pcr-button');
            $preview === null || $preview === void 0 ? void 0 : $preview.innerHTML = `
            ${this.colorIcon ? `
                ${this.colorIcon}
            ` : `
                <i class="s-icon s-icon--color"></i>
            `}
        `;
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
            __STheme.applyCurrentColor(value, this._$root);
            pickr.on('change', () => {
                pickr.applyColor();
                const detail = getPickrState();
                const change = new CustomEvent('change', {
                    bubbles: true,
                    detail
                });
                __STheme.applyCurrentColor(detail.hex, this._$root);
                if (this._$input) {
                    this._$input.value = detail.hex;
                }
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
            if (this._$input) {
                this._$input.addEventListener('focus', () => {
                    pickr.show();
                });
                this._$input.addEventListener('change', () => {
                    pickr.setColor(this._$input.value);
                });
            }
            if (this._$button) {
                this._$button.addEventListener('focus', () => {
                    pickr.show();
                });
            }
            const $app = this.querySelector('.pcr-app');
            $app === null || $app === void 0 ? void 0 : $app.classList.add(this.componentUtils.className('__picker'));
        });
    }
    render() {
        return html `
            <div
                class="${this.componentUtils.className('')} ${this.componentUtils.className('')}--${this.props.position}"
            >
                ${!this._hasInput && this.props.input ? html `
                    <input ?disabled=${this.props.disabled} type="text" autocomplete="off" name="${this.props.name}" value="${this.props.value}" placeholder="${this.props.placeholder}" class="${this.componentUtils.className('__input', 's-input')}" />
                ` : !this._hasInput ? html `
                    <input ?disabled=${this.props.disabled} type="hidden" name="${this.props.name}" value="${this.props.value}" />
                ` : ``}
                ${!this._hasButton && this.props.button
            ? html `
                          <button
                                ?disabled=${this.props.disabled} 
                              onclick="return false"
                              class="${this.componentUtils.className('__button', 's-btn')}"
                          >
                              ${this.props.colorIcon ? html `
                                ${staticHTML(this.props.colorIcon)}
                              ` : html `
                                <i class="s-icon s-icon--calendar"></i>
                              `}
                          </button>
                      `
            : ''}
                <div class="${this.componentUtils.className('__picker')}"></div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-color-picker') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SColorPicker);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yUGlja2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yUGlja2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFDOUMsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUcxRixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQWM3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0VHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsZUFBZTtJQW9CckQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLFNBQVMsRUFBRSxnQ0FBZ0M7YUFDOUM7U0FDSixDQUFDLENBQ0wsQ0FBQztRQWhCTixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFpQmYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUM7SUFFN0MsQ0FBQztJQXBDRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLGdDQUFnQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUM7Y0FDVixTQUFTO2NBQ1QsS0FBSztTQUNWLENBQUM7U0FDRCxDQUFDO0lBQ04sQ0FBQztJQTBCSyxZQUFZOzs7WUFFZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUUsUUFBUTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLENBQUMsQ0FBQSxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQSxFQUFFO2dCQUNyQyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBLEVBQUU7Z0JBQzVDLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3JFO1lBQ0QsSUFBSSxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUEsRUFBRTtnQkFDN0MsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsU0FBUztZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQzVDLENBQUM7YUFDTDtZQUVELE1BQU0sS0FBSyxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUNBQUksTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxLQUFLLG1DQUFJLFNBQVMsQ0FBQztZQUNuRSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUN6QixFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZFLEtBQUssRUFBRSxNQUFNO2dCQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDdEIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsTUFBTSxFQUFFLElBQUk7Z0JBQ1oseUJBQXlCO2dCQUN6QixVQUFVLEVBQUUsS0FBSztnQkFDakIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osVUFBVSxFQUFFO29CQUNSLE9BQU8sRUFBRSxJQUFJO29CQUNiLE9BQU8sRUFBRSxJQUFJO29CQUNiLEdBQUcsRUFBRSxJQUFJO29CQUNULFdBQVcsRUFBRTt3QkFDVCxHQUFHLEVBQUUsSUFBSTt3QkFDVCxJQUFJLEVBQUUsSUFBSTt3QkFDVixJQUFJLEVBQUUsSUFBSTt3QkFDVixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsS0FBSyxFQUFFLElBQUk7d0JBQ1gsS0FBSyxFQUFFLElBQUk7d0JBQ1gsYUFBYTtxQkFDaEI7aUJBQ0o7YUFDSixDQUFDLENBQUM7WUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25ELFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxTQUFTLEdBQUc7Y0FDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7a0JBQ2IsSUFBSSxDQUFDLFNBQVM7YUFDbkIsQ0FBQyxDQUFDLENBQUM7O2FBRUg7U0FDSixDQUFDO1lBRUYsU0FBUyxhQUFhO2dCQUNsQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFDdkIsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFDckIsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFDckIsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFDcEIsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFMUIsT0FBTztvQkFDSCxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDeEIsSUFBSSxFQUFFO3dCQUNGLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLE1BQU0sRUFBRSxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRztxQkFDOUQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLE1BQU0sRUFBRSxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRztxQkFDOUQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLE1BQU0sRUFBRSxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRztxQkFDOUQ7b0JBQ0QsR0FBRyxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLElBQUksRUFBRTt3QkFDRixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDVixDQUFDLEVBQUUsSUFB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