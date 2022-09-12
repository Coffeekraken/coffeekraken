"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                            excludedGlobs
 * @namespace            node.glob
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the array of exclude globs
 *
 * @return                {Array<String>}         The array of globs to exclude from the overall project
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __excludedGlobs } from '@coffeekraken/sugar/glob';
 * __excludedGlobs();
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __excludedGlobs() {
    if (s_sugar_config_1.default.isLoaded()) {
        return s_sugar_config_1.default.get('storage.exclude');
    }
    return [];
}
exports.default = __excludedGlobs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsU0FBd0IsZUFBZTtJQUNuQyxJQUFJLHdCQUFhLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDMUIsT0FBTyx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQy9DO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBTEQsa0NBS0MifQ==