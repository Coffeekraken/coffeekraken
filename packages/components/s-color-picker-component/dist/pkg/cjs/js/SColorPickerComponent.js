"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const dom_1 = require("@coffeekraken/sugar/dom");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SColorPickerComponentInterface_1 = __importDefault(require("./interface/SColorPickerComponentInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const s_color_picker_css_1 = __importDefault(require("../../../../src/css/s-color-picker.css")); // relative to /dist/pkg/esm/js
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
class SColorPickerComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SColorPickerComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(`
                ${s_color_picker_css_1.default}
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
        super((0, object_1.__deepMerge)({
            name: 's-color-picker',
            interface: SColorPickerComponentInterface_1.default,
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
            (0, dom_1.__preventViewportMovement)(this.querySelector('.s-color-picker_selectors'));
            (0, dom_1.__preventViewportMovement)(this.querySelector('.s-color-picker_metas'));
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
            if (!this.props.inline && !(0, is_1.__isMobile)()) {
                this._floatApi = (0, dom_1.__makeFloat)(this._$picker, this._$root, this.props.floatSettings);
            }
        });
    }
    _initColor() {
        var _a, _b;
        const value = (_a = this.props.value) !== null && _a !== void 0 ? _a : (_b = this._$input) === null || _b === void 0 ? void 0 : _b.value;
        // create a hue color that is used just for the hue selector
        this._hueColor = new s_color_1.default('#000');
        // save the input color to be able to clear correctly
        if (value) {
            this._inputColor = new s_color_1.default(value);
        }
        if (!this.state.value && value) {
            this._color = new s_color_1.default(value);
            if (!this._isAlphaWanted()) {
                this._color.a = 1;
            }
        }
        else {
            this._color = new s_color_1.default('#000');
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
        (0, clipboard_1.__copy)(this._$colorInput.value);
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
            const newColor = new s_color_1.default(result.sRGBHex);
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
        return (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
                                          <i
                                              class="${this.props
                .copyIconClass}"
                                          ></i>
                                      `
            : ''}
                            </div>
                            ${this.props.eyeDropper && window.EyeDropper
            ? (0, lit_1.html) `
                                      <div
                                          class="${this.utils.cls('_eye-dropper')} "
                                          @pointerup=${() => this._eyeDropper()}
                                      >
                                          ${this.props.eyeDropperIconClass
                ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
                              <div class="${this.utils.cls('_actions')}">
                                  ${this.props.actions.includes('reset')
                ? (0, lit_1.html) `
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
                ? (0, lit_1.html) `
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
exports.default = SColorPickerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRUFBNkM7QUFDN0Msb0ZBQTREO0FBQzVELDZEQUF1RDtBQUN2RCxpREFHaUM7QUFDakMsK0NBQW9EO0FBS3BELHVEQUF5RDtBQUN6RCw2QkFBMkM7QUFDM0MsZ0hBQTBGO0FBRTFGLHNEQUFnQztBQSs2QlgsaUJBLzZCZCxnQkFBUSxDQSs2Qlk7QUE3NkIzQixhQUFhO0FBQ2IsZ0dBQTJELENBQUMsK0JBQStCO0FBK0IzRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNFRztBQUNILE1BQXFCLHFCQUFzQixTQUFRLHlCQUFlO0lBQzlELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDO2tCQUNOLDRCQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEtBQUssRUFBRSxTQUFTO1NBQ25CLENBQUM7SUFDTixDQUFDO0lBNEJEOztRQUNJLEtB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