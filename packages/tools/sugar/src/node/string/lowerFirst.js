"use strict";
// @ts-nocheck
// @shared
/**
 * @name        lowerFirst
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Lower first letter
 *
 * @param    {String}    string    The string to lower the first letter
 * @return    {String}    The string with the first letter lowered
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import lowerFirst from '@coffeekraken/sugar/js/string/lowerFirst'
 * lowerFirst('Hello world') // hello world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function lowerFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
module.exports = lowerFirst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93ZXJGaXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvd2VyRmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsVUFBVSxDQUFDLE1BQU07SUFDeEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUNELGlCQUFTLFVBQVUsQ0FBQyJ9