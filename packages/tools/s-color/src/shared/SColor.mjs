// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __rgba2hex from '@coffeekraken/sugar/shared/color/rgba2hex';
import __hsv2rgba from '@coffeekraken/sugar/shared/color/hsv2rgba';
import __hsl2rgba from '@coffeekraken/sugar/shared/color/hsl2rgba';
import __rgba2hsv from '@coffeekraken/sugar/shared/color/rgba2hsv';
import __rgba2hsl from '@coffeekraken/sugar/shared/color/rgba2hsl';
import __convert from '@coffeekraken/sugar/shared/color/convert';
import __SClass from '@coffeekraken/s-class';
import __SColorApplyParamsInterface from './interface/SColorApplyParamsInterface';
class SColor extends __SClass {
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
        super(__deepMerge({
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
        color = __convert(color, 'rgba');
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
                return __rgba2hsl(this.r, this.g, this.b, this.a);
                break;
            case 'hsv':
                return __rgba2hsv(this.r, this.g, this.b, this.a);
                break;
            case 'hex':
                return __rgba2hex(this.r, this.g, this.b, this.a);
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
        const rgba = __hsl2rgba(hsl.h, hsl.s, hsl.l);
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
        const rgba = __hsl2rgba(hsl.h, hsl.s, hsl.l);
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
        const rgba = __hsv2rgba(hsv.h, hsv.s, hsv.v);
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
        const rgba = __hsl2rgba(hsl.h, hsl.s, hsl.l);
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
        const intRes = __SColorApplyParamsInterface.apply(params);
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
        let lightness = this.l;
        if (this.l >= 50) {
            lightness -= 50;
        }
        else {
            lightness += 50;
        }
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
export default SColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvcy1jb2xvci9zcmMvc2hhcmVkL1NDb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFJdEUsT0FBTyxVQUFVLE1BQU0sMkNBQTJDLENBQUM7QUFFbkUsT0FBTyxVQUFVLE1BQU0sMkNBQTJDLENBQUM7QUFDbkUsT0FBTyxVQUFVLE1BQU0sMkNBQTJDLENBQUM7QUFDbkUsT0FBTyxVQUFVLE1BQU0sMkNBQTJDLENBQUM7QUFDbkUsT0FBTyxVQUFVLE1BQU0sMkNBQTJDLENBQUM7QUFFbkUsT0FBTyxTQUFTLE1BQU0sMENBQTBDLENBQUM7QUFDakUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyw0QkFBNEIsTUFBTSx3Q0FBd0MsQ0FBQztBQTJEbEYsTUFBTSxNQUFPLFNBQVEsUUFBUTtJQStOM0I7Ozs7Ozs7T0FPRztJQUNILFlBQVksS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzlCLDZCQUE2QjtRQUM3QixLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLGFBQWEsRUFBRSxLQUFLO2FBQ3JCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBekZKOzs7Ozs7OztXQVFHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkI7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBRVY7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBRVY7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsSUFBSSxDQUFDO1FBRVY7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFFLEdBQUcsQ0FBQyxDQUFDO1FBc0NMLDRC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QUNKLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7UUFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7UUFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELElBQUksQ0FBQyxDQUFDLEtBQUs7UUFDVCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxPQUFPLElBQUksQ0FB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