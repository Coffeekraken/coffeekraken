"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
/**
 * @name            symlink
 * @namespace           sugar.node.is
 * @type            Function
 * @stable
 *
 * This function check if the passed string path is a sySlink or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a sySlink, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import isSymlink from '@coffeekraken/sugar/node/is/symlink';
 * isSymlink('something/cool');
 *
 * @todo        Tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isSymlink(path) {
    return fs_1.default.existsSync(path) && fs_1.default.lstatSync(path).isSymbolicLink();
}
module.exports = isSymlink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltbGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN5bWxpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtJQUNyQixPQUFPLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksWUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN4RSxDQUFDO0FBQ0QsaUJBQVMsU0FBUyxDQUFDIn0=