/**
 * @name                  rgba2hsl
 * @namespace           sugar.js.color
 * @type                  Function
 *
 * RGBA to HSL
 *
 * @param       	{Number|Object}        	r 	        	The red value between 0-255 or an object representing r, b, g, a
 * @param       	{Number}        	g 	        	The green value between 0-255
 * @param       	{Number}        	b 	        	The blue value between 0-255
 * @param       	{Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                    	The hsl object representation
 *
 * @example         js
 * import rgba2hsl from '@coffeekraken/sugar/js/color/rgba2hsl';
 * rgba2hsl(10,20,50,10);
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function rgba2hsl(r, g, b, a = 1) {
  if (typeof r === 'object') {
    g = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }

  (r /= 255), (g /= 255), (b /= 255);
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
