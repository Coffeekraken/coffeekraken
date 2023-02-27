import { decycle as __decycle } from 'json-cyclic';

/**
 * @name          decycle
 * @namespace            shared.object
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
 * @snippet         __decycle($1)
 * 
 * @example     js
 * import { __decycle } from '@coffeekraken/sugar/object';
 * __decycle({
 *    something: 'cool',
 *    with: 'circular references',
 *    //..
 * });
 *
 * @see         https://www.npmjs.com/package/json-cyclic
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function decycle(obj) {
    return __decycle(obj);
}
