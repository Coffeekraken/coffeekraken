// @ts-nocheck

import __isPlainObject from '../is/isPlainObject';
import __sort from './sort';

/**
 * @name                                sortDeep
 * @namespace            shared.object
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Sort an object properties the same way as the Array.sort do it but will do it recusrively to sort the object deeply.
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import sortObject from '@coffeekraken/sugar/js/object/sort';
 * sortObject({
 *    lolo: { weight: 2 },
 *    coco: { weight: 10 },
 *    plop: { weight: 5 },
 *    aha: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * }, (a, b) => {
 *    return a.key.localeCompare(b.key);
 * });
 * // {
 * //   aha: {
 * //      coco: 'plop',
 * //      hello: 'world'
 * //   }
 * //   coco: { weight: 10 }
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sortDeep(object, sort) {
    // sort passed object
    const sortedObject = __sort(object, sort);
    // go deep to sort lower levels
    for (let [key, value] of Object.entries(sortedObject)) {
        if (__isPlainObject(value)) {
            sortedObject[key] = sortDeep(sortedObject[key], sort);
        }
    }
    return sortedObject;
}
export default sortDeep;
