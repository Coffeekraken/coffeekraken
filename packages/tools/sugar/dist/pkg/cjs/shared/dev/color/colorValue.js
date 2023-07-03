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
 * @private
 *
 * Return the list of color names you can access using the ```getColor``` function.
 * These colors are specified in the config.terminal configuration file under the "colors" property.
 *
 * @example         js
 * import { __colorValue } from '@coffeekraken/sugar/dev';
 * __colorValue('black'); => #000000
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUF3QixVQUFVLENBQUMsS0FBSztJQUNwQyxJQUFJLENBQUMsd0JBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekMsTUFBTSxJQUFJLEtBQUssQ0FDWCxxRUFBcUUsS0FBSyxrSEFBa0gsTUFBTSxDQUFDLElBQUksQ0FDbk0sd0JBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQ2xDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2hCLENBQUM7S0FDTDtJQUNELE9BQU8sd0JBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQVRELDZCQVNDIn0=