import __parseRgba from './parseRgba';
import __parseHsv from './parseHsv';
import __hsv2rgba from './hsv2rgba';
import __parseHsl from './parseHsl';
import __hsl2rgba from './hsl2rgba';
import __hex2rgba from './hex2rgba';
import __rgba2hsl from './rgba2hsl';
import __rgba2hsv from './rgba2hsv';

/**
 * @name            parse
 * @namespace           js.color
 * @type            Function
 * @private
 *
 * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
 *
 * @param       {Object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
 * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba", "hsl" or "hsv"
 * @return      {Object}                  The rgba representation of the passed color
 *
 * @example         js
 * import parse from '@coffeekraken/sugar/js/color/parse';
 * parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function parse(color, format = 'rgba') {
  color = color.replace(/\s/g, '');
  if (color.indexOf('rgb') != -1) {
    color = __parseRgba(color);
  } else if (color.indexOf('hsv') != -1) {
    color = __parseHsv(color);
    color = __hsv2rgba(color.h, color.s, color.v);
  } else if (color.indexOf('hsl') != -1) {
    color = __parseHsl(color);
    color = __hsl2rgba(color.h, color.s, color.l);
  } else if (color.substring(0, 1) == '#') {
    color = __hex2rgba(color);
  }

  switch (format) {
    case 'hsl':
      return __rgba2hsl(color);
      break;
    case 'hsv':
      return __rgba2hsv(color);
      break;
    case 'rgba':
    default:
      return color;
      break;
  }
}
