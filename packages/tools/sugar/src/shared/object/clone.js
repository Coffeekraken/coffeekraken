// @ts-nocheck
import __clone from 'lodash.clone';
import __deepClone from 'lodash.clonedeep';
/**
 * @name                clone
 * @namespace            js.object
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
        return __deepClone(object);
    }
    return __clone(object);
}
export default clone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFDO0FBQ25DLE9BQU8sV0FBVyxNQUFNLGtCQUFrQixDQUFDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNoQyxRQUFRLG1CQUNKLElBQUksRUFBRSxLQUFLLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDZixPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5QjtJQUNELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9