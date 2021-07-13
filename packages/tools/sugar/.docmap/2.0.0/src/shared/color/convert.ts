/**
*
* @name                  convert
* @namespace            js.color
* @type                  Function
* @platform          js
* @platform          ts
* @platform          node
* @status            beta
*
* This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
* and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
*
* @param           {Mixed}               input           The input color to convert
* @param           {String}              [format="rgba"]     The format wanted
* @return          {Mixed}                               The converted color
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import convert from '@coffeekraken/sugar/js/color/convert';
* convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/