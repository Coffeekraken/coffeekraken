"use strict";
// @ts-nocheck
// @shared
/**
 * @name        isString
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isString from '@coffeekraken/sugar/js/is/String'
 * if (isString({}) {
 *   // do something
 * }
 *
 * @since         1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}
module.exports = isString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsUUFBUSxDQUFDLEtBQUs7SUFDckIsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxZQUFZLE1BQU0sQ0FBQztBQUM5RCxDQUFDO0FBQ0QsaUJBQVMsUUFBUSxDQUFDIn0=