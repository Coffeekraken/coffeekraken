"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_clone_1 = __importDefault(require("lodash.clone"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
/**
 * @name                clone
 * @namespace            shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Object}       [settings={}]   Specify some settings to configure your clone process
 * @return      {Object}                      The cloned object
 *
 * @setting     {Boolean}       [deep=false]      Specify if you want to clone the object deeply
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __clone } from '@coffeekraken/sugar/object';
 * __clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function clone(object, settings = {}) {
    settings = Object.assign({ deep: false }, settings);
    if (settings.deep) {
        return (0, lodash_clonedeep_1.default)(object);
    }
    return (0, lodash_clone_1.default)(object);
}
exports.default = clone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdFQUFtQztBQUNuQyx3RUFBMkM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBd0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUMvQyxRQUFRLG1CQUNKLElBQUksRUFBRSxLQUFLLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDZixPQUFPLElBQUEsMEJBQVcsRUFBQyxNQUFNLENBQUMsQ0FBQztLQUM5QjtJQUNELE9BQU8sSUFBQSxzQkFBTyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFURCx3QkFTQyJ9