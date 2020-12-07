"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const isInPackage_1 = __importDefault(require("../path/isInPackage"));
/**
 * @name            inPackage
 * @namespace           sugar.node.is
 * @type            Function
 * @stable
 *
 * This function check if the we are in (one of) the package(s) passed as parameter
 *
 * @param           {String|Array}              name             The package name to check or a string comma separated like "myPackage,another"
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return      {Boolean}                           true if is in the passed package, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isInPackage from '@coffeekraken/sugar/node/is/inPackage';
 * isInPackage('@coffeekraken/sugar'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function inPackage(name, from = process.cwd(), highest = false) {
    return isInPackage_1.default(name, from, highest);
}
module.exports = inPackage;
//# sourceMappingURL=inPackage.js.map