"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
/**
 * @name            availableColors
 * @namespace       sugar.shared.dev.colors
 * @type            Function
 *
 * Return the list of color names you can access using the ```colorValue``` function.
 * These colors are specified in the config.terminal configuration file under the "colors" property.
 *
 * @example         js
 * import availableColors from '@coffeekraken/sugar/shared/dev/colors/availableColors';
 * availableColors(); => ['black','white','yellow','green',...]
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function availableColors() {
    return Object.keys(sugar_1.default('dev.colors'));
}
exports.default = availableColors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlQ29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhaWxhYmxlQ29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0ZBQW9FO0FBRXBFOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsU0FBd0IsZUFBZTtJQUNyQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUZELGtDQUVDIn0=