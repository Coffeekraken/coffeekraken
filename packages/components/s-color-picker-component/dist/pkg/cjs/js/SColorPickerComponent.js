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
const copy_1 = __importDefault(require("@coffeekraken/sugar/js/clipboard/copy"));
const preventViewportMovement_1 = __importDefault(require("@coffeekraken/sugar/js/dom/touch/preventViewportMovement"));
const makeFloat_1 = __importDefault(require("@coffeekraken/sugar/js/dom/ui/makeFloat"));
const mobile_1 = __importDefault(require("@coffeekraken/sugar/js/is/mobile"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const lit_1 = require("lit");
const SColorPickerComponentInterface_1 = __importDefault(require("./interface/SColorPickerComponentInterface"));
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
class SColorPicker extends s_lit_component_1.default {
    constructor() {
        var _a;
        super((0, deepMerge_1.default)({
            name: 's-color-picker',
            interface: SColorPickerComponentInterface_1.default,
        }));
        this.state = {
            h: 0,
            s: 0,
            l: 0,
            a: 1,
            metasFormat: 'hex',
            value: undefined,
        };
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
        this._hasButton = this._$button !== null;
    }
    static get properties() {
        return s_lit_component_1.default.createProperties({}, SColorPickerComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(`
                ${s_color_picker_css_1.default}
            `)}
        `;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            this._hueColor = new s_color_1.default('#000');
            this._color = new s_color_1.default('#000');
            // save the original state
            Object.assign(this._originalState, this.state);
        });
    }
    firstUpdated() {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            this._$root = this.querySelector(`.${this.componentUtils.className('__root')}`);
            this._$picker = this.querySelector(`.${this.componentUtils.className('__picker')}`);
            // metas input
            this._$colorInput = this.querySelector(`.${this.componentUtils.className('__color-input')}`);
            // shade
            this._$shade = this.querySelector(`.${this.componentUtils.className(`__shade`)}`);
            this._shadeCtx = this._$shade.getContext('2d');
            // hue
            this._$hue = this.querySelector(`.${this.componentUtils.className(`__hue`)}`);
            this._hueCtx = this._$hue.getContext('2d');
            // alpha
            this._$alpha = this.querySelector(`.${this.componentUtils.className(`__alpha`)}`);
            this._alphaCtx = this._$alpha.getContext('2d');
            // input
            if (!this._$input) {
                this._$input = this.querySelector('input');
            }
            else {
                // this._$root.append(this._$input);
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
            this._$input.setAttribute('readonly', true);
            // update float on focus
            this.addEventListener('focusin', (e) => {
                var _a;
                (_a = this._floatApi) === null || _a === void 0 ? void 0 : _a.update();
            });
            (0, preventViewportMovement_1.default)(this.querySelector('.s-color-picker__selectors'));
            (0, preventViewportMovement_1.default)(this.querySelector('.s-color-picker__metas'));
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
            if (!this.props.inline && !(0, mobile_1.default)()) {
                this._floatApi = (0, makeFloat_1.default)(this._$picker, this._$root, this.props.floatSettings);
            }
        });
    }
    _initColor() {
        var _a, _b;
        const value = (_a = this.props.value) !== null && _a !== void 0 ? _a : (_b = this._$input) === null || _b === void 0 ? void 0 : _b.value;
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
    _setMetasFormat(format) {
        this.state.metasFormat = format;
        this.requestUpdate();
        return false;
    }
    _validate() {
        var _a, _b;
        this._updateInput('validate');
        (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    _clear() {
        if (this._inputColor) {
            this._setAlpha(this._inputColor.a);
            this._setHue(this._inputColor.h);
            this._setShade(this._inputColor.s, this._inputColor.l);
        }
        else {
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
        // apply the --s-color-picker-a css variable
        this.style.setProperty('--s-color-picker-shade-x', s);
        this.style.setProperty('--s-color-picker-shade-y', l * 2 > 100 ? 100 : l * 2);
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
        (0, copy_1.default)(this._$colorInput.value);
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
        var _a, _b, _c, _d, _e;
        return (0, lit_1.html) `
            <div
                class="${this.componentUtils.className('__root')} ${this.componentUtils.className('')}--${this.props
            .floatSettings.position} ${this._isShadeInInteraction
            ? 'is-shade-interacting'
            : ''} ${this._isAlphaInInteraction
            ? 'is-alpha-interacting'
            : ''} ${this._isHueInInteraction
            ? 'is-hue-interacting'
            : ''}"
            >
                ${!this._hasInput && !this.props.input
            ? (0, lit_1.html) `
                          <input
                              ?disabled=${this.props.disabled}
                              type="hidden"
                              name="${this.props.name}"
                              value="${(_a = this.state.value) !== null && _a !== void 0 ? _a : this.props.value}"
                          />
                      `
            : ''}

                <div
                    class="${this.componentUtils.className('__injected', 's-group')}"
                >
                    ${!this._hasInput && this.props.input
            ? (0, lit_1.html) `
                              <input
                                  ?disabled=${this.props.disabled}
                                  type="text"
                                  autocomplete="off"
                                  name="${this.props.name}"
                                  value="${(_b = this.state.value) !== null && _b !== void 0 ? _b : this.props.value}"
                                  placeholder="${this.props.placeholder}"
                                  class="${this.componentUtils.className('__input', 's-input')}"
                              />
                          `
            : !this._hasInput
                ? ''
                : ``}
                    ${!this._hasButton && this.props.button
            ? (0, lit_1.html) `
                              <button
                                  ?disabled=${this.props.disabled}
                                  onclick="return false"
                                  class="${this.componentUtils.className('__button', 's-btn')}"
                              >
                                  ${this.props.buttonIconClass
                ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
                          <div
                              class="${this.componentUtils.className('__backdrop')} ${this.props.backdropClass}"
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
                            class="${this.componentUtils.className('__shade-wrapper')}"
                        >
                            <div
                                class="${this.componentUtils.className('__chest')}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className('__shade')}"
                                style="opacity: ${this._color.a}"
                            ></canvas>
                        </div>
                        <div
                            class="${this.componentUtils.className('__hue-wrapper')}"
                        >
                            <div
                                class="${this.componentUtils.className('__chest')}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className('__hue')}"
                            ></canvas>
                        </div>
                        <div
                            class="${this.componentUtils.className('__alpha-wrapper')} ${this._isAlphaWanted() ? 'active' : ''}"
                        >
                            <div
                                class="${this.componentUtils.className('__chest')}"
                            ></div>
                            <canvas
                                class="${this.componentUtils.className('__alpha')}"
                            ></canvas>
                        </div>
                    </div>

                    <div class="${this.componentUtils.className('__metas')}">
                        <div
                            class="${this.componentUtils.className('__formats')}"
                        >
                            <button
                                class="${this.componentUtils.className('__btn')} ${this.componentUtils.className('__hex-btn')} ${this.state.metasFormat === 'hex'
            ? 'active'
            : ''}"
                                @click=${(e) => {
            e.preventDefault();
            this._setMetasFormat('hex');
        }}
                            >
                                HEX${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                            <button
                                class="${this.componentUtils.className('__btn')} ${this.componentUtils.className('__rgb-btn')} ${this.state.metasFormat === 'rgb'
            ? 'active'
            : ''}"
                                @click=${(e) => {
            e.preventDefault();
            this._setMetasFormat('rgb');
        }}
                            >
                                RGB${this._isAlphaWanted() ? 'A' : ''}
                            </button>
                            <button
                                class="${this.componentUtils.className('__btn')} ${this.componentUtils.className('__hsl-btn')} ${this.state.metasFormat === 'hsl'
            ? 'active'
            : ''}"
                                @click=${(e) => {
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
                                class="${this.componentUtils.className('__color-input')}"
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
                                class="${this.componentUtils.className('__preview')} "
                                @click=${() => this._copy()}
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
                            ${this.props.eyeDropper
            ? (0, lit_1.html) `
                                      <div
                                          class="${this.componentUtils.className('__eye-dropper')} "
                                          @click=${() => this._eyeDropper()}
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
                              <div
                                  class="${this.componentUtils.className('__actions')}"
                              >
                                  ${this.props.actions.includes('clear')
                ? (0, lit_1.html) `
                                            <button
                                                class="${this.componentUtils.className('__clear', 's-btn s-color--error')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._clear();
                }}
                                            >
                                                ${(_c = this.props.i18n.clear) !== null && _c !== void 0 ? _c : 'Clear'}
                                            </button>
                                        `
                : ''}
                                  ${this.props.actions.includes('reset')
                ? (0, lit_1.html) `
                                            <button
                                                class="${this.componentUtils.className('__reset', 's-btn s-color--complementary')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._reset();
                }}
                                            >
                                                ${(_d = this.props.i18n.reset) !== null && _d !== void 0 ? _d : 'Reset'}
                                            </button>
                                        `
                : ''}
                                  ${this.props.actions.includes('validate')
                ? (0, lit_1.html) `
                                            <button
                                                class="${this.componentUtils.className('__validate', 's-btn s-color--accent')}"
                                                @click=${(e) => {
                    e.preventDefault();
                    this._validate();
                }}
                                            >
                                                ${(_e = this.props.i18n.validate) !== null && _e !== void 0 ? _e : 'Validate'}
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
exports.default = SColorPicker;
function define(props = {}, tagName = 's-color-picker') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SColorPicker);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRUFBNkM7QUFDN0Msb0ZBQTREO0FBQzVELGlGQUEyRDtBQUMzRCx1SEFBaUc7QUFLakcsd0ZBQWtFO0FBQ2xFLDhFQUEwRDtBQUMxRCw0RkFBc0U7QUFDdEUsNkJBQTJDO0FBQzNDLGdIQUEwRjtBQUUxRixhQUFhO0FBQ2IsZ0dBQTJELENBQUMsK0JBQStCO0FBa0MzRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlHRztBQUNILE1BQXFCLFlBQWEsU0FBUSx5QkFBZTtJQWtEckQ7O1FBQ0ksS0FBSyxDQUNELElBQUEsbUJBQVcsRUFBQztZQUNSLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsU0FBUyxFQUFFLHdDQUFnQztTQUM5QyxDQUFDLENBQ0wsQ0FBQztRQXhDTixVQUFLLEdBQUc7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLEtBQUssRUFBRSxTQUFTO1NBQ25CLENBQUM7UUFDRixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUlwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFpQm5CLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUM5QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBU3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMs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