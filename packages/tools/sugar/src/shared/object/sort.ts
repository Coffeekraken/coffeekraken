// @ts-nocheck

/**
 * @name                                sort
 * @namespace            shared.object
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Sort an object properties the same way as the Array.sort do it.
 * The "a" and "b" argument passed to your sort function will have these properties:
 * - key: The key of the object
 * - value: The actual value of the object property
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                [sort=null]                  The sort function to use. If not specified, will sort the items by key alphabetically
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __sort($1, $2)
 * __sort($1, (a, b) => {
 *      // a.key - a.value | b.key - b.value
 *      $2
 * })
 *
 * @example               js
 * import { __sort } from '@coffeekraken/sugar/object';
 * __sort({
 *    coco: { weight: 10 },
 *    lolo: { weight: 2 },
 *    plop: { weight: 5 }
 * }, (a, b) => {
 *   return a.value.weight - b.value.weight;
 * });
 * // {
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * //   coco: { weight: 10 }
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __sort(object: any, sort?: Function): any {
    // get the object keys
    const keys = Object.keys(object);

    // sort the keys
    const sortedKeys = keys.sort((a, b) => {
        if (!sort) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }

        // call the sort function passed as parameter
        return sort({ key: a, value: object[a] }, { key: b, value: object[b] });
    });

    // create the new sorted object
    const resultObj = {};
    // loop on each sorted keys
    sortedKeys.forEach((k) => {
        // add the property key with the object value
        resultObj[k] = object[k];
    });

    // return the result sorted object
    return resultObj;
}
