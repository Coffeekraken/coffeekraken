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
 * @namespace            js.object
 * @type                Function
 * @stable
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
 * import clone from '@coffeekraken/sugar/js/object/clone';
 * clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function clone(object, settings = {}) {
    settings = Object.assign({ deep: false }, settings);
    if (settings.deep) {
        return lodash_clonedeep_1.default(object);
    }
    return lodash_clone_1.default(object);
}
exports.default = clone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL29iamVjdC9jbG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxnRUFBbUM7QUFDbkMsd0VBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbEMsUUFBUSxtQkFDTixJQUFJLEVBQUUsS0FBSyxJQUNSLFFBQVEsQ0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ2pCLE9BQU8sMEJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sc0JBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=