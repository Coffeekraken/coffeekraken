// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "./rgba2hex", "./hsv2rgba", "./hsl2rgba", "./rgba2hsv", "./rgba2hsl", "./convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const rgba2hex_1 = __importDefault(require("./rgba2hex"));
    const hsv2rgba_1 = __importDefault(require("./hsv2rgba"));
    const hsl2rgba_1 = __importDefault(require("./hsl2rgba"));
    const rgba2hsv_1 = __importDefault(require("./rgba2hsv"));
    const rgba2hsl_1 = __importDefault(require("./rgba2hsl"));
    const convert_1 = __importDefault(require("./convert"));
    /**
     * @name 		SColor
     * @namespace            js.color
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
         * @param       {Object}        [settings={}]         The settings to configure the SColor instance. Here's the available settings:
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
    // // inject sugar css colors into class
    // __domReady(() => {
    //   // get settings
    //   if (!__settings || !__settings.colors) return;
    //   // loop on each colors
    //   for (let colorName in __settings.colors) {
    //     const color = __settings.colors[colorName];
    //     if (!color) return;
    //     if (color.color) {
    //       SColor.colors[colorName] = color.color;
    //     }
    //     // modifiers
    //     if (color.modifiers) {
    //       // loop on modifiers
    //       for (let modifierName in color.modifiers) {
    //         const modifierColor = color.modifiers[modifierName];
    //         SColor.colors[`${colorName}--${modifierName}`] = modifierColor;
    //       }
    //     }
    //   }
    // });
    // export class
    exports.default = SColor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUk5QywwREFBb0M7SUFFcEMsMERBQW9DO0lBQ3BDLDBEQUFvQztJQUNwQywwREFBb0M7SUFDcEMsMERBQW9DO0lBRXBDLHdEQUFrQztJQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJDRztJQUVILE1BQU0sTUFBTTtRQThOVjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsWUFBWSxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFsRmhDOzs7Ozs7OztlQVFHO1lBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7WUFFdkI7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1lBRVY7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1lBRVY7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1lBRVY7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVA7Ozs7Ozs7Ozs7ZUFVRztZQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7WUFpQmIsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsYUFBYSxFQUFFLEtBQUs7YUFDckIsRUFDRCxRQUFRLENBQ1QsQ0FBQztZQUVGLDRCQUE0QjtZQUM1QixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU3QiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFFN0IsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JC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QUMsQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLO1lBQ1QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLO1lBQ1QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLO1lBQ1QsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDOUMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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