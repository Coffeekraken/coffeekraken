// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __Pickr from '@simonwep/pickr';
import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-color-picker.css';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
import __wait from '@coffeekraken/sugar/shared/time/wait';

export interface ISColorPickerComponentProps {
    name: string;
    value: string;
}

/**
 * @name                Color Picker
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SColorPickerComponentInterface.js
 * @menu                Styleguide / Forms              /styleguide/forms/s-color-picker
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
 * @example         html
 * <label class="s-label s-mb--30">
 *      Simply color picker
 *      <s-color-picker></s-color-picker>
 * </label>
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
    static get properties() {
        return __SLitComponent.properties({}, __SColorPickerComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
            ${__baseCss}
            ${__css}
        `)}
        `;
    }

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SColorPickerComponentInterface,
                },
            }),
        );
    }
    async firstUpdated() {
        await __wait(100);

        const $input = this.querySelector('input');
        const value = this.props.value ?? $input?.value ?? '#ff0000';

        const $container = this.querySelector(
            `.${this.componentUtils.className('')}`,
        );

        if ($input) {
            $container.prepend($input);
            $input.classList.add(this.componentUtils.className('__input'));
        }

        const pickr = __Pickr.create({
            el: this.querySelector('.s-color-picker__preview'),
            theme: 'nano', // or 'monolith', or 'nano'
            container: this.querySelector('.s-color-picker__picker-wrapper'),
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

        setTimeout(() => {
            pickr.setColor(value);
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
            if ($input) {
                $input.value = detail.hex;
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

        if ($input) {
            $input.addEventListener('focus', () => {
                pickr.show();
            });
            $input.addEventListener('change', () => {
                pickr.setColor($input.value);
            });
        }

        const $app = this.querySelector('.pcr-app');
        $app?.classList.add(this.componentUtils.className('__picker'));

        const $preview = this.querySelector('.pickr');
        $preview?.classList.add(this.componentUtils.className('__preview'));
    }
    render() {
        return html`
            <div
                class="${this.componentUtils.className(
                    '',
                )} ${this.componentUtils.className('')}--${this.props.position}"
            >
                <div
                    class="${this.componentUtils.className('__picker-wrapper')}"
                ></div>
                <div
                    class="${this.componentUtils.className('__preview')}"
                ></div>
            </div>
        `;
    }
}

export function define(
    props: Partial<ISColorPickerComponentProps> = {},
    tagName = 's-color-picker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SColorPicker);
}
