"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const em2px_1 = __importDefault(require("./em2px"));
const em2px_2 = __importDefault(require("./em2px"));
const px2em_1 = __importDefault(require("./px2em"));
const px2rem_1 = __importDefault(require("./px2rem"));
/**
 * @name                  convert
 * @namespace           sugar.js.unit
 * @type                  Function
 * @stable
 *
 * Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
 *
 * @param         {String|Number}           from            The base value to convert
 * @param         {String}                  [to='px']       The value unit you want back
 * @return        {Number}                                  The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import convert from '@coffeekraken/sugar/js/unit/convert';
 * convert('2rem', 'px');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(from, to = 'px', $elm) {
    let fromUnit = 'px';
    if (typeof from === 'string' && parseFloat(from).toString() !== from) {
        fromUnit = from.replace(/[0-9.,]+/g, '');
    }
    const fromNumber = parseFloat(from);
    let pxValue;
    switch (fromUnit) {
        case 'px':
            pxValue = fromNumber;
            break;
        case 'rem':
            pxValue = em2px_2.default(fromNumber);
            break;
        case 'em':
            pxValue = em2px_1.default(fromNumber, $elm);
            break;
        default:
            return from;
            break;
    }
    switch (to) {
        case 'px':
            return pxValue;
            break;
        case 'rem':
            return px2rem_1.default(pxValue);
            break;
        case 'em':
            return px2em_1.default(pxValue, $elm);
            break;
        default:
            return from;
            break;
    }
}
module.exports = convert;
//# sourceMappingURL=module.js.map