"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const isPath_1 = __importDefault(require("../fs/isPath"));
/**
 * @name                            path
 * @namespace           sugar.node.is
 * @type                            Function
 * @stable
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/is/path';
 * isPath('hello/world'); // => true
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function path(path, checkExistence = false) {
    return isPath_1.default(path, checkExistence);
}
module.exports = path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCwwREFBb0M7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxHQUFHLEtBQUs7SUFDeEMsT0FBTyxnQkFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBQ0QsaUJBQVMsSUFBSSxDQUFDIn0=