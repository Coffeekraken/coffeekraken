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
import __SColor from '@coffeekraken/s-color';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __copy } from '@coffeekraken/sugar/clipboard';
import { __makeFloat, __preventViewportMovement, } from '@coffeekraken/sugar/dom';
import { __isMobile } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SColorPickerComponentInterface from './interface/SColorPickerComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-color-picker.css'; // relative to /dist/pkg/esm/js
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
 * import { __define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
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
        return __SLitComponent.propertiesFromInterface({}, __SColorPickerComponentInterface);
    }
    static get styles() {
        return css `
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
    constructor() {
        var _a, _b;
        super(__deepMerge({
            name: 's-color-picker',
            interface: __SColorPickerComponentInterface,
        }));
        this._originalState = {};
        this._hasInput = false;
        this._hasButton = false;
        this._isShadeInInteraction = false;
        this._isAlphaInInteraction = false;
        this._isHueInInteraction = false;
        this._$input = this.querySelector('input');
        this._hasInput = this._$input !== null;
        this._$button = this.querySelector('button');
        (_a = this._$button) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => e.preventDefault());
        (_b = this._$button) === null || _b === void 0 ? void 0 : _b.addEventListener('pointerup', (e) => e.preventDefault());
        this._hasButton = this._$button !== null;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    firstUpdated() {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            // save the original state
            Object.assign(this._originalState, this.state);
            this._$root = this.querySelector(`.${this.utils.uCls('_root')}`);
            this._$picker = this.querySelector(`.${this.utils.uCls('_picker')}`);
            // metas input
            this._$colorInput = this.querySelector(`.${this.utils.uCls('_color-input')}`);
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
            }
            else {
                // this._$root.append(this._$input);
            }
            // some mutations
            if (!((_a = this._$input) === null || _a === void 0 ? void 0 : _a.hasAttribute('name'))) {
                (_b = this._$input) === null || _b === void 0 ? void 0 : _b.setAttribute('name', this.props.name);
            }
            if (!((_c = this._$input) === null || _c === void 0 ? void 0 : _c.hasAttribute('placeholder'))) {
                (_d = this._$input) === null || _d === void 0 ? void 0 : _d.setAttribute('placeholder', this.props.placeholder);
            }
            if (!((_e = this._$input) === null || _e === void 0 ? void 0 : _e.hasAttribute('autocomplete'))) {
                (_f = this._$input) === null || _f === void 0 ? void 0 : _f.setAttribute('autocomplete', 'off');
            }
            this._$input.setAttribute('readonly', true);
            // update float on focus
            this.addEventListener('focusin', (e) => {
                var _a;
                (_a = this._floatApi) === null || _a === void 0 ? void 0 : _a.update();
            });
            __preventViewportMovement(this.querySelector('.s-color-picker_selectors'));
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
                this._floatApi = __makeFloat(this._$picker, this._$root, this.props.floatSettings);
            }
        });
    }
    _initColor() {
        var _a, _b;
        const value = (_a = this.props.value) !== null && _a !== void 0 ? _a : (_b = this._$input) === null || _b === void 0 ? void 0 : _b.value;
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
        }
        else {
            this._color = new __SColor('#000');
            this._color.h = this.state.h;
            this._color.s = this.state.s;
            this._color.l = this.state.l;
            this._color.a = this.state.a;
        }
    }
    _updateInput(step) {
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
                detail: Object.assign(Object.assign({}, this._color.toObject()), { format: this.state.format }),
            });
        }
        this.requestUpdate();
    }
    _restoreState() {
        this._setAlpha(this._color.a);
        this._setHue(this._color.h);
        this._setShade(this._color.s, this._color.l);
    }
    setFormat(format) {
        this.state.format = format;
        this._updateInput('format');
        return false;
    }
    _validate() {
        var _a, _b;
        this._updateInput('validate');
        (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
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
            if (!isShadeDown)
                return;
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
            if (!isAlphaDown)
                return;
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
        if (hue < 0)
            hue = 0;
        if (hue > 360)
            hue = 360;
        // set the hue
        this._setHue(hue, saveState);
    }
    _setHue(h, saveState = true) {
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
        const y = e.clientY - bounds.top, x = e.clientX - bounds.left;
        let pY = 100 - Math.round((100 / bounds.height) * y), pX = Math.round((100 / bounds.width) * x);
        // constraint
        if (pY < 0)
            pY = 0;
        if (pY > 100)
            pY = 100;
        if (pX < 0)
            pX = 0;
        if (pX > 100)
            pX = 100;
        this._setShade(pX, pY * 0.5, saveState);
    }
    _setShade(s, l, saveState = true) {
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
        this.style.setProperty('--s-color-picker-shade-y', this._color.l * 2 > 100 ? 100 : this._color.l * 2);
        // hue
        this.style.setProperty('--s-color-picker-h', this._color.h);
        // saturation and lightness
        this.style.setProperty('--s-color-picker-s', this._color.s);
        this.style.setProperty('--s-color-picker-l', this._color.l);
        // alpha
        this.style.setProperty('--s-color-picker-a', this._color.a);
        // string values
        this.style.setProperty('--s-color-picker-hsla', this._color.toHslaString());
        this.style.setProperty('--s-color-picker-rgba', this._color.toRgbaString());
        this.style.setProperty('--s-color-picker-hexa', this._color.toHexaString());
    }
    /**
     * Apply the alpha when choosing it from the selector
     */
    _setAlphaFromEvent(e, saveState = true) {
        const bounds = e.target.getBoundingClientRect();
        const y = e.clientY - bounds.top;
        let pY = 100 - Math.round((100 / bounds.height) * y);
        // contraints
        if (pY < 0)
            pY = 0;
        if (pY > 100)
            pY = 100;
        // apply the opacity to the shade selector
        this._setAlpha(pY / 100, saveState);
    }
    _setAlpha(a, saveState = true) {
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
    _eyeDropper() {
        return __awaiter(this, void 0, void 0, function* () {
            const eyeDropper = new EyeDropper();
            const result = yield eyeDropper.open();
            if (!result.sRGBHex) {
                return;
            }
            const newColor = new __SColor(result.sRGBHex);
            this._setAlpha(1);
            this._setHue(newColor.h);
            this._setShade(newColor.s, newColor.l);
            this._updateInput('eyedropper');
        });
    }
    /**
     * This method init the hue selector canvas just at start
     */
    _initHueSelector() {
        const bounds = this._$hue.getBoundingClientRect();
        this._hueCtx.canvas.width = bounds.width;
        this._hueCtx.canvas.height = bounds.height;
        const gradientH = this._hueCtx.createLinearGradient(0, 0, 0, bounds.height);
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
            if (!isHueDown)
                return;
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
        const gradientH = this._alphaCtx.createLinearGradient(0, 0, 0, bounds.height);
        gradientH.addColorStop(0, `rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 1)`);
        gradientH.addColorStop(1, `rgba(${this._hueColor.r}, ${this._hueColor.g}, ${this._hueColor.b}, 0)`);
        this._alphaCtx.fillStyle = gradientH;
        this._alphaCtx.fillRect(0, 0, bounds.width * 3, bounds.height);
    }
    /**
     * This method take care of updating the canvas with the good gradients depending on the picker state
     */
    _updateShadeCanvas() {
        let gradientH = this._shadeCtx.createLinearGradient(0, 0, this._shadeCtx.canvas.width, 0);
        const newColor = this._color.clone();
        newColor.s = 100;
        newColor.l = 50;
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, newColor.toHex());
        this._shadeCtx.fillStyle = gradientH;
        this._shadeCtx.fillRect(0, 0, this._shadeCtx.canvas.width, this._shadeCtx.canvas.height);
        const gradientV = this._shadeCtx.createLinearGradient(0, 0, 0, this._shadeCtx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        this._shadeCtx.fillStyle = gradientV;
        this._shadeCtx.fillRect(0, 0, this._shadeCtx.canvas.width, this._shadeCtx.canvas.height);
    }
    render() {
        var _a, _b, _c, _d;
        return html `
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
            ? html `
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
                                style="opacity: ${(_b = (_a = this._color) === null || _a === void 0 ? void 0 : _a.a) !== null && _b !== void 0 ? _b : 1}"
                            ></canvas>
                        </div>
                        <div class="${this.utils.cls('_hue-wrapper')}">
                            <div class="${this.utils.cls('_chest')}"></div>
                            <canvas class="${this.utils.cls('_hue')}"></canvas>
                        </div>
                        <div
                            class="${this.utils.cls('_alpha-wrapper')} ${this._isAlphaWanted() ? 'active' : ''}"
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
                                class="${this.utils.cls('_btn')} ${this.utils.cls('_hex-btn')} ${this.state
            .format === 'hex' ||
            this.state.format === 'hexa'
            ? 'active'
            : ''}"
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
            e.preventDefault();
            this.setFormat(`hex${this._isAlphaWanted() ? 'a' : ''}`);
        }}
                            >
                                HEX${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                            <button
                                class="${this.utils.cls('_btn')} ${this.utils.cls('_rgb-btn')} ${this.state
            .format === 'rgb' ||
            this.state.format === 'rgba'
            ? 'active'
            : ''}"
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
            e.preventDefault();
            this.setFormat(`rgb${this._isAlphaWanted() ? 'a' : ''}`);
        }}
                            >
                                RGB${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                            <button
                                class="${this.utils.cls('_btn')} ${this.utils.cls('_hsl-btn')} ${this.state
            .format === 'hsl' ||
            this.state.format === 'hsla'
            ? 'active'
            : ''}"
                                @click=${(e) => e.preventDefault()}
                                @pointerup=${(e) => {
            e.preventDefault();
            this.setFormat(`hsl${this._isAlphaWanted() ? 'a' : ''}`);
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
            ? html `
                                          <i
                                              class="${this.props
                .copyIconClass}"
                                          ></i>
                                      `
            : ''}
                            </div>
                            ${this.props.eyeDropper && window.EyeDropper
            ? html `
                                      <div
                                          class="${this.utils.cls('_eye-dropper')} "
                                          @pointerup=${() => this._eyeDropper()}
                                      >
                                          ${this.props.eyeDropperIconClass
                ? html `
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
            ? html `
                              <div class="${this.utils.cls('_actions')}">
                                  ${this.props.actions.includes('reset')
                ? html `
                                            <button
                                                class="${this.utils.cls('_reset', 's-btn s-color--complementary')}"
                                                @click=${(e) => e.preventDefault()}
                                                @pointerup=${(e) => {
                    e.preventDefault();
                    this._reset();
                }}
                                            >
                                                ${(_c = this.props.i18n.reset) !== null && _c !== void 0 ? _c : 'Reset'}
                                            </button>
                                        `
                : ''}
                                  ${this.props.actions.includes('validate')
                ? html `
                                            <button
                                                class="${this.utils.cls('_validate', 's-btn s-color--accent')}"
                                                @click=${(e) => e.preventDefault()}
                                                @pointerup=${(e) => {
                    e.preventDefault();
                    this._validate();
                }}
                                            >
                                                ${(_d = this.props.i18n.validate) !== null && _d !== void 0 ? _d : 'Validate'}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdkQsT0FBTyxFQUNILFdBQVcsRUFDWCx5QkFBeUIsR0FDNUIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSx3Q0FBd0MsQ0FBQyxDQUFDLCtCQUErQjtBQStCM0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLHFCQUFzQixTQUFRLGVBQWU7SUFDOUQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixnQ0FBZ0MsQ0FDbkMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDO2tCQUNOLEtBQUs7YUFDVixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU87WUFDSCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lB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