// @ts-nocheck

import __SColor from '@coffeekraken/s-color';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __copy } from '@coffeekraken/sugar/clipboard';
import {
    __makeFloat,
    __preventViewportMovement,
} from '@coffeekraken/sugar/dom';
import { __isMobile } from '@coffeekraken/sugar/is';
import type {
    IFloatApi,
    IFloatSettings,
} from '@coffeekraken/sugar/js/dom/ui/makeFloat';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';

import __define from './define';

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
        | 'close'
    )[];
    format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
    inline: boolean;
    eyeDropper: boolean;
    actions: ('reset' | 'validate')[];
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
 * @import          import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
 *
 * @snippet         __SColorPickerComponentDefine($1)
 *
 * @install         bash
 * npm i @coffeekraken/s-color-picker-component
 *
 * @install         js
 * import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
 * __SColorPickerComponentDefine();
 *
 * @example         html            With a different format (hsla)
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#5101FF" format="hsla" placeholder="Choose a color">
 *          <input type="text" name="color" class="s-input" placeholder="Choose a color" />
 *      </s-color-picker>
 * </label>
 *
 * @example         html            Just a button
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#55FFFF">
 *          <button class="s-btn">Choose a color</button>
 *      </s-color-picker>
 * </label>
 *
 * @example         html            Disabled
 * <label class="s-label:responsive">
 *      <span>Choose a color</span>
 *      <s-color-picker>
 *          <input type="text" disabled name="color" class="s-input" placeholder="Choose a color" />
 *      </s-color-picker>
 * </label>
 *
 * @example         html            RTL Support
 * <label class="s-label:responsive" dir="rtl">
 *      <span>Choose a color</span>
 *      <s-color-picker value="#FABB03" placeholder="Choose a color" dir="rtl">
 *          <input type="text" name="color" class="s-input" placeholder="Choose a color" />
 *      </s-color-picker>
 * </label>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SColorPickerComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
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

    static get state() {
        return {
            h: 0,
            s: 0,
            l: 0,
            r: 0,
            g: 0,
            b: 0,
            a: 1,
            hex: '#000000',
            hexa: '#000000ff',
            format: undefined,
            value: undefined,
        };
    }

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
        this._$button?.addEventListener('click', (e) => e.preventDefault());
        this._$button?.addEventListener('pointerup', (e) => e.preventDefault());
        this._hasButton = this._$button !== null;
    }
    async mount() {
        Object.assign(this.state, {
            format: this.props.format,
            // value: this.props.value, // do not set the value in the state cause it will be checked after in the _initColor method to restore it
        });

        // if alpha is not wanted, make sure to have it to 1 in the state
        if (!this._isAlphaWanted()) {
            this.state.a = 1;
        }

        // init the color
        this._initColor();
    }
    async firstUpdated() {
        // save the original state
        Object.assign(this._originalState, this.state);

        this._$root = this.querySelector(`.${this.utils.uCls('_root')}`);

        this._$picker = this.querySelector(`.${this.utils.uCls('_picker')}`);

        // metas input
        this._$colorInput = this.querySelector(
            `.${this.utils.uCls('_color-input')}`,
        );

        // shade
        this._$shade = this.querySelector(`.${this.utils.uCls(`_shade`)}`);
        this._shadeCtx = this._$shade.getContext('2d');

        // hue
        this._$hue = this.querySelector(`.${this.utils.uCls(`_hue`)}`);
        this._hueCtx = this._$hue.getContext('2d');

        // alpha
        this._$alpha = this.querySelector(`.${this.utils.uCls(`_alpha`)}`);
        this._alphaCtx = this._$alpha.getContext('2d');

        // input
        if (!this._$input) {
            this._$input = this.querySelector('input');
        } else {
            // this._$root.append(this._$input);
        }

        // some mutations
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
            this.querySelector('.s-color-picker_selectors'),
        );
        __preventViewportMovement(this.querySelector('.s-color-picker_metas'));

        // handle form reset
        // this._$input?.form?.addEventListener('reset', () => {
        //     setTimeout(() => {
        //         __STheme.applyCurrentColor(this._$input?.value, this._$root);
        //     });
        // });

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

        // create a hue color that is used just for the hue selector
        this._hueColor = new __SColor('#000');

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
            this._color = new __SColor('#000');
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
            | 'close'
            | 'format',
    ) {
        if (step !== 'init' && !this.props.updateInput.includes(step)) {
            return;
        }

        switch (this.state.format) {
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
            this.utils.dispatchEvent('change', {
                detail: {
                    ...this._color.toObject(),
                    format: this.state.format,
                },
            });
        }

        this.requestUpdate();
    }

    _restoreState() {
        this._setAlpha(this._color.a);
        this._setHue(this._color.h);
        this._setShade(this._color.s, this._color.l);
    }

    setFormat(format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'): void {
        this.state.format = format;
        this._updateInput('format');
        return false;
    }

    _validate() {
        this._updateInput('validate');
        document.activeElement?.blur?.();
    }
    _reset() {
        this._setAlpha(this._originalState.a);
        this._setHue(this._originalState.h);
        this._setShade(this._originalState.s, this._originalState.l);
        this._updateInput('reset');
    }

    _isAlphaWanted() {
        return this.state.format.includes('a');
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
        // apply the css variables
        this._applyCssVariables();
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
        // apply the color in css variables
        this._applyCssVariables();
        // update the shade canvas with the new color
        this._updateShadeCanvas();
        // update the component
        this.requestUpdate();
    }

    /**
     * Apply the current color to css variables through the element style
     */
    _applyCssVariables() {
        // shade
        this.style.setProperty('--s-color-picker-shade-x', this._color.s);
        this.style.setProperty(
            '--s-color-picker-shade-y',
            this._color.l * 2 > 100 ? 100 : this._color.l * 2,
        );

        // hue
        this.style.setProperty('--s-color-picker-h', this._color.h);

        // saturation and lightness
        this.style.setProperty('--s-color-picker-s', this._color.s);
        this.style.setProperty('--s-color-picker-l', this._color.l);

        // alpha
        this.style.setProperty('--s-color-picker-a', this._color.a);

        // string values
        this.style.setProperty(
            '--s-color-picker-hsla',
            this._color.toHslaString(),
        );
        this.style.setProperty(
            '--s-color-picker-rgba',
            this._color.toRgbaString(),
        );
        this.style.setProperty(
            '--s-color-picker-hexa',
            this._color.toHexaString(),
        );
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
        // apply the variables on the element
        this._applyCssVariables();
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
                class="${this.utils.cls('_root')} ${this.utils.cls('')}--${this
                    .props.floatSettings.position} ${this._isShadeInInteraction
                    ? 'is-shade-interacting'
                    : ''} ${this._isAlphaInInteraction
                    ? 'is-alpha-interacting'
                    : ''} ${this._isHueInInteraction
                    ? 'is-hue-interacting'
                    : ''}"
            >
                ${this.props.backdrop
                    ? html`
                          <div
                              class="${this.utils.cls('_backdrop')} ${this.props
                                  .backdropClass}"
                          ></div>
                      `
                    : ''}
                <div class="${this.utils.cls('_picker')}" tabindex="-1">
                    <div class="${this.utils.cls('_selectors')}">
                        <div class="${this.utils.cls('_shade-wrapper')}">
                            <div class="${this.utils.cls('_chest')}"></div>
                            <canvas
                                class="${this.utils.cls('_shade')}"
                                style="opacity: ${this._color?.a ?? 1}"
                            ></canvas>
                        </div>
                        <div class="${this.utils.cls('_hue-wrapper')}">
                            <div class="${this.utils.cls('_chest')}"></div>
                            <canvas class="${this.utils.cls('_hue')}"></canvas>
                        </div>
                        <div
                            class="${this.utils.cls(
                                '_alpha-wrapper',
                            )} ${this._isAlphaWanted() ? 'active' : ''}"
                        >
                            <div class="${this.utils.cls('_chest')}"></div>
                            <canvas
                                class="${this.utils.cls('_alpha')}"
                            ></canvas>
                        </div>
                    </div>

                    <div class="${this.utils.cls('_metas')}">
                        <div class="${this.utils.cls('_formats')}">
                            <button
                                class="${this.utils.cls(
                                    '_btn',
                                )} ${this.utils.cls('_hex-btn')} ${this.state
                                    .format === 'hex' ||
                                this.state.format === 'hexa'
                                    ? 'active'
                                    : ''}"
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
                                    e.preventDefault();
                                    this.setFormat(
                                        `hex${
                                            this._isAlphaWanted() ? 'a' : ''
                                        }`,
                                    );
                                }}
                            >
                                HEX${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                            <button
                                class="${this.utils.cls(
                                    '_btn',
                                )} ${this.utils.cls('_rgb-btn')} ${this.state
                                    .format === 'rgb' ||
                                this.state.format === 'rgba'
                                    ? 'active'
                                    : ''}"
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
                                    e.preventDefault();
                                    this.setFormat(
                                        `rgb${
                                            this._isAlphaWanted() ? 'a' : ''
                                        }`,
                                    );
                                }}
                            >
                                RGB${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                            <button
                                class="${this.utils.cls(
                                    '_btn',
                                )} ${this.utils.cls('_hsl-btn')} ${this.state
                                    .format === 'hsl' ||
                                this.state.format === 'hsla'
                                    ? 'active'
                                    : ''}"
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
                                    e.preventDefault();
                                    this.setFormat(
                                        `hsl${
                                            this._isAlphaWanted() ? 'a' : ''
                                        }`,
                                    );
                                }}
                            >
                                HSL${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                        </div>
                        <div class="${this.utils.cls('_color')}">
                            <input
                                type="text"
                                readonly
                                class="${this.utils.cls('_color-input')}"
                                value="${this.state.format === 'hexa'
                                    ? this._color.toHexaString()
                                    : this.state.format === 'hex'
                                    ? this._color.toHexString()
                                    : this.state.format === 'rgba'
                                    ? this._color.toRgbaString()
                                    : this.state.format === 'rgb'
                                    ? this._color.toRgbString()
                                    : this.state.format === 'hsla'
                                    ? this._color.toHslaString()
                                    : this._color.toHslString()}"
                            />
                            <div
                                class="${this.utils.cls('_preview')} "
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
                                          class="${this.utils.cls(
                                              '_eye-dropper',
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
                              <div class="${this.utils.cls('_actions')}">
                                  ${this.props.actions.includes('reset')
                                      ? html`
                                            <button
                                                class="${this.utils.cls(
                                                    '_reset',
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
                                                class="${this.utils.cls(
                                                    '_validate',
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

export { __define as define };
