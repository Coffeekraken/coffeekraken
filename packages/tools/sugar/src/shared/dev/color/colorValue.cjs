"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name            colorValue
 * @namespace            shared.dev.colors
 * @type            Function
 *
 * Return the list of color names you can access using the ```getColor``` function.
 * These colors are specified in the config.terminal configuration file under the "colors" property.
 *
 * @example         js
 * import colorValue from '@coffeekraken/sugar/shared/dev/color/colorValue';
 * colorValue('black'); => #000000
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function colorValue(color) {
    if (!s_sugar_config_1.default('dev.colors')[color]) {
        throw new Error(`[sugar.shared.dev.colors.colorValue] Sorry but the color "<yellow>${color}</yellow>" you want to get the value from does not exists... Here's the list of available colors at this time: ${Object.keys(s_sugar_config_1.default('dev.colors')).join(',')}`);
    }
    return s_sugar_config_1.default('dev.colors')[color];
}
exports.default = colorValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvZGV2L2NvbG9yL2NvbG9yVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRkFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxTQUF3QixVQUFVLENBQUMsS0FBSztJQUN0QyxJQUFJLENBQUMsd0JBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN2QyxNQUFNLElBQUksS0FBSyxDQUNiLHFFQUFxRSxLQUFLLGtIQUFrSCxNQUFNLENBQUMsSUFBSSxDQUNyTSx3QkFBYSxDQUFDLFlBQVksQ0FBQyxDQUM1QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNkLENBQUM7S0FDSDtJQUNELE9BQU8sd0JBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBVEQsNkJBU0MifQ==