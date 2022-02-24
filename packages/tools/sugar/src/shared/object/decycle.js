import { decycle as __decycle } from 'json-cyclic';
/**
 * @name          decycle
 * @namespace            js.object
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This method simply remove the circular references in the passed object
 *
 * @param     {Object}      obj         The object to process
 * @return    {Object}                  The new object circular references free
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function decycle(obj) {
    return __decycle(obj);
}
export default decycle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjeWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlY3ljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sSUFBSSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsT0FBTyxDQUFDLEdBQUc7SUFDaEIsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=