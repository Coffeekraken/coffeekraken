"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SColor_1 = __importDefault(require("./SColor"));
/**
 * @name                color
 * @namespace           sugar.node.color
 * @type                Function
 * @stable
 *
 * Simple wrapper to create an SColor instance quickly
 *
 * @param         {Mixed}             color           A color in any format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * @return        {SColor}                            An SColor instance representing your color
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import color from '@coffeekraken/sugar/node/color/color';
 * const myColor = color('#ff00ff');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function color(color) {
    return new SColor_1.default(color);
}
exports.default = color;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzREFBZ0M7QUFFaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsS0FBSyxDQUFDLEtBQUs7SUFDbEIsT0FBTyxJQUFJLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUNELGtCQUFlLEtBQUssQ0FBQyJ9