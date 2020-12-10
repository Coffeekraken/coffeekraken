"use strict";
// @ts-nocheck
// @shared
/**
 * @name        isJson
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isJson from '@coffeekraken/sugar/js/is/json'
 * if (isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isJson(value) {
    try {
        JSON.parse(value);
    }
    catch (e) {
        return false;
    }
    return true;
}
module.exports = isJson;
//# sourceMappingURL=module.js.map