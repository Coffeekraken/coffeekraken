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
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Return the list of color names you can access using the ```getColor``` function.
 * These colors are specified in the config.terminal configuration file under the "colors" property.
 *
 * @example         js
 * import colorValue from '@coffeekraken/sugar/shared/dev/color/colorValue';
 * colorValue('black'); => #000000
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function colorValue(color) {
    if (!s_sugar_config_1.default.get('dev.colors')[color]) {
        throw new Error(`[sugar.shared.dev.colors.colorValue] Sorry but the color "<yellow>${color}</yellow>" you want to get the value from does not exists... Here's the list of available colors at this time: ${Object.keys(s_sugar_config_1.default.get('dev.colors')).join(',')}`);
    }
    return s_sugar_config_1.default.get('dev.colors')[color];
}
exports.default = colorValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQXdCLFVBQVUsQ0FBQyxLQUFLO0lBQ3BDLElBQUksQ0FBQyx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUNYLHFFQUFxRSxLQUFLLGtIQUFrSCxNQUFNLENBQUMsSUFBSSxDQUNuTSx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FDbEMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDaEIsQ0FBQztLQUNMO0lBQ0QsT0FBTyx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBVEQsNkJBU0MifQ==