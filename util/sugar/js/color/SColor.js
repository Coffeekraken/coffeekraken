"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		SColor
 * @namespace      sugar.js.color
 * @type    Class
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
 * @example 	js
 * import SColor from '@coffeekraken/sugar/js/classes/SColor'
 * let myColor = new SColor(#ff0000);
 * // get a lighter color
 * let ligtherColor = myColor.lighten(20);
 * // print the color to rgba
 * console.log(lighterColor.toRgbaString());
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SColor {
  /**
   * @name                colors
   * @type                Object
   * @protected
   * @static
   * 
   * Static color names map
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                _originalSColor
   * @type                Object
   * @private
   * 
   * Original color value
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _r
   * @type            Number
   * @private
   * 
   * Internal red value
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                _g
   * @type                Number
   * @private
   * 
   * Internal green value
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  _b
   * @type                  Number
   * @private
   * 
   * Internal blue value
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _a
   * @type              Number
   * @private
   * 
   * Internal alpha value
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  _settings
   * @type                  Object
   * @private
   * 
   * Store the settings passed to the constructor. Here's the list of available settings:
   * - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
   * - defaultFormat (rgba) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  constructor
   * @type                  Function
   * 
   * Constructor
   * 
   * @param   {object}    color     The color description like (#ff0000 | rgba(...) | hsl(...) | hsv(...) | {r:255,r:140,b:23,a:40})
   * @param       {Object}        [settings={}]         The settings to configure the SColor instance. Here's the available settings:
   * - returnNewInstance (false) {Boolean}: Specify if you want by default a new instance back when calling methods like "saturate", "desaturate", etc...
   * - defaultFormat (rgba) {String}: Specify the default format for this instance. This is used in the "toString" method for example...
   * @return    {object}            The color instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(color, settings = {}) {
    _defineProperty(this, "_originalSColor", null);

    _defineProperty(this, "_r", null);

    _defineProperty(this, "_g", null);

    _defineProperty(this, "_b", null);

    _defineProperty(this, "_a", 1);

    _defineProperty(this, "_settings", {});

    // save the instance settings
    this._settings = (0, _deepMerge.default)({
      returnNewInstance: false,
      defaultFormat: 'rgba'
    }, settings); // save the original color

    this._originalSColor = color; // try to get the color from the map

    if (typeof color == "string" && SColor.colors[color.toLowerCase()]) {
      color = SColor.colors[color.toLowerCase()];
    } // parse the input color to
    // split into rgba values


    this._parse(color);
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _parse(color) {
    // detecting input format
    if (typeof color == "string") {
      color = color.replace(/\s/g, "");

      if (color.indexOf("rgb") != -1) {
        color = this.parseRgba(color);
      } else if (color.indexOf("hsv") != -1) {
        color = this.parseHsv(color);
        color = this.hsv2rgba(color.h, color.s, color.v);
      } else if (color.indexOf("hsl") != -1) {
        color = this.parseHsl(color);
        color = this.hsl2rgba(color.h, color.s, color.l);
      } else if (color.substring(0, 1) == "#") {
        color = this.hex2rgba(color);
      }
    } else if (typeof color == "object") {
      if (!(color.r && color.g && color.b) || !(color.h && color.s && color.l) || !(color.h && color.s && color.v)) {
        throw "The passed color object " + color.toString() + " is not valid";
      }
    } else {
      throw "The passed color " + color.toString() + " is not valid";
    } // assign new color values


    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    this.a = color.a; // return the parsed color

    return color;
  }
  /**
   * @name              convert2
   * @type              Function
   * 
   * Concert color
   * 
   * @param       	{string}      	format 	      	The format wanted as output like (rgba,hsl,hsv and hex)
   * @values        rgba, hsl, hsv, hex
   * @return      	{object} 	                			The color in wanted object format
   * 
   * @example           js
   * myColor.convert2('rgba');
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  convert2(format) {
    switch (format) {
      case "rgba":
        return this.rgba2rgba(this.r, this.g, this.b, this.a);
        break;

      case "hsl":
        return this.rgba2hsl(this.r, this.g, this.b, this.a);
        break;

      case "hsv":
        return this.rgba2hsv(this.r, this.g, this.b, this.a);
        break;

      case "hex":
        return this.rgba2hex(this.r, this.g, this.b, this.a);
        break;
    }
  }
  /**
   * @name                        parseRgba
   * @type                        Function
   * 
   * Parse RGBA
   * 
   * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
   * @return 	          {object} 				                              	The rgba object representation
   * 
   * @example           js
   * myColor.parseRgba('rgba(20,10,100,20)');
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  parseRgba(rgbaString) {
    rgbaString = rgbaString.toLowerCase();
    let string = rgbaString.replace("rgba(", "").replace(")", "").replace(/\s/g, "");
    let array = string.split(",");
    return {
      r: parseInt(array[0]),
      g: parseInt(array[1]),
      b: parseInt(array[2]),
      a: parseInt(array[3])
    };
  }
  /**
   * @name                    parseHsl
   * @type                    Function
   * 
   * Parse HSL
   * 
   * @param 	      {string}	        hslString			      The hsl string (hsl(h,s,l)) to parse
   * @return 	        {object} 					                  	The hsl object representation
   * 
   * @example         js
   * myColor.parseHsl('hsl(20,20,20)');
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  parseHsl(hslString) {
    hslString = hslString.toLowerCase();
    let string = hslString.replace("hsl(", "").replace(")", "").replace(/\s/g, "");
    let array = string.split(",");
    return {
      h: parseFloat(array[0]),
      s: parseFloat(array[1]),
      l: parseFloat(array[2])
    };
  }
  /**
   * @name                parseHsv
   * @type                Function
   * 
   * Parse HSV
   * 
   * @param         	{string}	          	hsvString		        	The hsv string (hsv(h,s,v)) to parse
   * @return        	{object}					                        		The hsv object representation
   * 
   * @example       js 
   * myColor.parseHsv('hsv(10,10,10)');
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  parseHsv(hsvString) {
    hsvString = hsvString.toLowerCase();
    let string = hsvString.replace("hsv(", "").replace(")", "").replace(/\s/g, "");
    let array = string.split(",");
    return {
      h: parseFloat(array[0]),
      s: parseFloat(array[1]),
      v: parseFloat(array[2])
    };
  }
  /**
   * @name                rgba2hex
   * @type                Function
   * 
   * RGBA to HEX
   * 
   * @param       	{Number}        	r	          	The red value between 0-255
   * @param       	{Number}        	g	          	The green value between 0-255
   * @param       	{Number}        	b	          	The blue value between 0-255
   * @param       	{Number}        	a	          	The alpha value between 0-100|0-1
   * @return      	{string}		                    	The hex string representation like #ff004f
   * 
   * @example         js
   * myColor.rgba2hex(10,20,30,10);
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  rgba2hex(r, g, b, a = 1) {
    let alpha = "";

    if (a != 1 && a != 100) {
      if (a < 1) {
        a = 255 * a;
      } else if (a > 1) {
        a = 255 / 100 * a;
      }

      a = Math.round(a);
      alpha = parseInt(a, 10).toString(16);
    }

    return "#" + ("0" + parseInt(r, 10).toString(16)).slice(-2) + ("0" + parseInt(g, 10).toString(16)).slice(-2) + ("0" + parseInt(b, 10).toString(16)).slice(-2) + alpha;
  }
  /**
   * @name                      rgba2rgba
   * @type                      Function
   * 
   * RGBA to RGBA
   * 
   * @param     	{Number}	        r           		The red value between 0-255
   * @param     	{Number}        	g           		The green value between 0-255
   * @param     	{Number}        	b           		The blue value between 0-255
   * @param     	{Number}        	a           		The alpha value between 0-100|0-1
   * @return 	    {object} 		                    	The rgba object representation
   * 
   * @example         js
   * myColor.rgba2rgba(10,20,10,40);
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  rgba2rgba(r, g, b, a) {
    a = parseFloat(a);
    if (a > 1) a = 1 / 100 * a;
    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  }
  /**
   * @name                  hex2rgba
   * @type                  Function
   * 
   * Hex to RGBA
   * 
   * @param	              {string}       	hex         		The hex string to convert
   * @return            	{object} 			                  	The rgba object representation
   * 
   * @example         js
   * myColor.hex2rgba('#ff00ff');
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  hex2rgba(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    let a = 1;

    if (hex.length == 8) {
      a = 1 / 255 * parseInt(hex.substring(6, 8), 16);
    }

    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  }
  /**
   * @name              hsv2rgba
   * @type              Function
   * 
   * HSV to RGBA
   * 
   * @param	        {Number}      	h       		The hue value between 0-360
   * @param	        {Number}      	s       		The saturation value between 0-100|0-1
   * @param	        {Number}      	v       		The value value between 0-100|0-1
   * @param	        {Number}      	a       		The alpha value between 0-100|0-1
   * @return      	{object} 		              	The rgba object representation
   * 
   * @example         js
   * myColor.hsv2rgba(10,20,30);
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  hsv2rgba(h, s, v, a = 1) {
    // manage arguments
    h = parseFloat(h);
    s = parseFloat(s);
    v = parseFloat(v);
    a = parseFloat(a);
    if (h > 1) h = 1 / 360 * h;
    if (s > 1) s = 1 / 100 * s;
    if (v > 1) v = 1 / 100 * v;
    if (a > 1) a = 1 / 100 * a;
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v, g = t, b = p;
        break;

      case 1:
        r = q, g = v, b = p;
        break;

      case 2:
        r = p, g = v, b = t;
        break;

      case 3:
        r = p, g = q, b = v;
        break;

      case 4:
        r = t, g = p, b = v;
        break;

      case 5:
        r = v, g = p, b = q;
        break;
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: a
    };
  }
  /**
   * @name              hsl2rgba
   * @type              Function
   * 
   * HSL to RGBA
   * 
   * @param	        {Number}        	h		        The hue value between 0-360
   * @param	        {Number}        	s 	        	The saturation value between 0-100|0-1
   * @param	        {Number}        	l 	        	The luminence value between 0-100|0-1
   * @param	        {Number}        	a 	        	The alpha value between 0-100|0-1
   * @return 	      {object} 		                  	The rgba object representation
   * 
   * @example         js
   * myColor.hsl2rgba(10,20,30);
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  hsl2rgba(h, s, l, a = 1) {
    // manage arguments
    h = parseFloat(h);
    s = parseFloat(s);
    l = parseFloat(l);
    a = parseFloat(a);
    if (h > 1) h = 1 / 360 * h;
    if (s > 1) s = 1 / 100 * s;
    if (l > 1) l = 1 / 100 * l;
    if (a > 1) a = 1 / 100 * a;
    let r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: a
    };
  }
  /**
   * @name            rgba2hsv
   * @type            Function
   * 
   * RGBA to HSV
   * 
   * @param       	{Number}        	r 	          	The red value between 0-255
   * @param       	{Number}        	g 	          	The green value between 0-255
   * @param       	{Number}        	b 	          	The blue value between 0-255
   * @param       	{Number}        	a 	          	The alpha value between 0-100|0-1
   * @return      	{object} 		                    	The hsv object representation
   * 
   * @example           js
   * myColor.rgba2hsv(10,20,50,10);
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  rgba2hsv(r, g, b, a = 1) {
    let min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h,
        s,
        v = max;
    v = Math.floor(max / 255 * 100);
    if (max != 0) s = Math.floor(delta / max * 100);else {
      // black
      return [0, 0, 0];
    }
    if (r == max) h = (g - b) / delta; // between yellow & magenta
    else if (g == max) h = 2 + (b - r) / delta; // between cyan & yellow
      else h = 4 + (r - g) / delta; // between magenta & cyan

    h = Math.floor(h * 60); // degrees

    if (h < 0) h += 360;
    return {
      h: h,
      s: s,
      v: v
    };
  }
  /**
   * @name                  rgba2hsl
   * @type                  Function
   * 
   * RGBA to HSL
   * 
   * @param       	{Number}        	r 	        	The red value between 0-255
   * @param       	{Number}        	g 	        	The green value between 0-255
   * @param       	{Number}        	b 	        	The blue value between 0-255
   * @param       	{Number}        	a 	        	The alpha value between 0-100|0-1
   * @return 	      {object} 		                    	The hsl object representation
   * 
   * @example         js
   * myColor.rgba2hsl(10,20,50,10);
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  rgba2hsl(r, g, b, a = 1) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h,
        s,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: Math.floor(h * 360),
      s: Math.floor(s * 100),
      l: Math.floor(l * 100)
    };
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toHex() {
    return this.convert2("hex");
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toHsl() {
    return this.convert2("hsl");
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toHsv() {
    return this.convert2("hsv");
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toRgba() {
    return this.convert2("rgba");
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  get a() {
    return this._a;
  }

  set a(value) {
    value = parseFloat(value);
    value = value > 1 ? 1 / 100 * value : value;
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  get l() {
    return this.convert2("hsl").l;
  }

  set l(value) {
    let hsl = this.convert2("hsl");
    value = parseInt(value);
    value = value > 100 ? 100 : value;
    hsl.l = value;
    let rgba = this.hsl2rgba(hsl.h, hsl.s, hsl.l);
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  get s() {
    return this.convert2("hsl").s;
  }

  set s(value) {
    let hsl = this.convert2("hsl");
    value = parseInt(value);
    value = value > 100 ? 100 : value;
    hsl.s = value;
    let rgba = this.hsl2rgba(hsl.h, hsl.s, hsl.l);
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  get v() {
    return this.convert2("hsv").v;
  }

  set v(value) {
    let hsv = this.convert2("hsv");
    value = parseInt(value);
    value = value > 100 ? 100 : value;
    hsv.v = value;
    let rgba = this.hsv2rgba(hsv.h, hsv.s, hsv.v);
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  get h() {
    return this.convert2("hsl").h;
  }

  set h(value) {
    let hsl = this.convert2("hsl");
    value = parseInt(value);
    value = value > 360 ? 360 : value;
    hsl.h = value;
    let rgba = this.hsl2rgba(hsl.h, hsl.s, hsl.l);
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  spin(amount, returnNewInstance = this._settings.returnNewInstance) {
    amount = parseInt(amount);
    let hue = this.h;
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toHexString() {
    return this.convert2("hex");
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toHslString() {
    const hsl = this.convert2("hsl");
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toHsvString() {
    const hsv = this.convert2("hsv");
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  toString(format = this._settings.defaultFormat) {
    switch (format) {
      case "hex":
        return this.toHexString();
        break;

      case "hsl":
        return this.toHslString();
        break;

      case "hsv":
        return this.toHsvString();
        break;

      case "rgba":
      default:
        return this.toRgbaString();
        break;
    }
  }

} // // inject sugar css colors into class
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


_defineProperty(SColor, "colors", {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
});

var _default = SColor;
exports.default = _default;
module.exports = exports.default;