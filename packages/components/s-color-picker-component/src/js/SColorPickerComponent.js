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
 * @install             npm i @coffeekraken/s-color-picker-component
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
 * @event           change              Emitted when the color is changing inside the picker
 * @event           show                Emitted when the color picker is shown
 * @event           hide                Emitted when the color picker is hided
 *
 * @example         html            Simple input
 * <s-color-picker value="#FABB03" input></s-color-picker>
 *
 * @example         html            With an input and a button
 * <s-color-picker value="#5101FF" input button></s-color-picker>
 *
 * @example         html            Just a button
 * <s-color-picker value="#55FFFF" button></s-color-picker>
 *
 * @example         html            With a custom input
 * <s-color-picker>
 *      <input type="text" placeholder="Enter a color..." value="#FABB03" />
 * </s-color-picker>
 *
 * @example         html            RTL
 * <s-color-picker value="#FABB03" input button dir="rtl"></s-color-picker>
 *
 * @example         js
 * import { define } from '@coffeekraken/s-color-picker-component';
 * define();
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
                    <input type="text" autocomplete="off" name="${this.props.name}" value="${this.props.value}" placeholder="${this.props.placeholder}" class="${this.componentUtils.className('__input', 's-input')}" />
                ` : !this._hasInput ? html `
                    <input type="hidden" name="${this.props.name}" value="${this.props.value}" />
                ` : ``}
                ${!this._hasButton && this.props.button
            ? html `
                          <button
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yUGlja2VyQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yUGlja2VyQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxLQUFLLE1BQU0sMkJBQTJCLENBQUM7QUFDOUMsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQUcxRixPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQU83Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrREc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQWEsU0FBUSxlQUFlO0lBb0JyRDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLGdDQUFnQzthQUM5QztTQUNKLENBQUMsQ0FDTCxDQUFDO1FBaEJOLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWlCZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFD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TUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO3FCQUM5RDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO3FCQUM5RDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1YsTUFBTSxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO3FCQUM5RDtvQkFDRCxHQUFHLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRTtvQkFDbkIsSUFBSSxFQUFFO3dCQUNGLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNW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