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
        _console.log('Update format', this.state.format);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRUFBNkM7QUFDN0Msb0ZBQTREO0FBQzVELDZEQUF1RDtBQUN2RCxpREFHaUM7QUFDakMsK0NBQW9EO0FBS3BELHVEQUF5RDtBQUN6RCw2QkFBMkM7QUFDM0MsZ0hBQTBGO0FBRTFGLHNEQUFnQztBQWc3QlgsaUJBaDdCZCxnQkFBUSxDQWc3Qlk7QUE5NkIzQixhQUFhO0FBQ2IsZ0dBQTJELENBQUMsK0JBQStCO0FBK0IzRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNFRztBQUNILE1BQXFCLHFCQUFzQixTQUFRLHlCQUFlO0lBQzlELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHdDQUFnQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDO2tCQUNOLDRCQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixHQUFHLEVBQUUsU0FBUztZQUNkLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEtBQUssRUFBRSxTQUFTO1NBQ25CLENBQUM7SUFDTixDQUFDO0lBNEJEOztRQUNJLEtB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QVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDL0IsQ0FBQztRQUVGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQ2pELENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDL0IsQ0FBQztRQUNGLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDbkIsQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDL0IsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNOztRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7O3lCQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUk7YUFDMUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLElB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