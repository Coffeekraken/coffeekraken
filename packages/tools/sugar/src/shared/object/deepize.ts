// @ts-nocheck

import __set from './set.js';
/**
 * @name          deepize
 * @namespace            shared.object
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply take an object like this one:
 * {
 *    'something.cool': 'hello'
 * }
 * and convert it to something like this:
 * {
 *    something: {
 *      cool: 'hello'
 *    }
 * }
 *
 * @param       {Object}        object        The object to convert
 * @return      {Object}                      The converted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __deepize($1)
 *
 * @example       js
 * import { __deepize } from '@coffeekraken/sugar/object';
 * __deepize ({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __deepize(object) {
    const finalObject = {};
    for (const key in object) {
        __set(finalObject, key, object[key]);
    }
    return finalObject;
}

// console.log(
//   deepize({
//     'someting.cool': 'hello',
//     'you.coco[0]': 'hello',
//     'coco[1]': 'world',
//     'world."coco.plop".yep': 'dsojiofj'
//   })
// );
