// @ts-nocheck

import __SColor from '@coffeekraken/s-color';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __copy } from '@coffeekraken/sugar/clipboard';
import {
    __preventViewportMovement,
    __makeFloat,
} from '@coffeekraken/sugar/dom';
import type {
    IFloatApi,
    IFloatSettings,
} from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import { __isMobile } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-color-picker.css'; // relative to /dist/pkg/esm/js
// import __css from "../css/s-color-picker.css"; // for dev

export interface ISColorPickerComponentProps {
    name: string;
    value: string;
    placeholder: string;
    updateInput: (
        | 'pointerdown'
        | 'pointerup'
        | 'pointermove'
        | 'validate'
        | 'eyedropper'
        | 'reset'
        | 'clear'
        | 'close'
    )[];
    format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
    inline: boolean;
    input: boolean;
    button: boolean;
    eyeDropper: boolean;
    actions: ('clear' | 'reset' | 'validate')[];
    backdrop: boolean;
    floatSettings: Partial<IFloatSettings>;
    copyIconClass: string;
    eyeDropperIconClass: string;
    copiedIconClass: string;
    buttonIconClass: string;
    backdropClass: string;
    position: 'top' | 'bottom';
    disabled: boolean;
}

/**
 * @name                SColorPickerComponent
 * @as                  Color Picker
 * @namespace           js
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
 * @event           s-color-picker.change              Dispatched when the color picker change the input value
 * @event           s-color-picker                       Dispatched for every events of this component. Check the detail.eventType prop for event type
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
 * @example         html            Simple input
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#FABB03" placeholder="Choose a color" input></s-color-picker>
 * </label>
 *
 * @example         html            With an input and a button
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#5101FF" placeholder="Choose a color" input button></s-color-picker>
 * </label>
 *
 * @example         html            With a different format (hsla)
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#5101FF" format="hsla" placeholder="Choose a color" input button></s-color-picker>
 * </label>
 *
 * @example         html            Just a button
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#55FFFF" button></s-color-picker>
 * </label>
 *
 * @example         html            With a custom input
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker>
 *          <input type="text" class="s-input" placeholder="Choose a color" value="#FABB03" />
 *      </s-color-picker>
 * </label>
 *
 * @example         html            With a custom button
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker>
 *          <button class="s-btn s-color:error">Choose a color</button>
 *      </s-color-picker>
 * </label>
 *
 * @example         html            With a custom input and button
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker>
 *          <div class="s-group">
 *              <input type="text" class="s-input" placeholder="Choose a color" value="#FABB03" />
 *              <button class="s-btn s-color:error">Choose a color</button>
 *          </div>
 *      </s-color-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker disabled input button></s-color-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive" dir="rtl">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#FABB03" placeholder="Choose a color" input button dir="rtl"></s-color-picker>
 * </label>
 *
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
    _originalState = {};

    _floatApi: IFloatApi;

    _hasInput = false;
    _hasButton = false;
    _$input;
    _$colorInput;
    _$button;
    _$shade;
    _$hue;
    _$alpha;
    _$root;
    _$picker;

    _shadeCtx;
    _hueCtx;
    _alphaCtx;
    _hueColor;
    _inputColor;
    _color;

    _isShadeInInteraction = false;
    _isAlphaInInteraction = false;
    _isHueInInteraction = false;

    constructor() {
        super(
            __deepMerge({
                name: 's-color-picker',
                interface: __SColorPickerComponentInterface,
            }),
        );
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        this._$button?.addEventListener('pointerup', (e) => e.preventDefault());
        this._hasButton = this._$button !== null;
    }
    async mount() {
        this._hueColor = new __SColor('#000');
        this._color = new __SColor('#000');

        // save the original state
        Object.assign(this._originalState, this.state);
    }
    async firstUpdated() {
        this._$root = this.querySelector(
            `.${this.componentUtils.className('__root')}`,
        );

        this._$picker = this.querySelector(
            `.${this.componentUtils.className('__picker')}`,
        );

        // metas input
        this._$colorInput = this.querySelector(
            `.${this.componentUtils.className('__color-input')}`,
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
            // this._$root.append(this._$input);
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
        this._$input.setAttribute('readonly', true);

        // update float on focus
        this.addEventListener('focusin', (e) => {
            this._floatApi?.update();
        });

        __preventViewportMovement(
            this.querySelector('.s-color-picker__selectors'),
        );
        __preventViewportMovement(this.querySelector('.s-color-picker__metas'));

        // handle form reset
        // this._$input?.form?.addEventListener('reset', () => {
        //     setTimeout(() => {
        //         __STheme.applyCurrentColor(this._$input?.value, this._$root);
        //     });
        // });

        // if alpha is not wanted, make sure to have it to 1 in the state
        if (!this._isAlphaWanted()) {
            this.state.a = 1;
        }

        // init the color
        this._initColor();

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

        // make the panel float
        if (!this.props.inline && !__isMobile()) {
            this._floatApi = __makeFloat(
                this._$picker,
                this._$root,
                this.props.floatSettings,
            );
        }
    }

    _initColor() {
        const value = this.props.value ?? this._$input?.value;

        // save the input color to be able to clear correctly
        if (value) {
            this._inputColor = new __SColor(value);
        }

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
    }

    _updateInput(
        step:
            | 'init'
            | 'pointerdown'
            | 'pointerup'
            | 'pointermove'
            | 'validate'
            | 'eyedropper'
            | 'reset'
            | 'clear'
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

        if (this._$input && this._$input.value !== this.state.value) {
            this._$input.value = this.state.value;
        }

        // dispatch a "change" event
        if (step !== 'init') {
            this.componentUtils.dispatchEvent('change', {
                detail: this._color.toObject(),
            });
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
        return false;
    }

    _validate() {
        this._updateInput('validate');
        document.activeElement?.blur?.();
    }
    _clear() {
        if (this._inputColor) {
            this._setAlpha(this._inputColor.a);
            this._setHue(this._inputColor.h);
            this._setShade(this._inputColor.s, this._inputColor.l);
        } else {
            this._setAlpha(1);
            this._setHue(0);
            this._setShade(0, 0);
        }
        this._updateInput('clear');
    }
    _reset() {
        this._setAlpha(this._originalState.a);
        this._setHue(this._originalState.h);
        this._setShade(this._originalState.s, this._originalState.l);
        this._updateInput('reset');
    }

    _isAlphaWanted() {
        return this.props.format.includes('a');
    }

    /**
     * This method handle the selection process (click, move, etc...)
     */
    _initSelectionInteractions() {
        let isShadeDown = false;
        this._$shade.addEventListener('pointerdown', (e) => {
            isShadeDown = true;
            this._isShadeInInteraction = true;
            this._$shade.setPointerCapture(e.pointerId);
            this._setShadeFromEvent(e, false);
            this._updateInput('pointerdown');
            this.requestUpdate();
        });
        this._$shade.addEventListener('pointermove', (e) => {
            e.preventDefault();
            if (!isShadeDown) return;
            this._setShadeFromEvent(e, false);
            this._updateInput('pointermove');
        });
        this._$shade.addEventListener('pointerup', (e) => {
            isShadeDown = false;
            this._isShadeInInteraction = false;
            this._$shade.releasePointerCapture(e.pointerId);
            this._setShadeFromEvent(e, true);
            this._updateInput('pointerup');
            this.requestUpdate();
        });

        // prevent viewport movements
        // __preventViewportMovement(this._$shade);

        let isAlphaDown = false;
        this._$alpha.addEventListener('pointerdown', (e) => {
            isAlphaDown = true;
            this._isAlphaInInteraction = true;
            this._$alpha.setPointerCapture(e.pointerId);
            this._setAlphaFromEvent(e, false);
            this._updateInput('pointerdown');
            this.requestUpdate();
        });
        this._$alpha.addEventListener('pointermove', (e) => {
            e.preventDefault();
            if (!isAlphaDown) return;
            this._setAlphaFromEvent(e, false);
            this._updateInput('pointermove');
        });
        this._$alpha.addEventListener('pointerup', (e) => {
            isAlphaDown = false;
            this._isAlphaInInteraction = false;
            this._$alpha.releasePointerCapture(e.pointerId);
            this._setAlphaFromEvent(e, true);
            this._updateInput('pointerup');
            this.requestUpdate();
        });

        // prevent viewport movements
        // __preventViewportMovement(this._$alpha);
    }

    /**
     * This method simply take a pixel and assign it as the new selected color
     */
    _setHueFromEvent(e, saveState = true) {
        const bounds = e.target.getBoundingClientRect();
        const y = e.clientY - bounds.top;
        const pY = 100 - Math.round((100 / bounds.height) * y);
        // apply the opacity to the shade selector
        let hue = 360 - Math.round((360 / 100) * pY);

        // constraint
        if (hue < 0) hue = 0;
        if (hue > 360) hue = 360;

        // set the hue
        this._setHue(hue, saveState);
    }
    _setHue(h: number, saveState = true): void {
        // save in state if wanted
        if (saveState) {
            this.state.h = h;
        }
        // set the actual color
        this._color.h = h;
        // set the css variable
        this.style.setProperty('--s-color-picker-h', h);
        // update the shade canvas with the new color
        this._updateShadeCanvas();
        // update the alpha selector
        this._updateAlphaSelector();
        // update the component
        this.requestUpdate();
    }

    /**
     * Apply the shade (saturation and lightness) when choosing it from the selector
     */
    _setShadeFromEvent(e, saveState = true) {
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

        this._setShade(pX, pY * 0.5, saveState);
    }
    _setShade(s: number, l: number, saveState = true): void {
        // calculate lighten correctly
        let lightness = l + (100 - s) / 2;
        lightness *= (l * 2) / 100;
        let saturation = s;

        // save to state if wanted
        if (saveState) {
            this.state.s = saturation;
            this.state.l = lightness;
        }
        // set the actual color values
        this._color.s = saturation;
        this._color.l = lightness;
        // apply the --s-color-picker-a css variable
        this.style.setProperty('--s-color-picker-shade-x', s);
        this.style.setProperty(
            '--s-color-picker-shade-y',
            l * 2 > 100 ? 100 : l * 2,
        );
        this.style.setProperty('--s-color-picker-s', saturation);
        this.style.setProperty('--s-color-picker-l', lightness);
        // update the shade canvas with the new color
        this._updateShadeCanvas();
        // update the component
        this.requestUpdate();
    }

    /**
     * Apply the alpha when choosing it from the selector
     */
    _setAlphaFromEvent(e, saveState = true) {
        const bounds = e.target.getBoundingClientRect();
        const y = e.clientY - bounds.top;
        let pY = 100 - Math.round((100 / bounds.height) * y);

        // contraints
        if (pY < 0) pY = 0;
        if (pY > 100) pY = 100;

        // apply the opacity to the shade selector
        this._setAlpha(pY / 100, saveState);
    }
    _setAlpha(a: number, saveState = true): void {
        // save to state if needed
        if (saveState) {
            this.state.a = a;
        }
        // set the actual color value
        this._color.a = a;
        // apply the --s-color-picker-a css variable
        this.style.setProperty('--s-color-picker-a', a);
        // update the alpha selector
        this._updateAlphaSelector();
        // update the component
        this.requestUpdate();
    }

    _copy() {
        const originalClass = this.props.copyIconClass;
        this.props.copyIconClass = this.props.copiedIconClass;

        __copy(this._$colorInput.value);

        setTimeout(() => {
            this.props.copyIconClass = originalClass;
        }, 1000);
    }

    async _eyeDropper() {
        const eyeDropper = new EyeDropper();
        const result = await eyeDropper.open();
        if (!result.sRGBHex) {
            return;
        }
        const newColor = new __SColor(result.sRGBHex);
        this._setAlpha(1);
        this._setHue(newColor.h);
        this._setShade(newColor.s, newColor.l);
        this._updateInput('eyedropper');
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
            this._isHueInInteraction = true;
            this.requestUpdate();
            this._$hue.setPointerCapture(e.pointerId);
            this._setHueFromEvent(e, false);
            this._updateInput('pointerdown');
        });
        this._$hue.addEventListener('pointermove', (e) => {
            e.preventDefault();
            if (!isHueDown) return;
            this._setHueFromEvent(e);
            this._updateInput('pointermove', false);
        });
        this._$hue.addEventListener('pointerup', (e) => {
            isHueDown = false;
            this._isHueInInteraction = false;
            this.requestUpdate();
            this._$hue.releasePointerCapture(e.pointerId);
            this._setHueFromEvent(e, true);
            this._updateInput('pointerup', true);
        });

        // prevent viewport movements
        // __preventViewportMovement(this._$hue);
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

        const gradientV = this._shadeCtx.createLinearGradient(
            0,
            0,
            0,
            this._shadeCtx.canvas.height,
        );
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
                    '__root',
                )} ${this.componentUtils.className('')}--${this.props
                    .floatSettings.position} ${this._isShadeInInteraction
                    ? 'is-shade-interacting'
                    : ''} ${this._isAlphaInInteraction
                    ? 'is-alpha-interacting'
                    : ''} ${this._isHueInInteraction
                    ? 'is-hue-interacting'
                    : ''}"
            >
                ${!this._hasInput && !this.props.input
                    ? html`
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${this.state.value ?? this.props.value}"
                          />
                      `
                    : ''}

                <div
                    class="${this.componentUtils.className(
                        '__injected',
                        's-group',
                    )}"
                >
                    ${!this._hasInput && this.props.input
                        ? html`
                              <input
                                  ?disabled=${this.props.disabled}
                                  type="text"
                                  autocomplete="off"
                                  name="${this.props.name}"
                                  value="${this.state.value ??
                                  this.props.value}"
                                  placeholder="${this.props.placeholder}"
                                  class="${this.componentUtils.className(
                                      '__input',
                                      's-input',
                                  )}"
                              />
                          `
                        : !this._hasInput
                        ? ''
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
                                  ${this.props.buttonIconClass
                                      ? html`
                                            <i
                                                class="${this.props
                                                    .buttonIconClass}"
                                            ></i>
                                        `
                                      : ''}
                              </button>
                          `
                        : ''}
                </div>
                ${this.props.backdrop
                    ? html`
                          <div
                              class="${this.componentUtils.className(
                                  '__backdrop',
                              )} ${this.props.backdropClass}"
                          ></div>
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
                                style="opacity: ${this._color.a}"
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
                        <div
                            class="${this.componentUtils.className(
                                '__formats',
                            )}"
                        >
                            <button
                                class="${this.componentUtils.className(
                                    '__btn',
                                )} ${this.componentUtils.className(
                                    '__hex-btn',
                                )} ${this.state.metasFormat === 'hex'
                                    ? 'active'
                                    : ''}"
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
                                    e.preventDefault();
                                    this._setMetasFormat('hex');
                                }}
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
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
                                    e.preventDefault();
                                    this._setMetasFormat('rgb');
                                }}
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
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
                                    e.preventDefault();
                                    this._setMetasFormat('hsl');
                                }}
                            >
                                HSL${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                        </div>
                        <div
                            class="${this.componentUtils.className('__color')}"
                        >
                            <input
                                type="text"
                                readonly
                                class="${this.componentUtils.className(
                                    '__color-input',
                                )}"
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
                                @pointerup=${() => this._copy()}
                            >
                                ${this.props.copyIconClass
                                    ? html`
                                          <i
                                              class="${this.props
                                                  .copyIconClass}"
                                          ></i>
                                      `
                                    : ''}
                            </div>
                            ${this.props.eyeDropper && window.EyeDropper
                                ? html`
                                      <div
                                          class="${this.componentUtils.className(
                                              '__eye-dropper',
                                          )} "
                                          @pointerup=${() => this._eyeDropper()}
                                      >
                                          ${this.props.eyeDropperIconClass
                                              ? html`
                                                    <i
                                                        class="${this.props
                                                            .eyeDropperIconClass}"
                                                    ></i>
                                                `
                                              : ''}
                                      </div>
                                  `
                                : ''}
                        </div>
                    </div>
                    ${this.props.actions.length
                        ? html`
                              <div
                                  class="${this.componentUtils.className(
                                      '__actions',
                                  )}"
                              >
                                  ${this.props.actions.includes('clear')
                                      ? html`
                                            <button
                                                class="${this.componentUtils.className(
                                                    '__clear',
                                                    's-btn s-color--error',
                                                )}"
                                                @click=${(e) =>
                                                    e.preventDefault()}
                                                @pointerup=${(e) => {
                                                    e.preventDefault();
                                                    this._clear();
                                                }}
                                            >
                                                ${this.props.i18n.clear ??
                                                'Clear'}
                                            </button>
                                        `
                                      : ''}
                                  ${this.props.actions.includes('reset')
                                      ? html`
                                            <button
                                                class="${this.componentUtils.className(
                                                    '__reset',
                                                    's-btn s-color--complementary',
                                                )}"
                                                @click=${(e) =>
                                                    e.preventDefault()}
                                                @pointerup=${(e) => {
                                                    e.preventDefault();
                                                    this._reset();
                                                }}
                                            >
                                                ${this.props.i18n.reset ??
                                                'Reset'}
                                            </button>
                                        `
                                      : ''}
                                  ${this.props.actions.includes('validate')
                                      ? html`
                                            <button
                                                class="${this.componentUtils.className(
                                                    '__validate',
                                                    's-btn s-color--accent',
                                                )}"
                                                @click=${(e) =>
                                                    e.preventDefault()}
                                                @pointerup=${(e) => {
                                                    e.preventDefault();
                                                    this._validate();
                                                }}
                                            >
                                                ${this.props.i18n.validate ??
                                                'Validate'}
                                            </button>
                                        `
                                      : ''}
                              </div>
                          `
                        : ''}
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
