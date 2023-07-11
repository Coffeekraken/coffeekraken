// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __convert, __hslaToHex, __hslaToHexa, __hslaToRgba, __rgbaToHsla, } from '@coffeekraken/sugar/color';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SColorApplyParamsInterface from './interface/SColorApplyParamsInterface.js';
import __SColorSettingsInterface from './interface/SColorSettingsInterface.js';
import { Contrast } from './contrast/index.js';
class SColor extends __SClass {
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
        let color1Instance, color2Instance;
        if (typeof color1 === 'string') {
            color1Instance = new SColor(color1);
        }
        if (typeof color2 === 'string') {
            color2Instance = new SColor(color2);
        }
        const contrast = new Contrast(color1Instance.toHexaString(), color2Instance.toHexaString());
        const finalContrastInfo = {
            background: Object.assign({}, color2Instance.toObject()),
            foreground: Object.assign({}, color1Instance.toObject()),
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
        super(__deepMerge(
        // @ts-ignore
        __SColorSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
                const converted = __rgbaToHsla(color.r, color.g, color.b, (_d = color.a) !== null && _d !== void 0 ? _d : 1);
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
        color = __convert(color, 'hsla');
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
                return __hslaToRgba(this._h, this._s, this._l, this._a);
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
                return __hslaToHexa(this._h, this._s, this._l, this._a);
                break;
            case 'hex':
                return __hslaToHex(this._h, this._s, this._l);
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
        const rgba = __hslaToRgba(this._h, this._s, this._l, this._a);
        this._r = rgba.r;
        this._g = rgba.g;
        this._b = rgba.b;
        this._a = rgba.a;
    }
    _applyFromRgbaUpdate() {
        // convert
        const hsla = __rgbaToHsla(this._r, this._g, this._b, this._a);
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
        const intRes = __SColorApplyParamsInterface.apply(params);
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
export default SColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQ0gsU0FBUyxFQUNULFdBQVcsRUFDWCxZQUFZLEVBQ1osWUFBWSxFQUNaLFlBQVksR0FDZixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLDRCQUE0QixNQUFNLDJDQUEyQyxDQUFDO0FBQ3JGLE9BQU8seUJBQXlCLE1BQU0sd0NBQXdDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBa0cvQyxNQUFNLE1BQU8sU0FBUSxRQUFRO0lBQ3pCOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQ2xCLE1BQXVCLEVBQ3ZCLE1BQXVCO1FBRXZCLElBQUksY0FBYyxFQUFFLGNBQWMsQ0FBQztRQUVuQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QixjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QixjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FDekIsY0FBYyxDQUFDLFlBQVksRUFBRSxFQUM3QixjQUFjLENBQUMsWUFBWSxFQUFFLENBQ2hDLENBQUM7UUFDRixNQUFNLGlCQUFpQixHQUFHO1lBQ3RCLFVBQVUsb0JBQ0gsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUMvQjtZQUNELFVBQVUsb0JBQ0gsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUMvQjtZQUNELEtBQUssRUFBRSxRQUFRLENB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