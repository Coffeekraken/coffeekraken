"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        includes
 * @namespace           sugar.js.string
 * @type      Function
 *
 * Same as the native String.includes function but accept either an array of items
 * or a simple comma separated string like "something,cool,hello,world"
 *
 * @param    {String}    string    The string to check
 * @param     {Array|String}    values      An array or comma separated string to check
 * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match
 *
 * @example    js
 * import includes from '@coffeekraken/sugar/js/string/includes'
 * includes('Hello world', 'world,coco') // ['world']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function includes(string, values) {
    if (!Array.isArray(values))
        values = values.split(',').map((t) => t.trim());
    const valuesThatExists = [];
    values.forEach((v) => {
        if (string.includes(v)) {
            valuesThatExists.push(v);
        }
    });
    if (valuesThatExists.length)
        return valuesThatExists;
    return false;
}
exports.default = includes;
