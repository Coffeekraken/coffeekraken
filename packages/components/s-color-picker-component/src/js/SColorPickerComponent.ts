// @ts-nocheck

import __SColor from '@coffeekraken/s-color';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __baseCss from '@simonwep/pickr/dist/themes/nano.min.css';
import { css, html, unsafeCSS } from 'lit';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';

// @ts-ignore
// import __css from '../../../../src/css/s-color-picker.css'; // relative to /dist/pkg/esm/js
import __css from '../css/s-color-picker.css'; // for dev

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
 * @name                SColorPickerComponent
 * @as                Color Picker
 * @WIP-namespace           js
 * @type                CustomElement
 * @interface           ./interface/SColorPickerComponentInterface.ts
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
        return __SLitComponent.createProperties(
            {},
            __SColorPickerComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
            `)}
        `;
    }

    state = {
        hueR: 0,
        hueG: 0,
        hueB: 0,
        r: 0,
        g: 0,
        b: 0,
        a: 1,
    };

    _hasInput = false;
    _hasButton = false;
    _$input;
    _$button;
    _$shade;
    _$hue;
    _$alpha;
    _$root;

    _shadeCtx;
    _hueCtx;
    _alphaCtx;
    _hueColor;
    _color;

    constructor() {
        super(
            __deepMerge({
                shadowDom: false,
                interface: __SColorPickerComponentInterface,
            }),
        );

        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._hasButton = this._$button !== null;

        this._hueColor = new __SColor({
            r: this.state.hueR,
            g: this.state.hueG,
            b: this.state.hueB,
        });
        this._color = new __SColor(this.state);
    }
    async firstUpdated() {
        this._$root = this.querySelector(
            `.${this.componentUtils.className('')}`,
        );

        // shade
        this._$shade = this.querySelector(
            `.${this.componentUtils.className(`__shade`)}`,
        );
        this._shadeCtx = this._$shade.getContext('2d');

        // hue
        this._$hue = this.querySelector(
            `.${this.componentUtils.className(`__hue`)}`,
        );
        this._hueCtx = this._$hue.getContext('2d');

        // alpha
        this._$alpha = this.querySelector(
            `.${this.componentUtils.className(`__alpha`)}`,
        );
        this._alphaCtx = this._$alpha.getContext('2d');

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

        // // handle form reset
        // this._$input?.form?.addEventListener('reset', () => {
        //     setTimeout(() => {
        //         __STheme.applyCurrentColor(this._$input?.value, this._$root);
        //     });
        // });

        // // apply selected color
        // this._$input?.addEventListener('change', (e) => {
        //     __STheme.applyCurrentColor(e.target.value, this._$root);
        // });

        const value = this.props.value ?? this._$input?.value ?? '#ff0000';
        // const pickr = __Pickr.create({
        //     el: this.querySelector(
        //         `.${this.componentUtils.className('__picker')}`,
        //     ),
        //     theme: 'nano', // or 'monolith', or 'nano'
        //     container: this._$root,
        //     default: value,
        //     inline: true,
        //     // autoReposition: false,
        //     comparison: false,
        //     swatches: [],
        //     components: {
        //         preview: true,
        //         opacity: true,
        //         hue: true,
        //         interaction: {
        //             hex: true,
        //             rgba: true,
        //             hsla: true,
        //             // hsva: true,
        //             // cmyk: true,
        //             input: true,
        //             clear: true,
        //             // save: true
        //         },
        //     },
        // });

        // const $preview = this.querySelector('.pcr-button');
        // if ($preview) {
        //     $preview.innerHTML = `
        //         ${
        //             this.colorIcon
        //                 ? `
        //             ${this.colorIcon}
        //         `
        //                 : `
        //             <i class="s-icon s-icon--color"></i>
        //         `
        //         }
        //     `;
        // }

        // function getPickrState() {
        //     const color = pickr.getColor();
        //     const hsla = color.toHSLA(),
        //         hsva = color.toHSVA(),
        //         rgba = color.toRGBA(),
        //         hex = color.toHEXA(),
        //         cmyk = color.toCMYK();

        //     return {
        //         isOpened: pickr.isOpen(),
        //         hsla: {
        //             h: hsla[0],
        //             s: hsla[1],
        //             l: hsla[2],
        //             a: hsla[3],
        //             string: `hsla(${hsla[0]},${hsla[1]},${hsla[2]},${hsla[3]})`,
        //         },
        //         hsva: {
        //             h: hsva[0],
        //             s: hsva[1],
        //             v: hsva[2],
        //             a: hsva[3],
        //             string: `hsva(${hsva[0]},${hsva[1]},${hsva[2]},${hsva[3]})`,
        //         },
        //         rgba: {
        //             r: rgba[0],
        //             g: rgba[1],
        //             b: rgba[2],
        //             a: rgba[3],
        //             string: `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`,
        //         },
        //         hex: hex.toString(),
        //         cmyk: {
        //             c: cmyk[0],
        //             m: cmyk[1],
        //             y: cmyk[2],
        //             k: cmyk[3],
        //             string: `cmyk(${cmyk[0]},${cmyk[1]},${cmyk[2]},${cmyk[3]})`,
        //         },
        //     };
        // }

        // __STheme.applyCurrentColor(value, this._$root);

        // pickr.on('change', () => {
        //     pickr.applyColor();
        //     const detail = getPickrState();

        //     const change = new CustomEvent('change', {
        //         bubbles: true,
        //         detail,
        //     });

        //     if (this._$input) {
        //         this._$input.value = detail.hex;
        //     }
        //     this.dispatchEvent(change);

        //     __STheme.applyCurrentColor(detail.hex, this._$root);
        // });
        // pickr.on('show', () => {
        //     const detail = getPickrState();
        //     const change = new CustomEvent('show', {
        //         detail,
        //     });
        //     this.dispatchEvent(change);
        // });
        // pickr.on('hide', () => {
        //     const detail = getPickrState();
        //     const change = new CustomEvent('hide', {
        //         detail,
        //     });
        //     this.dispatchEvent(change);
        // });
        // pickr.on('cancel', () => {
        //     const detail = getPickrState();
        //     const change = new CustomEvent('cancel', {
        //         detail,
        //     });
        //     this.dispatchEvent(change);
        // });

        // if (this._$input) {
        //     this._$input.addEventListener('focus', () => {
        //         pickr.show();
        //     });
        //     this._$input.addEventListener('change', () => {
        //         pickr.setColor(this._$input.value);
        //     });
        // }
        // if (this._$button) {
        //     this._$button.addEventListener('focus', () => {
        //         pickr.show();
        //     });
        // }

        // init hue selector
        this._initHueSelector();

        // init alpha selector
        this._updateAlphaSelector();

        // first canvas update
        this._updateShadeCanvas();

        // init selection interactions
        this._initSelectionInteractions();
    }

    /**
     * This method simply take the color getted from the canvas picker in rgba format
     */
    _applyColorToState() {
        // Object.assign(this.state, this._hueColor.toObject());
    }

    _getPixelFrom($elm, ctx, event) {
        const bounds = $elm.getBoundingClientRect();
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        const pixel = ctx.getImageData(x, y, 1, 1)['data']; // Read pixel Color
        return pixel;
    }

    /**
     * This method handle the selection process (click, move, etc...)
     */
    _initSelectionInteractions() {
        let isShadeDown = false;
        this._$shade.addEventListener('pointerdown', (e) => {
            isShadeDown = true;
            const pixel = this._getPixelFrom(this._$shade, this._shadeCtx, e);
            this._setColorFromPixel(pixel);
            this._$shade.setPointerCapture(e.pointerId);
        });
        this._$shade.addEventListener('pointerup', (e) => {
            isShadeDown = false;
            this._$shade.releasePointerCapture(e.pointerId);
        });
        this._$shade.addEventListener('pointermove', (e) => {
            if (!isShadeDown) return;
            const pixel = this._getPixelFrom(this._$shade, this._shadeCtx, e);
            this._setColorFromPixel(pixel);
        });

        let isAlphaDown = false;
        this._$alpha.addEventListener('pointerdown', (e) => {
            isAlphaDown = true;
            this._setAlphaFromEvent(e);
            this._$alpha.setPointerCapture(e.pointerId);
        });
        this._$alpha.addEventListener('pointerup', (e) => {
            isAlphaDown = false;
            this._$alpha.releasePointerCapture(e.pointerId);
        });
        this._$alpha.addEventListener('pointermove', (e) => {
            if (!isAlphaDown) return;
            this._setAlphaFromEvent(e);
        });
    }

    /**
     * This method simply take a pixel and assign it as the new selected color
     */
    _setColorFromPixel(pixel) {
        this._color.r = pixel[0];
        this._color.g = pixel[1];
        this._color.b = pixel[2];

        this._applyColorToState();
        // update the component
        this.requestUpdate();
    }

    /**
     * This method simply take a pixel and assign it as the new selected color
     */
    _setHueColorFromPixel(pixel) {
        this._hueColor.r = pixel[0];
        this._hueColor.g = pixel[1];
        this._hueColor.b = pixel[2];

        this._applyColorToState();
        // update the shade canvas with the new color
        this._updateShadeCanvas();
        // update the alpha selector
        this._updateAlphaSelector();
        // update the component
        this.requestUpdate();
    }

    /**
     * Apply the alpha when choosing it from the selector
     */
    _setAlphaFromEvent(e) {
        const bounds = e.target.getBoundingClientRect();
        const y = e.clientY - bounds.top;
        const pY = 100 - Math.round((100 / bounds.height) * y);
        // apply the opacity to the shade selector
        this._$shade.style.opacity = pY / 100;
    }

    /**
     * This method init the hue selector canvas just at start
     */
    _initHueSelector() {
        const bounds = this._$hue.getBoundingClientRect();

        this._hueCtx.canvas.width = bounds.width;
        this._hueCtx.canvas.height = bounds.height;

        const gradientH = this._hueCtx.createLinearGradient(
            0,
            0,
            0,
            bounds.height,
        );

        gradientH.addColorStop(0, 'rgb(255, 0, 0)'); // red
        gradientH.addColorStop(1 / 6, 'rgb(255, 255, 0)'); // yellow
        gradientH.addColorStop(2 / 6, 'rgb(0, 255, 0)'); // green
        gradientH.addColorStop(3 / 6, 'rgb(0, 255, 255)');
        gradientH.addColorStop(4 / 6, 'rgb(0, 0, 255)'); // blue
        gradientH.addColorStop(5 / 6, 'rgb(255, 0, 255)');
        gradientH.addColorStop(1, 'rgb(255, 0, 0)'); // red
        this._hueCtx.fillStyle = gradientH;
        this._hueCtx.fillRect(0, 0, bounds.width * 3, bounds.height);

        let isHueDown = false;
        this._$hue.addEventListener('pointerdown', (e) => {
            isHueDown = true;
            const pixel = this._getPixelFrom(this._$hue, this._hueCtx, e);
            this._setHueColorFromPixel(pixel);
            this._$hue.setPointerCapture(e.pointerId);
        });
        this._$hue.addEventListener('pointerup', (e) => {
            isHueDown = false;
            this._$hue.releasePointerCapture(e.pointerId);
        });
        this._$hue.addEventListener('pointermove', (e) => {
            if (!isHueDown) return;
            const pixel = this._getPixelFrom(this._$hue, this._hueCtx, e);
            this._setHueColorFromPixel(pixel);
        });
    }

    /**
     * This method init the alpha selector canvas just at start
     */
    _updateAlphaSelector() {
        const bounds = this._$alpha.getBoundingClientRect();

        this._alphaCtx.canvas.width = bounds.width;
        this._alphaCtx.canvas.height = bounds.height;

        const gradientH = this._alphaCtx.createLinearGradient(
            0,
            0,
            0,
            bounds.height,
        );

        gradientH.addColorStop(
            0,
            `rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 1)`,
        );
        gradientH.addColorStop(
            1,
            `rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 0)`,
        );
        this._alphaCtx.fillStyle = gradientH;
        this._alphaCtx.fillRect(0, 0, bounds.width * 3, bounds.height);
    }

    /**
     * This method take care of updating the canvas with the good gradients depending on the picker state
     */
    _updateShadeCanvas() {
        var color = this._hueColor.toRgbString();
        let gradientH = this._shadeCtx.createLinearGradient(
            0,
            0,
            this._shadeCtx.canvas.width,
            0,
        );
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, color);
        this._shadeCtx.fillStyle = gradientH;
        this._shadeCtx.fillRect(
            0,
            0,
            this._shadeCtx.canvas.width,
            this._shadeCtx.canvas.height,
        );

        // Create a Vertical Gradient(white to black)
        let gradientV = this._shadeCtx.createLinearGradient(0, 0, 0, 300);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        this._shadeCtx.fillStyle = gradientV;
        this._shadeCtx.fillRect(
            0,
            0,
            this._shadeCtx.canvas.width,
            this._shadeCtx.canvas.height,
        );
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
                <div class="${this.componentUtils.className('__picker')}">
                    <div
                        class="${this.componentUtils.className('__selectors')}"
                    >
                        <div
                            class="${this.componentUtils.className(
                                '__shade-wrapper',
                            )}"
                        >
                            <div
                                class="${this.componentUtils.className(
                                    '__chest',
                                )}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className(
                                    '__shade',
                                )}"
                            ></canvas>
                        </div>
                        <div
                            class="${this.componentUtils.className(
                                '__hue-wrapper',
                            )}"
                        >
                            <div
                                class="${this.componentUtils.className(
                                    '__chest',
                                )}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className(
                                    '__hue',
                                )}"
                            ></canvas>
                        </div>
                        <div
                            class="${this.componentUtils.className(
                                '__alpha-wrapper',
                            )}"
                        >
                            <div
                                class="${this.componentUtils.className(
                                    '__chest',
                                )}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className(
                                    '__alpha',
                                )}"
                            ></canvas>
                        </div>
                    </div>

                    < ${this._color.toHex()}
                </div>
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
