"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseRgba_1 = require("./parseRgba");
const parseHsv_1 = require("./parseHsv");
const hsv2rgba_1 = require("./hsv2rgba");
const parseHsl_1 = require("./parseHsl");
const hsl2rgba_1 = require("./hsl2rgba");
const hex2rgba_1 = require("./hex2rgba");
const rgba2hsl_1 = require("./rgba2hsl");
const rgba2hsv_1 = require("./rgba2hsv");
/**
 * @name            parse
 * @namespace           sugar.js.color
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parse(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    if (color.indexOf('rgb') != -1) {
        color = parseRgba_1.default(color);
    }
    else if (color.indexOf('hsv') != -1) {
        color = parseHsv_1.default(color);
        color = hsv2rgba_1.default(color.h, color.s, color.v);
    }
    else if (color.indexOf('hsl') != -1) {
        color = parseHsl_1.default(color);
        color = hsl2rgba_1.default(color.h, color.s, color.l);
    }
    else if (color.substring(0, 1) == '#') {
        color = hex2rgba_1.default(color);
    }
    switch (format) {
        case 'hsl':
            return rgba2hsl_1.default(color);
            break;
        case 'hsv':
            return rgba2hsv_1.default(color);
            break;
        case 'rgba':
        default:
            return color;
            break;
    }
}
exports.default = parse;
