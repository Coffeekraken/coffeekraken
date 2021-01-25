"use strict";
// @shared
const json_cyclic_1 = require("json-cyclic");
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
    return json_cyclic_1.decycle(obj);
}
module.exports = decycle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjeWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlY3ljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7QUFFViw2Q0FBbUQ7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsT0FBTyxDQUFDLEdBQUc7SUFDbEIsT0FBTyxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFDRCxpQkFBUyxPQUFPLENBQUMifQ==