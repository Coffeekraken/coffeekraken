"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseRgba;

/**
 * @name                        parseRgba
 * @namespace           js.color
 * @type                        Function
 *
 * Parse RGBA string and return an object
 *
 * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
 * @return 	          {object} 				                              	The rgba object representation
 *
 * @example           js
 * import parseRgba from '@coffeekraken/sugar/js/color/parseRgba';
 * parseRgba('rgba(20,10,100,20)');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseRgba(rgbaString) {
  rgbaString = rgbaString.toLowerCase();
  var string = rgbaString.replace('rgba(', '').replace(')', '').replace(/\s/g, '');
  var array = string.split(',');
  return {
    r: parseInt(array[0]),
    g: parseInt(array[1]),
    b: parseInt(array[2]),
    a: parseInt(array[3])
  };
}

module.exports = exports.default;