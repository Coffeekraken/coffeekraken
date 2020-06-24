/**
 * @name              hsv2rgba
 * @namespace           js.color
 * @type              Function
 *
 * HSV to RGBA
 *
 * @param	        {Number|Object}      	h       		The hue value between 0-360 or an object representing h, s, v, (a)
 * @param	        {Number}      	s       		The saturation value between 0-100|0-1
 * @param	        {Number}      	v       		The value value between 0-100|0-1
 * @param	        {Number}      	a       		The alpha value between 0-100|0-1
 * @return      	{object} 		              	The rgba object representation
 *
 * @example         js
 * import hsv2rgba from '@coffeekraken/sugar/js/color/hsv2rgba';
 * hsv2rgba(10,20,30);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function hsv2rgba(h, s, v, a = 1) {
  if (typeof h === 'object') {
    s = h.s;
    v = h.v;
    a = h.a;
    h = h.h;
  }

  // manage arguments
  h = parseFloat(h);
  s = parseFloat(s);
  v = parseFloat(v);
  a = parseFloat(a);
  if (h > 1) h = (1 / 360) * h;
  if (s > 1) s = (1 / 100) * s;
  if (v > 1) v = (1 / 100) * v;
  if (a > 1) a = (1 / 100) * a;

  var r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: a
  };
}
