"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SColor_1 = __importDefault(require("./SColor"));
/**
 * @name                color
 * @namespace           sugar.js.color
 * @type                Function
 *
 * Simple wrapper to create an SColor instance quickly
 *
 * @param         {Mixed}             color           A color in any format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * @return        {SColor}                            An SColor instance representing your color
 *
 * @example         js
 * import color from '@coffeekraken/sugar/js/color/color';
 * const myColor = color('#ff00ff');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function color(color) {
    return new SColor_1.default(color);
}
exports.default = color;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2NvbG9yL2NvbG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixzREFBZ0M7QUFFaEM7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBUyxLQUFLLENBQUMsS0FBSztJQUNsQixPQUFPLElBQUksZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=