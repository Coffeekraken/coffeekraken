// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __Pickr from '@simonwep/pickr';
import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import { css, html, unsafeCSS } from 'lit';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __whenInteract from '@coffeekraken/sugar/js/dom/detect/whenInteract';
import __STheme from '@coffeekraken/s-theme';

// @ts-ignore
import __css from '../../../../src/css/s-color-picker.css'; // relative to /dist/pkg/esm/js

export interface ISColorPickerComponentProps {
    name: string;
    value: string;
    placeholder: string;
    theme: 'nano' | 'monolith';
    input: boolean;
    button: boolean;
    position: 'top' | 'bottom';
    swatches: string[];
    disabled: boolean;
}

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
 * <label class="s-label:responsive">
 *      Choose a color
 *      <s-color-picker value="#FABB03" placeholder="Choose a color" input></s-color-picker>
 * </label>
 *
 * @example         html            With an input and a button
 * <label class="s-label:responsive">
 *      Choose a color
 *      <s-color-picker value="#5101FF" placeholder="Choose a color" input button></s-color-picker>
 * </label>
 *
 * @example         html            Just a button
 * <label class="s-label:responsive">
 *      Choose a color
 *      <s-color-picker value="#55FFFF" button></s-color-picker>
 * </label>
 *
 * @example         html            With a custom input
 * <label class="s-label:responsive">
 *      Choose a color
 *      <s-color-picker>
 *          <input type="text" placeholder="Choose a color" value="#FABB03" />
 *      </s-color-picker>
 * </label>
 *
 * @example         html            With a custom button
 * <label class="s-label:responsive">
 *      Choose a color
 *      <s-color-picker>
 *          <button class="s-btn s-color:error">Choose a color</button>
 *      </s-color-picker>
 * </label>
 *
 * @example         html            With a custom input and button
 * <label class="s-label:responsive">
 *      Choose a color
 *      <s-color-picker>
 *          <input type="text" placeholder="Choose a color" value="#FABB03" />
 *          <button class="s-btn s-color:error">Choose a color</button>
 *      </s-color-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive">
 *      Choose a color
 *      <s-color-picker disabled input button></s-color-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive" dir="rtl">
 *      Choose a color
 *      <s-color-picker value="#FABB03" placeholder="Choose a color" input button dir="rtl"></s-color-picker>
 * </label>
 *
 * @see             https://www.npmjs.com/package/@simonwep/pickr
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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

    _hasInput = false;
    _hasButton = false;
    _$input;
    _$button;
    _$root;

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

        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._hasButton = this._$button !== null;
    }
    async firstUpdated() {
        this._$root = this.querySelector(
            `.${this.componentUtils.className('')}`,
        );

        // input
        if (!this._$input) {
            this._$input = this.querySelector('input');
        } else {
            this._$root.append(this._$input);
        }
        if (!this._$input?.hasAttribute('name')) {
            this._$input?.setAttribute('name', this.props.name);
        }
        if (!this._$input?.hasAttribute('placeholder')) {
            this._$input?.setAttribute('placeholder', this.props.placeholder);
        }
        if (!this._$input?.hasAttribute('autocomplete')) {
            this._$input?.setAttribute('autocomplete', 'off');
        }

        // button
        if (!this._$button) {
            this._$button = this.querySelector('button');
        } else {
            this._$root.append(this._$button);
        }
        if (this._$button) {
            this._$button.classList.add(
                this.componentUtils.className('__button'),
            );
        }

        const value = this.props.value ?? this._$input?.value ?? '#ff0000';
        const pickr = __Pickr.create({
            el: this.querySelector(
                `.${this.componentUtils.className('__picker')}`,
            ),
            theme: 'nano', // or 'monolith', or 'nano'
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
        if ($preview) {
            $preview.innerHTML = `
                ${
                    this.colorIcon
                        ? `
                    ${this.colorIcon}
                `
                        : `
                    <i class="s-icon s-icon--color"></i>
                `
                }
            `;
        }

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

        __STheme.applyCurrentColor(value, this._$root);

        pickr.on('change', () => {
            pickr.applyColor();
            const detail = getPickrState();

            const change = new CustomEvent('change', {
                bubbles: true,
                detail,
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
        $app?.classList.add(this.componentUtils.className('__picker'));
    }
    render() {
        return html`
            <div
                class="${this.componentUtils.className(
                    '',
                )} ${this.componentUtils.className('')}--${this.props.position}"
            >
                ${!this._hasInput && this.props.input
                    ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="text"
                              autocomplete="off"
                              name="${this.props.name}"
                              value="${this.props.value}"
                              placeholder="${this.props.placeholder}"
                              class="${this.componentUtils.className(
                                  '__input',
                                  's-input',
                              )}"
                          />
                      `
                    : !this._hasInput
                    ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${this.props.value}"
                          />
                      `
                    : ``}
                ${!this._hasButton && this.props.button
                    ? html`
                          <button
                              ?disabled=${this.props.disabled}
                              onclick="return false"
                              class="${this.componentUtils.className(
                                  '__button',
                                  's-btn',
                              )}"
                          >
                              ${this.props.colorIcon
                                  ? html` ${staticHTML(this.props.colorIcon)} `
                                  : html`
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

export function define(
    props: Partial<ISColorPickerComponentProps> = {},
    tagName = 's-color-picker',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SColorPicker);
}
