// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __convert from '@coffeekraken/sugar/shared/color/convert';
import __hsla2hex from '@coffeekraken/sugar/shared/color/hsla2hex';
import __hsla2hexa from '@coffeekraken/sugar/shared/color/hsla2hexa';
import __hsla2rgba from '@coffeekraken/sugar/shared/color/hsla2rgba';
import __rgba2hsla from '@coffeekraken/sugar/shared/color/rgba2hsla';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SColorApplyParamsInterface from './interface/SColorApplyParamsInterface';
import __SColorSettingsInterface from './interface/SColorSettingsInterface';

/**
 * @name 		SColor
 * @namespace           shared
 * @type    Class
 * @extends         SClass
 * @status              beta
 *
 * Class that provide complete and simple to use color manupilation capabilities like:
 * - Modifiers
 * 	- lighten
 * 	- darken
 * 	- saturate
 * 	- desaturate
 * 	- spin (change hue)
 * 	- alpha
 * 	- opacity
 * 	- grayscale
 * - Conversions
 *  - rgb
 * 	- rgba
 *  - hsl
 * 	- hsla
 * 	- hex
 * - Print out formats
 *  - toRgbString
 * 	- toRgbaString
 * 	- toHslString
 *  - toHslaString
 * 	- toHexString
 * 	- toString(format = null)
 *
 * @param   {object}    color     The color description like (#ff0000 | rgba(...) | hsl(...) | {r:255,r:140,b:23,a:40})
 * @param       {ISColorSettings}        [settings={}]         The settings to configure the SColor instance. Here's the available settings:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import SColor from '@coffeekraken/s-color'
 * let myColor = new SColor(#ff0000);
 * // get a lighter color
 * let ligtherColor = myColor.lighten(20);
 * // print the color to rgba
 * console.log(lighterColor.toRgbaString());
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISColorSettings {
    returnNewInstance: boolean;
    defaultFormat: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
}

export interface ISColorObject {
    r: number;
    g: number;
    b: number;
    a: number;
    h: number;
    s: number;
    l: number;
}

class SColor extends __SClass {
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
    static colors = {
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
        yellowgreen: '#9acd32',
    };

    /**
     * @name                _originalSColor
     * @type                Object
     * @private
     *
     * Original color value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _originalSColor = null;

    /**
     * @name            _h
     * @type            Number
     * @private
     *
     * Internal hue value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _h = 0;

    /**
     * @name            _s
     * @type            Number
     * @private
     *
     * Internal saturation value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _s = 0;

    /**
     * @name            _l
     * @type            Number
     * @private
     *
     * Internal lightness value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _l = 0;

    /**
     * @name            _r
     * @type            Number
     * @private
     *
     * Internal red value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _r = 0;

    /**
     * @name                _g
     * @type                Number
     * @private
     *
     * Internal green value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _g = 0;

    /**
     * @name                  _b
     * @type                  Number
     * @private
     *
     * Internal blue value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _b = 0;

    /**
     * @name              _a
     * @type              Number
     * @private
     *
     * Internal alpha value
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _a = 1;

    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        color: string | Partial<ISColorObject>,
        settings?: Partial<ISColorSettings>,
    ) {
        // save the instance settings
        super(
            __deepMerge(
                // @ts-ignore
                __SColorSettingsInterface.defaults(),
                settings ?? {},
            ),
        );

        // get the actual real color
        color = this.getColor(color);

        // save the original color
        this._originalSColor = color;

        if (typeof color === 'string') {
            // parse the input color to
            // split into rgba values
            this._parse(color);
        } else {
            // we assume that the passed color is an object of type ISColorObject
            // so we construct our color from this
            if (
                color.h !== undefined &&
                color.s !== undefined &&
                color.l !== undefined
            ) {
                this._h = color.h;
                this._s = color.s;
                this._l = color.l;
                this._a = color.a ?? 1;
            } else if (
                color.r !== undefined &&
                color.g !== undefined &&
                color.b !== undefined
            ) {
                const converted = __rgba2hsla(
                    color.r,
                    color.g,
                    color.b,
                    color.a ?? 1,
                );
                this._h = converted.h;
                this._s = converted.s;
                this._l = converted.l;
                this._a = converted.a;
            } else {
                console.error(color);
                throw new Error(
                    'Sorry but this passed value is not a valid color object or string...',
                );
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
                return __hsla2rgba(this._h, this._s, this._l, this._a);
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
                return __hsla2hexa(this._h, this._s, this._l, this._a);
                break;
            case 'hex':
                return __hsla2hex(this._h, this._s, this._l);
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
        const rgba = __hsla2rgba(this._h, this._s, this._l, this._a);
        this._r = rgba.r;
        this._g = rgba.g;
        this._b = rgba.b;
        this._a = rgba.a;
    }
    _applyFromRgbaUpdate() {
        // convert
        const hsla = __rgba2hsla(this._r, this._g, this._b, this._a);
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
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return        {SColor}                    Returns you either the same instance or a new one depending on the settings ```returnNewInstance```
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    apply(
        params: string | ISColorApplyParams,
        returnNewInstance = this.settings.returnNewInstance,
    ): SColor {
        // process params
        const intRes = __SColorApplyParamsInterface.apply(params);
        params = intRes;

        let colorInstance = this;
        if (returnNewInstance) {
            colorInstance = new SColor(this.toHex());
        }

        Object.keys(params).forEach((action) => {
            const value = params[action];
            if (!value) return;
            if (
                !colorInstance[action] ||
                typeof colorInstance[action] !== 'function'
            )
                return;
            if (action === 'invert') {
                colorInstance.invert();
            } else {
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
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	        {SColor} 			                      	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.desaturate(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    desaturate(amount, returnNewInstance = this.settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = this.clone();
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
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	        {SColor} 			                         	A new SColor instance or the actual one
     *
     * @example         js
     * myColor.saturate(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    saturate(amount, returnNewInstance = this.settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = this.clone();
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
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	{SColor} 			A new SColor instance or the actual one
     *
     * @example           js
     * myColor.grayscale();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    grayscale(returnNewInstance = this.settings.returnNewInstance) {
        if (returnNewInstance) {
            const n = this.clone();
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
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return 	            {SColor} 				                          	A new SColor instance or the actual one
     *
     * @example           js
     * myColor.spin(230);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    spin(amount, returnNewInstance = this.settings.returnNewInstance) {
        amount = parseInt(amount);
        const hue = this.h;
        let newHue = hue + amount;
        if (newHue > 360) {
            newHue -= 360;
        }
        if (returnNewInstance) {
            const n = this.clone();
            n.h = newHue;
            return n;
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
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return          	{SColor} 					                            A new SColor instance or the actual one
     *
     * @example           js
     * myColor.alpha(10);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    alpha(alpha, returnNewInstance = this.settings.returnNewInstance) {
        alpha = parseFloat(alpha);
        if (returnNewInstance) {
            const n = this.clone();
            n.a = alpha;
            return n;
        }
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
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 				                                    A new SColor instance or the actual one
     *
     * @example             js
     * myColor.darken(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    darken(amount, returnNewInstance = this.settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = this.clone();
            n.l -= amount;
            return n;
        }
        this.l -= amount;
        if (this.l < 0) this.l = 0;
        else if (this.l > 100) this.l = 100;
        return this;
    }

    /**
     * @name                      lighten
     * @type                      Function
     *
     * Lighten
     *
     * @param 	              {Number} 	              amount 	                	The amount of lightness (of the sky of the angels) to apply between 0-100
     * @param           {Boolean}           [returnNewInstance=this.settings.returnNewInstance]        Specify if you want back a new SColor instance of the actual one
     * @return                	{SColor} 			                                  	A new SColor instance or the actual one
     *
     * @example             js
     * myColor.lighten(20);
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    lighten(amount, returnNewInstance = this.settings.returnNewInstance) {
        amount = parseInt(amount);
        if (returnNewInstance) {
            const n = this.clone();
            n.l += amount;
            return n;
        }
        this.l += amount;
        if (this.l < 0) this.l = 0;
        else if (this.l > 100) this.l = 100;
        return this;
    }

    /**
     * @name                invert
     * @type                Function
     *
     * Calculate the best color value that will have the best contrast ratio
     *
     * @param       {Boolean}       [returnNewInstance=this.settings.returnNewInstance]      Specify if you want a new SColor instance back or update the current one
     * @return      {SColor}              The SColor instance that represent this new color
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    invert(returnNewInstance = this.settings.returnNewInstance): SColor {
        let lightness = this.l;
        if (this.l >= 50) {
            lightness -= 50;
        } else {
            lightness += 50;
        }

        if (returnNewInstance) {
            const n = this.clone();
            n.l = lightness;
            return n;
        } else {
            this.l = lightness;
        }

        if (this.l < 0) this.l = 0;
        else if (this.l > 100) this.l = 100;

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
            r: this.r,
            g: this.b,
            b: this.b,
            a: this.a,
            h: this.h,
            s: this.s,
            l: this.l,
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
     * @param       {String}              [format=this.settings.defaultFormat]                The format you want back
     * @values        hex,hsl,rgba
     * @return 	      {string} 		                                                      The rgba string representation of the color
     *
     * @example         js
     * myColor.toString();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString(format = this.settings.defaultFormat) {
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

// export class
export default SColor;
