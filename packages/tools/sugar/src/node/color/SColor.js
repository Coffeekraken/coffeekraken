"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const rgba2hex_1 = __importDefault(require("./rgba2hex"));
const hsv2rgba_1 = __importDefault(require("./hsv2rgba"));
const hsl2rgba_1 = __importDefault(require("./hsl2rgba"));
const rgba2hsv_1 = __importDefault(require("./rgba2hsv"));
const rgba2hsl_1 = __importDefault(require("./rgba2hsl"));
const convert_1 = __importDefault(require("./convert"));
/**
 * @name 		SColor
 * @namespace           sugar.js.color
 * @type    Class
 * @status              beta
 *
 * Class that provide complete and simple to use color manupilation capabilities like:
 * - Modifiers
 * 	- opacity
 * 	- darken
 * 	- lighten
 * 	- desaturate
 * 	- saturate
 * 	- spin (change hue)
 * 	- transparentize
 * 	- alpha
 * 	- grayscale
 * - Conversions
 * 	- rgba
 * 	- hsl
 * 	- hsv
 * 	- hex
 * - Print out formats
 * 	- toRgbaString
 * 	- toHslString
 * 	- toHsvString
 * 	- toHexString
 * 	- toString(format = null)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import SColor from '@coffeekraken/sugar/js/classes/SColor'
 * let myColor = new SColor(#ff0000);
 * // get a lighter color
 * let ligtherColor = myColor.lighten(20);
 * // print the color to rgba
 * console.log(lighterColor.toRgbaString());
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SColor {
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @param   {object}    color     The color description like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})
     * @param       {Object}        [settings={}]         The settings to configure the SColor instance. Here's the available settings:
     * - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
     * - defaultFormat (hex) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
     * @return    {object}            The color instance
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(color, settings = {}) {
        /**
         * @name                _originalSColor
         * @type                Object
         * @private
         *
         * Original color value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._originalSColor = null;
        /**
         * @name            _r
         * @type            Number
         * @private
         *
         * Internal red value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._r = null;
        /**
         * @name                _g
         * @type                Number
         * @private
         *
         * Internal green value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._g = null;
        /**
         * @name                  _b
         * @type                  Number
         * @private
         *
         * Internal blue value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._b = null;
        /**
         * @name              _a
         * @type              Number
         * @private
         *
         * Internal alpha value
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._a = 1;
        /**
         * @name                  _settings
         * @type                  Object
         * @private
         *
         * Store the settings passed to the constructor. Here's the list of available settings:
         * - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
         * - defaultFormat (hex) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // save the instance settings
        this._settings = deepMerge_1.default({
            returnNewInstance: false,
            defaultFormat: 'hex'
        }, settings);
        // get the actual real color
        color = this.getColor(color);
        // save the original color
        this._originalSColor = color;
        // parse the input color to
        // split into rgba values
        this._parse(color);
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
     * @param       {object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})
     * @return      {object}                  The rgba representation of the passed color
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _parse(color) {
        // parse the color
        color = convert_1.default(color, 'rgba');
        // assign new color values
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
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
     * @param       	{string}      	format 	      	The format wanted as output like (rgba,hsl,hsv and hex)
     * @values        rgba, hsl, hsv, hex
     * @return      	{object} 	                			The color in wanted object format
     *
     * @example           js
     * myColor._convert2('rgba');
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _convert2(format) {
        switch (format) {
            case 'rgba':
                return {
                    r: this.r,
                    g: this.g,
                    b: this.b,
                    a: this.a
                };
                break;
            case 'hsl':
                return rgba2hsl_1.default(this.r, this.g, this.b, this.a);
                break;
            case 'hsv':
                return rgba2hsv_1.default(this.r, this.g, this.b, this.a);
                break;
            case 'hex':
                return rgba2hex_1.default(this.r, this.g, this.b, this.a);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toHex() {
        return this._convert2('hex');
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toHsl() {
        return this._convert2('hsl');
    }
    /**
     * @name              toHsv
     * @type              Function
     *
     * To hsv
     *
     * @return 	{object} 		The hsv object representation
     *
     * @example         js
     * myColor.toHsv();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toHsv() {
        return this._convert2('hsv');
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get r() {
        return this._r;
    }
    set r(value) {
        value = parseInt(value);
        value = value > 255 ? 255 : value;
        this._r = value;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get g() {
        return this._g;
    }
    set g(value) {
        value = parseInt(value);
        value = value > 255 ? 255 : value;
        this._g = value;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get b() {
        return this._b;
    }
    set b(value) {
        value = parseInt(value);
        value = value > 255 ? 255 : value;
        this._b = value;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get a() {
        return this._a;
    }
    set a(value) {
        value = parseFloat(value);
        value = value > 1 ? (1 / 100) * value : value;
        value = value > 1 ? 1 : value;
        this._a = value;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get l() {
        return this._convert2('hsl').l;
    }
    set l(value) {
        const hsl = this._convert2('hsl');
        value = parseInt(value);
        value = value > 100 ? 100 : value;
        hsl.l = value;
        const rgba = hsl2rgba_1.default(hsl.h, hsl.s, hsl.l);
        this.r = rgba.r;
        this.g = rgba.g;
        this.b = rgba.b;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get s() {
        return this._convert2('hsl').s;
    }
    set s(value) {
        const hsl = this._convert2('hsl');
        value = parseInt(value);
        value = value > 100 ? 100 : value;
        hsl.s = value;
        const rgba = hsl2rgba_1.default(hsl.h, hsl.s, hsl.l);
        this.r = rgba.r;
        this.g = rgba.g;
        this.b = rgba.b;
    }
    /**
     * @name                  v
     * @type                  Number
     *
     * The value of the HSV format
     *
     * @example         js
     * myColor.v;
     * myColor.v = 20;
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get v() {
        return this._convert2('hsv').v;
    }
    set v(value) {
        const hsv = this._convert2('hsv');
        value = parseInt(value);
        value = value > 100 ? 100 : value;
        hsv.v = value;
        const rgba = hsv2rgba_1.default(hsv.h, hsv.s, hsv.v);
        this.r = rgba.r;
        this.g = rgba.g;
        this.b = rgba.b;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get h() {
        return this._convert2('hsl').h;
    }
    set h(value) {
        const hsl = this._convert2('hsl');
        value = parseInt(value);
        value = value > 360 ? 360 : value;
        hsl.h = value;
        const rgba = hsl2rgba_1.default(hsl.h, hsl.s, hsl.l);
        this.r = rgba.r;
        this.g = rgba.g;
        this.b = rgba.b;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    reset() {
        // parse again the color
        this._parse(this._originalSColor);
    }
    /**
     * @name                desaturate
     * @type                Function
     *
     * Desaturate
     *
     * @param         	{Number} 	          amount 	        	The amount of desaturation wanted between 0-100
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	        {SColor} 			                      	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.desaturate(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    desaturate(amount, returnNewInstance = this._settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.s -= amount;
            return n;
        }
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
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	        {SColor} 			                         	A new SColor instance or the actual one
     *
     * @example         js
     * myColor.saturate(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    saturate(amount, returnNewInstance = this._settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.s += amount;
            return n;
        }
        this.s += amount;
        return this;
    }
    /**
     * @name                      grayscale
     * @type                      Function
     *
     * Return a new SColor instance of the color to grayscale
     *
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	{SColor} 			A new SColor instance or the actual one
     *
     * @example           js
     * myColor.grayscale();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    grayscale(returnNewInstance = this._settings.returnNewInstance) {
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.s = 0;
            return n;
        }
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
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	            {SColor} 				                          	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.spin(230);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    spin(amount, returnNewInstance = this._settings.returnNewInstance) {
        amount = parseInt(amount);
        const hue = this.h;
        let newHue = hue + amount;
        if (newHue > 360) {
            newHue -= 360;
        }
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.h = newHue;
            return n;
        }
        this.h = newHue;
        return this;
    }
    /**
     * @name              transparentize
     * @type              Function
     *
     * Transparentize
     *
     * @param             	{Number} 	          	amount 		          	The amount of transparence to apply between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return            	{SColor} 					                        	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.transparenize(30);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    transparentize(amount, returnNewInstance = this._settings.returnNewInstance) {
        amount = parseFloat(amount);
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.a -= amount;
            return n;
        }
        this.a -= amount;
        return this;
    }
    /**
     * @name                alpha
     * @type                Function
     *
     * Set the alpha
     *
     * @param           	{Number} 	            alpha 		            	The new alpha value to apply between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return          	{SColor} 					                            A new SColor instance or the actual one
     *
     * @example           js
     * myColor.alpha(10);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    alpha(alpha, returnNewInstance = this._settings.returnNewInstance) {
        alpha = parseFloat(alpha);
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.a = alpha;
            return n;
        }
        this.a = alpha;
        return this;
    }
    /**
     * @name                  opacity
     * @type                  Function
     *
     * Set the opacity (alias for alpha)
     *
     * @param 	                {Number}          	opacity 	              	The new opacity value to apply between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 			                            		A new SColor instance or the actual one
     *
     * @example               js
     * myColor.opacity(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    opacity(opacity, returnNewInstance = this._settings.returnNewInstance) {
        return this.alpha(opacity, returnNewInstance);
    }
    /**
     * @name                  opacify
     * @type                  Function
     *
     * Opacify
     *
     * @param 	          {Number} 	            amount 		              The amount of transparence to remove between 0-100|0-1
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return          	{SColor} 			                              	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.opacify(18);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    opacify(amount, returnNewInstance = this._settings.returnNewInstance) {
        amount = parseFloat(amount);
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.a += amount;
            return n;
        }
        this.a += amount;
        return this;
    }
    /**
     * @name                  darken
     * @type                  Function
     *
     * Darken
     *
     * @param                 	{Number} 	                amount 	                	The amount of darkness (of the nightmare of the shadow) to apply between 0-100
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 				                                    A new SColor instance or the actual one
     *
     * @example             js
     * myColor.darken(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    darken(amount, returnNewInstance = this._settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.l -= amount;
            return n;
        }
        this.l -= amount;
        return this;
    }
    /**
     * @name                      lighten
     * @type                      Function
     *
     * Lighten
     *
     * @param 	              {Number} 	              amount 	                	The amount of lightness (of the sky of the angels) to apply between 0-100
     * @param           {Boolean}           [returnNewInstance=this._settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 			                                  	A new SColor instance or the actual one
     *
     * @example             js
     * myColor.lighten(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    lighten(amount, returnNewInstance = this._settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = new SColor(this.toHex());
            n.l += amount;
            return n;
        }
        this.l += amount;
        return this;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toHexString() {
        return this._convert2('hex');
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toHslString() {
        const hsl = this._convert2('hsl');
        return `hsl(${hsl.h},${hsl.s},${hsl.l})`;
    }
    /**
     * @name                      toHsvString
     * @type                      Function
     *
     * To hsv string
     *
     * @return              	{string} 	              	The hsv string representation of the color
     *
     * @example           js
     * myColor.toHsvString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toHsvString() {
        const hsv = this._convert2('hsv');
        return `hsv(${hsv.h},${hsv.s},${hsv.v})`;
    }
    /**
     * @name                toString
     * @type                Function
     *
     * To string
     *
     * @param       {String}              [format=this._settings.defaultFormat]                The format you want back
     * @values        hex,hsl,hsv,rgba
     * @return 	      {string} 		                                                      The rgba string representation of the color
     *
     * @example         js
     * myColor.toString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toString(format = this._settings.defaultFormat) {
        switch (format) {
            case 'hex':
                return this.toHexString();
                break;
            case 'hsl':
                return this.toHslString();
                break;
            case 'hsv':
                return this.toHsvString();
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SColor.colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    'indianred ': '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
};
module.exports = SColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLG9FQUE4QztBQUk5QywwREFBb0M7QUFFcEMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUNwQywwREFBb0M7QUFDcEMsMERBQW9DO0FBRXBDLHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUVILE1BQU0sTUFBTTtJQThOVjs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsWUFBWSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFsRmhDOzs7Ozs7OztXQVFHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkI7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBRVY7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBRVY7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBRVY7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVA7Ozs7Ozs7Ozs7V0FVRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFpQmIsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLGFBQWEsRUFBRSxLQUFLO1NBQ3JCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRiw0QkFBNEI7UUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0IsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBRTdCLDJCQUEyQjtRQUMzQix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixD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LEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7UUFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7UUFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7UUFDVCxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5QyxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxL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