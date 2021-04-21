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
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/color/rgba2hex", "@coffeekraken/sugar/shared/color/hsv2rgba", "@coffeekraken/sugar/shared/color/hsl2rgba", "@coffeekraken/sugar/shared/color/rgba2hsv", "@coffeekraken/sugar/shared/color/rgba2hsl", "@coffeekraken/sugar/shared/color/convert", "@coffeekraken/s-class", "./interface/SColorApplyParamsInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const rgba2hex_1 = __importDefault(require("@coffeekraken/sugar/shared/color/rgba2hex"));
    const hsv2rgba_1 = __importDefault(require("@coffeekraken/sugar/shared/color/hsv2rgba"));
    const hsl2rgba_1 = __importDefault(require("@coffeekraken/sugar/shared/color/hsl2rgba"));
    const rgba2hsv_1 = __importDefault(require("@coffeekraken/sugar/shared/color/rgba2hsv"));
    const rgba2hsl_1 = __importDefault(require("@coffeekraken/sugar/shared/color/rgba2hsl"));
    const convert_1 = __importDefault(require("@coffeekraken/sugar/shared/color/convert"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const SColorApplyParamsInterface_1 = __importDefault(require("./interface/SColorApplyParamsInterface"));
    class SColor extends s_class_1.default {
        /**
         * @name                  constructor
         * @type                  Function
         *
         * Constructor
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(color, settings = {}) {
            // save the instance settings
            super(deepMerge_1.default({
                color: {
                    returnNewInstance: false,
                    defaultFormat: 'hex'
                }
            }, settings));
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
            // get the actual real color
            color = this.getColor(color);
            // save the original color
            this._originalSColor = color;
            // parse the input color to
            // split into rgba values
            this._parse(color);
        }
        /**
         * @name          colorSettings
         * @type          ISColorSettings
         * @get
         *
         * Access the color settings
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get colorSettings() {
            return this._settings.color;
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
         * @name          apply
         * @type          Function
         *
         * This method allows you to apply some updated to your color
         * using the parameters defined in the SColorApplyInterface like
         * for example "saturate", "desaturate", etc...
         *
         * @param         {String|ISColorApplyParams}          params       The parameters you want to apply
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return        {SColor}                    Returns you either the same instance or a new one depending on the settings ```returnNewInstance```
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        apply(params, returnNewInstance = this.colorSettings.returnNewInstance) {
            // process params
            const intRes = SColorApplyParamsInterface_1.default.apply(params);
            if (intRes.hasIssues())
                throw new Error(intRes.toString());
            params = intRes.value;
            let colorInstance = this;
            if (returnNewInstance) {
                colorInstance = new SColor(this.toHex());
            }
            Object.keys(params).forEach((action) => {
                const value = params[action];
                if (!value)
                    return;
                if (!colorInstance[action] || typeof colorInstance[action] !== 'function')
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return 	        {SColor} 			                      	A new SColor instance or the actual one
         *
         * @example           js
         * myColor.desaturate(20);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        desaturate(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return 	        {SColor} 			                         	A new SColor instance or the actual one
         *
         * @example         js
         * myColor.saturate(20);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        saturate(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return 	{SColor} 			A new SColor instance or the actual one
         *
         * @example           js
         * myColor.grayscale();
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        grayscale(returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return 	            {SColor} 				                          	A new SColor instance or the actual one
         *
         * @example           js
         * myColor.spin(230);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        spin(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return            	{SColor} 					                        	A new SColor instance or the actual one
         *
         * @example           js
         * myColor.transparenize(30);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        transparentize(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return          	{SColor} 					                            A new SColor instance or the actual one
         *
         * @example           js
         * myColor.alpha(10);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        alpha(alpha, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return                	{SColor} 			                            		A new SColor instance or the actual one
         *
         * @example               js
         * myColor.opacity(20);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        opacity(opacity, returnNewInstance = this.colorSettings.returnNewInstance) {
            return this.alpha(opacity, returnNewInstance);
        }
        /**
         * @name                  opacify
         * @type                  Function
         *
         * Opacify
         *
         * @param 	          {Number} 	            amount 		              The amount of transparence to remove between 0-100|0-1
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return          	{SColor} 			                              	A new SColor instance or the actual one
         *
         * @example           js
         * myColor.opacify(18);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        opacify(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return                	{SColor} 				                                    A new SColor instance or the actual one
         *
         * @example             js
         * myColor.darken(20);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        darken(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @param           {Boolean}           [returnNewInstance=this.colorSettings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
         * @return                	{SColor} 			                                  	A new SColor instance or the actual one
         *
         * @example             js
         * myColor.lighten(20);
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        lighten(amount, returnNewInstance = this.colorSettings.returnNewInstance) {
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
         * @name                invert
         * @type                Function
         *
         * Calculate the best color value that will have the best contrast ratio
         *
         * @param       {Boolean}       [returnNewInstance=this.colorSettings.returnNewInstance]      Specify if you want a new SColor instance back or update the current one
         * @return      {SColor}              The SColor instance that represent this new color
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        invert(returnNewInstance = this.colorSettings.returnNewInstance) {
            // if (returnNewInstance) {
            //   const n = new SColor(this.toHex());
            //   n.l += amount;
            //   return n;
            // }
            let lightness = this.l + 50;
            if (lightness > 100)
                lightness -= 100;
            if (returnNewInstance) {
                const n = new SColor(this.toHex());
                n.l = lightness;
                return n;
            }
            else {
                this.l = lightness;
            }
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
         * @param       {String}              [format=this.colorSettings.defaultFormat]                The format you want back
         * @values        hex,hsl,hsv,rgba
         * @return 	      {string} 		                                                      The rgba string representation of the color
         *
         * @example         js
         * myColor.toString();
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        toString(format = this.colorSettings.defaultFormat) {
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
    // export class
    exports.default = SColor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDRGQUFzRTtJQUl0RSx5RkFBbUU7SUFFbkUseUZBQW1FO0lBQ25FLHlGQUFtRTtJQUNuRSx5RkFBbUU7SUFDbkUseUZBQW1FO0lBRW5FLHVGQUFpRTtJQUNqRSxvRUFBNkM7SUFDN0Msd0dBQWtGO0lBMkRsRixNQUFNLE1BQU8sU0FBUSxpQkFBUTtRQStOM0I7Ozs7Ozs7V0FPRztRQUNILFlBQVksS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO1lBQzlCLDZCQUE2QjtZQUM3QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxLQUFLLEVBQUU7b0JBQ0wsaUJBQWlCLEVBQUUsS0FBSztvQkFDeEIsYUFBYSxFQUFFLEtBQUs7aUJBQ3JCO2FBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1lBekZKOzs7Ozs7OztlQVFHO1lBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7WUFFdkI7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1lBRVY7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1lBRVY7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1lBRVY7Ozs7Ozs7O2VBUUc7WUFDSCxPQUFFLEdBQUcsQ0FBQyxDQUFDO1lBc0NMLDRCQUE0QjtZQUM1QixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU3QiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFFN0IsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUE3Q0Q7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxhQUFhO1lBQ2YsT0FB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LEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7WUFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7WUFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNsQixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7WUFDVCxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUM5QyxLQUFLLEdBQUcsS0FBSyxH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