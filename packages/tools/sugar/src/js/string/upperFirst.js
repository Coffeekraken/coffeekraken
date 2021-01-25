"use strict";
// @ts-nocheck
// @shared
/**
 * @name        upperFirst
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Upper first
 *
 * @param    {String}    string    The string to process
 * @return    {String}    The processed string with first letter uppercase
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import upperFirst from '@coffeekraken/sugar/js/string/upperFirst'
 * upperFirst('hello world') // Hello world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = upperFirst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXJGaXJzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVwcGVyRmlyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsVUFBVSxDQUFDLE1BQU07SUFDeEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUNELGlCQUFTLFVBQVUsQ0FBQyJ9