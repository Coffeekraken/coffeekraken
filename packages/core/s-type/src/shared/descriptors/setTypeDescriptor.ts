// shared

import type { ISTypeDescriptor } from '../SType';

/**
 * @name              mapTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "set" with some utilities methods like "is", "cast", etc...
 *
 * @example         js
 * export default {
 *    name: 'String',
 *    id: 'string',
 *    is: (value) => typeof value === 'string',
 *    cast: (value) => '' + value,
 *    // etc...
 * };
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const descriptor: ISTypeDescriptor = {
    name: 'Set',
    id: 'set',
    is: (value: any) => value instanceof Set,
    cast: (value: any) => {
        if (value instanceof Set) return value;
        const set = new Set();
        set.add(value);
        return set;
    },
};

export default descriptor;
