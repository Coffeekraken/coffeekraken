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
    updateInput: (
        | 'pointerdown'
        | 'pointerup'
        | 'pointermove'
        | 'input'
        | 'validate'
        | 'close'
    )[];
    format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
    inline: boolean;
    input: boolean;
    button: boolean;
    copyClass: string;
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
        h: 0,
        s: 0,
        l: 0,
        a: 1,
        metasFormat: 'hex',
        value: undefined,
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

    _isInInteraction = false;

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
    }
    async mount() {
        this._hueColor = new __SColor('#000');
        this._color = new __SColor('#000');
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

        // if alpha is not wanted, make sure to have it to 1 in the state
        if (!this._isAlphaWanted()) {
            this.state.a = 1;
        }

        const value = this.props.value ?? this._$input?.value;
        if (!this.state.value && value) {
            this._color = new __SColor(value);
            if (!this._isAlphaWanted()) {
                this._color.a = 1;
            }
        } else {
            this._color.h = this.state.h;
            this._color.s = this.state.s;
            this._color.l = this.state.l;
            this._color.a = this.state.a;
        }

        // init hue selector
        this._initHueSelector();

        // init alpha selector
        this._updateAlphaSelector();

        // first canvas update
        this._updateShadeCanvas();

        // init selection interactions
        this._initSelectionInteractions();

        // restore state
        this._restoreState();

        // first input update
        this._updateInput('init');
    }

    _updateInput(
        step:
            | 'init'
            | 'pointerdown'
            | 'pointerup'
            | 'pointermove'
            | 'input'
            | 'validate'
            | 'close',
    ) {
        if (step !== 'init' && !this.props.updateInput.includes(step)) {
            return;
        }

        switch (this.props.format) {
            case 'hex':
                this.state.value = this._color.toHexString();
                break;
            case 'hexa':
                this.state.value = this._color.toHexaString();
                break;
            case 'rgb':
                this.state.value = this._color.toRgbString();
                break;
            case 'rgba':
                this.state.value = this._color.toRgbaString();
                break;
            case 'hsl':
                this.state.value = this._color.toHslString();
                break;
            case 'hsla':
                this.state.value = this._color.toHslaString();
                break;
        }

        if (this._$input) {
            this._$input.value = this.state.value;
        }

        this.requestUpdate();
    }

    _restoreState() {
        this._setAlpha(this._color.a);
        this._setHue(this._color.h);
        this._setShade(this._color.s, this._color.l);
    }

    _setMetasFormat(format: 'hex' | 'rgb' | 'hsl'): void {
        this.state.metasFormat = format;
        this.requestUpdate();
    }

    _isAlphaWanted() {
        return this.props.format.includes('a');
    }

    _finalInputValue(): string {
        switch (this.props.format) {
            case 'hex':
                return this._color.toHexString();
            case 'hexa':
                return this._color.toHexa;
        }
    }

    _getPixelFrom($elm, ctx, pos) {
        const bounds = $elm.getBoundingClientRect();
        let x = pos.x - bounds.left;
        let y = pos.y - bounds.top;
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
            this._isInInteraction = true;
            this._$shade.setPointerCapture(e.pointerId);
            this._setShadeFromEvent(e, true);
            this._updateInput('pointerdown');
            this.requestUpdate();
        });
        this._$shade.addEventListener('pointerup', (e) => {
            isShadeDown = false;
            this._isInInteraction = false;
            this._$shade.releasePointerCapture(e.pointerId);
            this._setShadeFromEvent(e, true);
            this._updateInput('pointerup');
            this.requestUpdate();
        });
        this._$shade.addEventListener('pointermove', (e) => {
            if (!isShadeDown) return;
            this._setShadeFromEvent(e, true);
            this._updateInput('pointermove');
        });

        let isAlphaDown = false;
        this._$alpha.addEventListener('pointerdown', (e) => {
            isAlphaDown = true;
            this._isInInteraction = true;
            this._$alpha.setPointerCapture(e.pointerId);
            this._setAlphaFromEvent(e);
            this._updateInput('pointerdown');
            this.requestUpdate();
        });
        this._$alpha.addEventListener('pointerup', (e) => {
            isAlphaDown = false;
            this._isInInteraction = false;
            this._$alpha.releasePointerCapture(e.pointerId);
            this._setAlphaFromEvent(e, true);
            this._updateInput('pointerup');
            this.requestUpdate();
        });
        this._$alpha.addEventListener('pointermove', (e) => {
            if (!isAlphaDown) return;
            this._setAlphaFromEvent(e);
            this._updateInput('pointermove');
        });
    }

    /**
     * This method simply take a pixel and assign it as the new selected color
     */
    _setHueFromEvent(e, saveState = false) {
        const bounds = e.target.getBoundingClientRect();
        const y = e.clientY - bounds.top;
        const pY = 100 - Math.round((100 / bounds.height) * y);
        // apply the opacity to the shade selector
        let hue = 360 - Math.round((360 / 100) * pY);

        // constraint
        if (hue < 0) hue = 0;
        if (hue > 360) hue = 360;

        this._setHue(hue);
        if (saveState) {
            this.state.h = hue;
        }

        // update the shade canvas with the new color
        this._updateShadeCanvas();
        // update the alpha selector
        this._updateAlphaSelector();
        // update the component
        this.requestUpdate();
    }
    _setHue(h: number): void {
        this._color.h = h;
        this.style.setProperty('--s-color-picker-h', h);
    }

    /**
     * Apply the shade (saturation and lightness) when choosing it from the selector
     */
    _setShadeFromEvent(e, toState = false) {
        const bounds = e.target.getBoundingClientRect();
        const y = e.clientY - bounds.top,
            x = e.clientX - bounds.left;
        let pY = 100 - Math.round((100 / bounds.height) * y),
            pX = Math.round((100 / bounds.width) * x);

        // constraint
        if (pY < 0) pY = 0;
        if (pY > 100) pY = 100;
        if (pX < 0) pX = 0;
        if (pX > 100) pX = 100;

        this._setShade(pX, pY);
        if (toState) {
            this.state.s = pX;
            this.state.l = pY;
        }

        // update the shade canvas with the new color
        this._updateShadeCanvas();
        // update the component
        this.requestUpdate();
    }
    _setShade(s: number, l: number): void {
        this._color.s = s;
        this._color.l = l;
        // apply the --s-color-picker-a css variable
        this.style.setProperty('--s-color-picker-s', s);
        this.style.setProperty('--s-color-picker-l', l);
    }

    /**
     * Apply the alpha when choosing it from the selector
     */
    _setAlphaFromEvent(e, saveState = false) {
        const bounds = e.target.getBoundingClientRect();
        const y = e.clientY - bounds.top;
        let pY = 100 - Math.round((100 / bounds.height) * y);

        // contraints
        if (pY < 0) pY = 0;
        if (pY > 100) pY = 100;

        // apply the opacity to the shade selector
        this._setAlpha(pY / 100);

        // save to state if needed
        if (saveState) {
            this.state.a = pY / 100;
        }
    }
    _setAlpha(a: number): void {
        this._$shade.style.opacity = a;
        // apply the --s-color-picker-a css variable
        this.style.setProperty('--s-color-picker-a', a);
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
            this._isInInteraction = true;
            this.requestUpdate();
            this._$hue.setPointerCapture(e.pointerId);
            this._setHueFromEvent(e, true);
            this._updateInput('pointerdown');
        });
        this._$hue.addEventListener('pointerup', (e) => {
            isHueDown = false;
            this._isInInteraction = false;
            this.requestUpdate();
            this._$hue.releasePointerCapture(e.pointerId);
            this._setHueFromEvent(e, true);
            this._updateInput('pointerup');
        });
        this._$hue.addEventListener('pointermove', (e) => {
            if (!isHueDown) return;
            this._setHueFromEvent(e);
            this._updateInput('pointermove');
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
        let gradientH = this._shadeCtx.createLinearGradient(
            0,
            0,
            this._shadeCtx.canvas.width,
            0,
        );

        const newColor = this._color.clone();
        newColor.s = 100;
        newColor.l = 50;

        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, newColor.toHex());
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
                )} ${this.componentUtils.className('')}--${this.props
                    .position} ${this._isInInteraction ? 'is-interacting' : ''}"
            >
                ${!this._hasInput && this.props.input
                    ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="text"
                              autocomplete="off"
                              name="${this.props.name}"
                              value="${this.state.value ?? this.props.value}"
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
                              value="${this.state.value ?? this.props.value}"
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
                <div
                    class="${this.componentUtils.className('__picker')}"
                    tabindex="-1"
                >
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
                            )} ${this._isAlphaWanted() ? 'active' : ''}"
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

                    <div class="${this.componentUtils.className('__metas')}">
                        <button
                            class="${this.componentUtils.className(
                                '__btn',
                            )} ${this.componentUtils.className(
                                '__hex-btn',
                            )} ${this.state.metasFormat === 'hex'
                                ? 'active'
                                : ''}"
                            @click=${() => this._setMetasFormat('hex')}
                        >
                            HEX${this._isAlphaWanted() ? 'A' : ''}
                        </button>
                        <button
                            class="${this.componentUtils.className(
                                '__btn',
                            )} ${this.componentUtils.className(
                                '__rgb-btn',
                            )} ${this.state.metasFormat === 'rgb'
                                ? 'active'
                                : ''}"
                            @click=${() => this._setMetasFormat('rgb')}
                        >
                            RGB${this._isAlphaWanted() ? 'A' : ''}
                        </button>
                        <button
                            class="${this.componentUtils.className(
                                '__btn',
                            )} ${this.componentUtils.className(
                                '__hsl-btn',
                            )} ${this.state.metasFormat === 'hsl'
                                ? 'active'
                                : ''}"
                            @click=${() => this._setMetasFormat('hsl')}
                        >
                            HSL${this._isAlphaWanted() ? 'A' : ''}
                        </button>
                        <input
                            type="text"
                            readonly
                            class="${this.componentUtils.className('__input')}"
                            value="${this.state.metasFormat === 'hex'
                                ? this._isAlphaWanted()
                                    ? this._color.toHexaString()
                                    : this._color.toHexString()
                                : this.state.metasFormat === 'rgb'
                                ? this._isAlphaWanted()
                                    ? this._color.toRgbaString()
                                    : this._color.toRgbString()
                                : this._isAlphaWanted()
                                ? this._color.toHslaString()
                                : this._color.toHslString()}"
                        />
                        <div
                            class="${this.componentUtils.className(
                                '__preview',
                            )} "
                        >
                            ${this.props.copyClass
                                ? html`
                                      <i class="${this.props.copyClass}"></i>
                                  `
                                : ''}
                        </div>
                    </div>
                    <div class="${this.componentUtils.className('__actions')}">
                        <button
                            class="${this.componentUtils.className(
                                '__reset',
                                's-btn s-color--complementary',
                            )}"
                            @click=${() => this._reset()}
                        >
                            ${this.props.i18n.reset ?? 'Reset'}
                        </button>
                        <button
                            class="${this.componentUtils.className(
                                '__clear',
                                's-btn s-color--complementary',
                            )}"
                            @click=${() => this._clear()}
                        >
                            ${this.props.i18n.clear ?? 'Clear'}
                        </button>
                        <button
                            class="${this.componentUtils.className(
                                '__validate',
                                's-btn s-color--accent',
                            )}"
                            @click=${() => this._validate()}
                        >
                            ${this.props.i18n.validate ?? 'Validate'}
                        </button>
                    </div>
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
