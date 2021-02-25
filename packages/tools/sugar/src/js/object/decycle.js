// @shared
import { decycle as __decycle } from 'json-cyclic';
/**
 * @name          decycle
 * @namespace     sugar.js.object
 * @type          Function
 *
 * This method simply remove the circular references in the passed object
 *
 * @param     {Object}      obj         The object to process
 * @return    {Object}                  The new object circular references free
 *
 * @example     js
 * import decycle from '@coffeekraken/sugar/js/object/decycle';
 * decycle({
 *    something: 'cool',
 *    with: 'circular references',
 *    //..
 * });
 *
 * @see         https://www.npmjs.com/package/json-cyclic
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function decycle(obj) {
    return __decycle(obj);
}
export default decycle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjeWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlY3ljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUVWLE9BQU8sRUFBRSxPQUFPLElBQUksU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxHQUFHO0lBQ2xCLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9