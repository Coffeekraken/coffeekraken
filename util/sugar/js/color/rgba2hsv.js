"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rgba2hsv;

/**
 * @name            rgba2hsv
 * @namespace             sugar.js.color
 * @type            Function
 * 
 * RGBA to HSV
 * 
 * @param       	{Number|Object}        	r 	          	The red value between 0-255 or an object representing r, g, b, a
 * @param       	{Number}        	g 	          	The green value between 0-255
 * @param       	{Number}        	b 	          	The blue value between 0-255
 * @param       	{Number}        	a 	          	The alpha value between 0-100|0-1
 * @return      	{object} 		                    	The hsv object representation
 * 
 * @example           js
 * import rgba2hsv from '@coffeekraken/sugar/js/color/rgba2hsv';
 * rgba2hsv(10,20,50,10);
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rgba2hsv(r, g, b, a = 1) {
  if (typeof r === 'object') {
    g = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }

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

module.exports = exports.default;