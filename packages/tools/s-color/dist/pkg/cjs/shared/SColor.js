"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const color_1 = require("@coffeekraken/sugar/color");
const object_1 = require("@coffeekraken/sugar/object");
const SColorApplyParamsInterface_1 = __importDefault(require("./interface/SColorApplyParamsInterface"));
const SColorSettingsInterface_1 = __importDefault(require("./interface/SColorSettingsInterface"));
const contrast_1 = require("@smockle/contrast");
class SColor extends s_class_1.default {
    /**
     * @name            getContrastInfo
     * @type            Function
     * @static
     *
     * This static function allows you to get the contact informations regarding two colors.
     * You will get back an object containing informations about the color1, color2 and a "value"
     * that represent the contrast between your colors between 0 and 21.
     *
     * @param           {String|SColor}             color1          The color 1 to check
     * @param           {String|SColor}             color2          The color 2 to check
     * @return          {ISColorContrastInfo}                       The contrast informations
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getContrastInfo(color1, color2) {
        if (typeof color1 === 'string') {
            const color1Instance = new SColor(color1);
            color1 = color1Instance.toHexString();
        }
        if (typeof color2 === 'string') {
            const color2Instance = new SColor(color2);
            color2 = color2Instance.toHexString();
        }
        const contrast = new contrast_1.Contrast(color1, color2);
        const finalContrastInfo = {
            background: {
                r: contrast.background.R,
                g: contrast.background.G,
                b: contrast.background.b,
                color: contrast.background.value,
            },
            foreground: {
                r: contrast.foreground.R,
                g: contrast.foreground.G,
                b: contrast.foreground.b,
                color: contrast.foreground.value,
            },
            value: contrast.value,
        };
        return finalContrastInfo;
    }
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(color, settings) {
        var _c, _d;
        // save the instance settings
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        SColorSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name                _originalSColor
         * @type                Object
         * @private
         *
         * Original color value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._originalSColor = null;
        /**
         * @name            _h
         * @type            Number
         * @private
         *
         * Internal hue value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._h = 0;
        /**
         * @name            _s
         * @type            Number
         * @private
         *
         * Internal saturation value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._s = 0;
        /**
         * @name            _l
         * @type            Number
         * @private
         *
         * Internal lightness value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._l = 0;
        /**
         * @name            _r
         * @type            Number
         * @private
         *
         * Internal red value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._r = 0;
        /**
         * @name                _g
         * @type                Number
         * @private
         *
         * Internal green value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._g = 0;
        /**
         * @name                  _b
         * @type                  Number
         * @private
         *
         * Internal blue value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._b = 0;
        /**
         * @name              _a
         * @type              Number
         * @private
         *
         * Internal alpha value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._a = 1;
        /**
         * @name              _format
         * @type              'hex' | 'hexa' | 'hsl' | 'hsla' | 'rgb' | 'rgba'
         * @private
         *
         * Current color format
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._format = 'hexa';
        // get the actual real color
        color = this.getColor(color);
        // save the original color
        this._originalSColor = color;
        if (typeof color === 'string') {
            // parse the input color to
            // split into rgba values
            try {
                this._parse(color);
            }
            catch (e) {
                // console.log('ERROR', e);
                // console.log(this);
            }
        }
        else {
            // we assume that the passed color is an object of type ISColorObject
            // so we construct our color from this
            if (color.h !== undefined &&
                color.s !== undefined &&
                color.l !== undefined) {
                this._h = color.h;
                this._s = color.s;
                this._l = color.l;
                this._a = (_c = color.a) !== null && _c !== void 0 ? _c : 1;
            }
            else if (color.r !== undefined &&
                color.g !== undefined &&
                color.b !== undefined) {
                const converted = (0, color_1.__rgbaToHsla)(color.r, color.g, color.b, (_d = color.a) !== null && _d !== void 0 ? _d : 1);
                this._h = converted.h;
                this._s = converted.s;
                this._l = converted.l;
                this._a = converted.a;
            }
            else {
                console.error(color);
                throw new Error('Sorry but this passed value is not a valid color object or string...');
            }
        }
    }
    /**
     * @name            getColor
     * @type            Function
     *
     * This method take as parameter the passed color to the constructor and has to return the
     * actual real color like color from the static colors listed in the SColor class or maybe
     * from the Sugar configured colors
     */
    getColor(color) {
        // try to get the color from the map
        if (typeof color == 'string' && SColor.colors[color.toLowerCase()]) {
            return SColor.colors[color.toLowerCase()];
        }
        // return the passed color
        return color;
    }
    /**
     * @name            _parse
     * @type            Function
     * @private
     *
     * Parse
     *
     * @param       {object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | {r:255,r:140,b:23,a:40})
     * @return      {object}                  The rgba representation of the passed color
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _parse(color) {
        // give "%"" away from hsl values
        color = color.replace(/\%/gm, '');
        // parse the color
        color = (0, color_1.__convert)(color, 'hsla');
        // assign new color values
        this.h = color.h;
        this.s = color.s;
        this.l = color.l;
        this.a = color.a;
        // return the parsed color
        return color;
    }
    /**
     * @name              convert2
     * @type              Function
     * @private
     *
     * Concert color
     *
     * @param       	{string}      	format 	      	The format wanted as output like (rgba,hsla and hex)
     * @values        rgba, hsla, hex
     * @return      	{object} 	                			The color in wanted object format
     *
     * @example           js
     * myColor._convert2('rgba');
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _convert2(format) {
        switch (format) {
            case 'rgba':
            case 'rgb':
                return (0, color_1.__hslaToRgba)(this._h, this._s, this._l, this._a);
                break;
            case 'hsla':
            case 'hsl':
                return {
                    h: this._h,
                    s: this._s,
                    l: this._l,
                    a: this._a,
                };
                break;
            case 'hexa':
                return (0, color_1.__hslaToHexa)(this._h, this._s, this._l, this._a);
                break;
            case 'hex':
                return (0, color_1.__hslaToHex)(this._h, this._s, this._l);
                break;
        }
    }
    /**
     * @name                toHex
     * @type                Function
     *
     * To hex
     *
     * @return 	{string} 		The hex string representation
     *
     * @example           js
     * myColor.toHex();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHex() {
        return this._convert2('hex');
    }
    /**
     * @name                toHexa
     * @type                Function
     *
     * To hex
     *
     * @return 	{string} 		The hex string representation
     *
     * @example           js
     * myColor.toHexa();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHexa() {
        return this._convert2('hexa');
    }
    /**
     * @name            toHsl
     * @type            Function
     *
     * To hsl
     *
     * @return 	{object} 		The hsl object representation
     *
     * @example       js
     * myColor.toHsl();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHsl() {
        return this._convert2('hsl');
    }
    /**
     * @name            toHsla
     * @type            Function
     *
     * To hsla
     *
     * @return 	{object} 		The hsla object representation
     *
     * @example       js
     * myColor.toHsla();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHsla() {
        return this._convert2('hsla');
    }
    /**
     * @name            toRgb
     * @type            Function
     *
     * To rgb
     *
     * @return 	{object} 		The rgb object representation
     *
     * @example         js
     * myColor.toRgb();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toRgb() {
        return this._convert2('rgb');
    }
    /**
     * @name            toRgba
     * @type            Function
     *
     * To rgba
     *
     * @return 	{object} 		The rgba object representation
     *
     * @example         js
     * myColor.toRgba();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toRgba() {
        return this._convert2('rgba');
    }
    /**
     * @name            r
     * @type            Number
     *
     * Get/set the red value
     *
     * @example         js
     * myColor.r;
     * myColor.r = 128;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get r() {
        return this._r;
    }
    set r(value) {
        // protect
        value = parseInt(value);
        value = value > 255 ? 255 : value < 0 ? 0 : value;
        // apply
        this._r = value;
        this._applyFromRgbaUpdate();
    }
    /**
     * @name              g
     * @type              Number
     *
     * Get/set the green value
     *
     * @example         js
     * myColor.g;
     * myColor.g = 20;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get g() {
        return this._g;
    }
    set g(value) {
        // protect
        value = parseInt(value);
        value = value > 255 ? 255 : value < 0 ? 0 : value;
        // apply
        this._g = value;
        this._applyFromRgbaUpdate();
    }
    /**
     * @name              b
     * @type              Number
     *
     * Get/set the blue value
     *
     * @example           js
     * myColor.b;
     * myColor.b = 30;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get b() {
        return this._b;
    }
    set b(value) {
        // protect
        value = parseInt(value);
        value = value > 255 ? 255 : value < 0 ? 0 : value;
        // apply
        this._b = value;
        this._applyFromRgbaUpdate();
    }
    /**
     * @name              a
     * @type              Number
     *
     * Get/set the alpha value
     *
     * @example       js
     * myColor.a;
     * myColor.a = 20;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get a() {
        return this._a;
    }
    set a(value) {
        value = parseFloat(value);
        value = value > 1 ? 1 : value < 0 ? 0 : value;
        this._a = value;
    }
    /**
     * @name              h
     * @type              Number
     *
     * Get/set the hue
     *
     * @example         js
     * myColor.h;
     * myColor.h = 30;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get h() {
        return this._h;
    }
    set h(value) {
        // protect
        value = parseInt(value);
        value = value > 360 ? 360 : value < 0 ? 0 : value;
        // apply
        this._h = value;
        this._applyFromHslaUpdate();
    }
    /**
     * @name              s
     * @type              Number
     *
     * The saturation value
     *
     * @example         js
     * myColor.s;
     * myColor.s = 20;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get s() {
        return this._s;
    }
    set s(value) {
        // protect
        value = parseInt(value);
        value = value > 100 ? 100 : value < 0 ? 0 : value;
        // apply
        this._s = value;
        this._applyFromHslaUpdate();
    }
    /**
     * @name              l
     * @type              Number
     *
     * The luminence value
     *
     * @example             js
     * myColor.l;
     * myColor.l = 10;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get l() {
        return this._l;
    }
    set l(value) {
        // protect
        value = parseInt(value);
        value = value > 100 ? 100 : value < 0 ? 0 : value;
        // apply
        this._l = value;
        this._applyFromHslaUpdate();
    }
    /**
     * @name          clone
     * @type          Function
     *
     * Clone the SColor instance
     *
     * @example         js
     * myColor.clone();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    clone() {
        const newColor = new SColor({
            h: this._h,
            s: this._s,
            l: this._l,
            a: this._a,
        });
        return newColor;
    }
    /**
     * @name          reset
     * @type          Function
     *
     * Reset to the original color
     *
     * @example         js
     * myColor.reset();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    reset() {
        // parse again the color
        this._parse(this._originalSColor);
    }
    _applyFromHslaUpdate() {
        // convert
        const rgba = (0, color_1.__hslaToRgba)(this._h, this._s, this._l, this._a);
        this._r = rgba.r;
        this._g = rgba.g;
        this._b = rgba.b;
        this._a = rgba.a;
    }
    _applyFromRgbaUpdate() {
        // convert
        const hsla = (0, color_1.__rgbaToHsla)(this._r, this._g, this._b, this._a);
        this._h = hsla.h;
        this._s = hsla.s;
        this._l = hsla.l;
        this._a = hsla.a;
    }
    /**
     * @name          apply
     * @type          Function
     *
     * This method allows you to apply some updated to your color
     * using the parameters defined in the SColorApplyInterface like
     * for example "saturate", "desaturate", etc...
     *
     * @param         {String|ISColorApplyParams}          params       The parameters you want to apply
     * @return        {SColor}                    Returns you the same instance to maintain chainability
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    apply(params) {
        // process params
        const intRes = SColorApplyParamsInterface_1.default.apply(params);
        params = intRes;
        let colorInstance = this;
        Object.keys(params).forEach((action) => {
            const value = params[action];
            if (!value)
                return;
            if (!colorInstance[action] ||
                typeof colorInstance[action] !== 'function')
                return;
            if (action === 'invert') {
                colorInstance.invert();
            }
            else {
                colorInstance[action](value);
            }
        });
        return colorInstance;
    }
    /**
     * @name                desaturate
     * @type                Function
     *
     * Desaturate
     *
     * @param         	{Number} 	          amount 	        	The amount of desaturation wanted between 0-100
     * @return 	        {SColor} 			                      	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.desaturate(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    desaturate(amount) {
        amount = parseInt(amount);
        this.s -= amount;
        return this;
    }
    /**
     * @name                saturate
     * @type                Function
     *
     * Saturate
     *
     * @param         	{Number}        	amount 	            	The amount of saturation wanted between 0-100
     * @return 	        {SColor} 			                         	A new SColor instance or the actual one
     *
     * @example         js
     * myColor.saturate(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    saturate(amount) {
        amount = parseInt(amount);
        this.s += amount;
        return this;
    }
    /**
     * @name                      grayscale
     * @type                      Function
     *
     * Return a new SColor instance of the color to grayscale
     *
     * @return 	{SColor} 			A new SColor instance or the actual one
     *
     * @example           js
     * myColor.grayscale();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    grayscale() {
        this.s = 0;
        return this;
    }
    /**
     * @name              spin
     * @type              Function
     *
     * Spin the hue on the passed value (max 360)
     *
     * @param             	{Number}            	amount 		          	The amount of hue spin wanted between 0-360
     * @return 	            {SColor} 				                          	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.spin(230);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    spin(amount) {
        amount = parseInt(amount);
        const hue = this.h;
        let newHue = hue + amount;
        if (newHue > 360) {
            newHue -= 360;
        }
        this.h = newHue;
        return this;
    }
    /**
     * @name                alpha
     * @type                Function
     *
     * Set the alpha
     *
     * @param           	{Number} 	            alpha 		            	The new alpha value to apply between 0-100|0-1
     * @return          	{SColor} 					                            A new SColor instance or the actual one
     *
     * @example           js
     * myColor.alpha(10);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    alpha(alpha) {
        alpha = parseFloat(alpha);
        this.a = alpha;
        return this;
    }
    /**
     * @name                  darken
     * @type                  Function
     *
     * Darken
     *
     * @param                 	{Number} 	                amount 	                	The amount of darkness (of the nightmare of the shadow) to apply between 0-100
     * @return                	{SColor} 				                                    A new SColor instance or the actual one
     *
     * @example             js
     * myColor.darken(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    darken(amount) {
        amount = parseInt(amount);
        this.l -= amount;
        if (this.l < 0)
            this.l = 0;
        else if (this.l > 100)
            this.l = 100;
        return this;
    }
    /**
     * @name                      lighten
     * @type                      Function
     *
     * Lighten
     *
     * @param 	              {Number} 	              amount 	                	The amount of lightness (of the sky of the angels) to apply between 0-100
     * @return                	{SColor} 			                                  	A new SColor instance or the actual one
     *
     * @example             js
     * myColor.lighten(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    lighten(amount) {
        amount = parseInt(amount);
        this.l += amount;
        if (this.l < 0)
            this.l = 0;
        else if (this.l > 100)
            this.l = 100;
        return this;
    }
    /**
     * @name                invert
     * @type                Function
     *
     * Calculate the best color value that will have the best contrast ratio
     *
     * @return      {SColor}              The SColor instance that represent this new color
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    invert() {
        let lightness = this.l;
        if (this.l >= 50) {
            lightness -= 50;
        }
        else {
            lightness += 50;
        }
        this.l = lightness;
        if (this.l < 0)
            this.l = 0;
        else if (this.l > 100)
            this.l = 100;
        return this;
    }
    /**
     * @name                  toObject
     * @type                  Function
     *
     * To simple json object. This object can be injected in the constructor to recover the same color
     *
     * @return 	            {object} 	              	The object representation of the color (r,g,b,a,h,s,l)
     *
     * @example           js
     * myColor.toObject();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject() {
        return {
            h: this.h,
            l: this.l,
            s: this.s,
            r: this.r,
            g: this.b,
            b: this.b,
            a: this.a,
            hex: this.toHexString(),
            hexa: this.toHexaString(),
            rgb: this.toRgbString(),
            rgba: this.toRgbaString(),
            hsl: this.toHslString(),
            hsla: this.toHslaString(),
        };
    }
    /**
     * @name                  toHexString
     * @type                  Function
     *
     * To hex string
     *
     * @return 	            {string} 	              	The hex string representation of the color
     *
     * @example           js
     * myColor.toHexString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHexString() {
        return this._convert2('hex');
    }
    /**
     * @name                  toHexaString
     * @type                  Function
     *
     * To hex string
     *
     * @return 	            {string} 	              	The hex string representation of the color
     *
     * @example           js
     * myColor.toHexaString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHexaString() {
        return this._convert2('hexa');
    }
    /**
     * @name                  toRgbString
     * @type                  Function
     *
     * To rgb string
     *
     * @return 	              {string} 	              	The rgb string representation of the color
     *
     * @example           js
     * myColor.toRgbString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toRgbString() {
        return `rgb(${this._r},${this._g},${this._b})`;
    }
    /**
     * @name                  toRgbaString
     * @type                  Function
     *
     * To rgba string
     *
     * @return 	              {string} 	              	The rgba string representation of the color
     *
     * @example           js
     * myColor.toRgbaString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toRgbaString() {
        return `rgba(${this._r},${this._g},${this._b},${this._a})`;
    }
    /**
     * @name                    toHslString
     * @type                    Function
     *
     * To hsl string
     *
     * @return 	              {string} 	              	The hsl string representation of the color
     *
     * @example             js
     * myColor.toHslString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHslString() {
        const hsl = this._convert2('hsl');
        return `hsl(${hsl.h},${hsl.s},${hsl.l})`;
    }
    /**
     * @name                    toHslaString
     * @type                    Function
     *
     * To hsla string
     *
     * @return 	              {string} 	              	The hsl string representation of the color
     *
     * @example             js
     * myColor.toHslaString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toHslaString() {
        const hsla = this._convert2('hsla');
        return `hsla(${hsla.h},${hsla.s},${hsla.l},${hsla.a})`;
    }
    /**
     * @name                toString
     * @type                Function
     *
     * To string
     *
     * @param       {String}              [format=this.settings.format]                The format you want back
     * @values        hex,hsl,rgba
     * @return 	      {string} 		                                                      The rgba string representation of the color
     *
     * @example         js
     * myColor.toString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString(format = this.settings.format) {
        switch (format) {
            case 'hex':
                return this.toHexString();
                break;
            case 'hsl':
                return this.toHslString();
                break;
            case 'hsla':
                return this.toHslaString();
                break;
            case 'rgb':
                return this.toRgbString();
                break;
            case 'rgba':
            default:
                return this.toRgbaString();
                break;
        }
    }
}
/**
 * @name                colors
 * @type                Object
 * @protected
 * @static
 *
 * Static color names map
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SColor.colors = {};
// export class
exports.default = SColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3QyxxREFNbUM7QUFDbkMsdURBQXlEO0FBQ3pELHdHQUFrRjtBQUNsRixrR0FBNEU7QUFFNUUsZ0RBQTJEO0FBa0czRCxNQUFNLE1BQU8sU0FBUSxpQkFBUTtJQUN6Qjs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUNsQixNQUF1QixFQUN2QixNQUF1QjtRQUV2QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QixNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxNQUFNLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN6QztRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksbUJBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFaEQsTUFBTSxpQkFBaUIsR0FBRztZQUN0QixVQUFVLEVBQUU7Z0JBQ1IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSzthQUNuQztZQUNELFVBQVUsRUFBRTtnQkFDUixDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN4QixDQUFDLEVBQUUsUUFB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