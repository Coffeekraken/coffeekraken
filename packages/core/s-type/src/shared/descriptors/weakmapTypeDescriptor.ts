// shared

import type { ISTypeDescriptor } from '../SType';

/**
 * @name              weakmapTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "map" with some utilities methods like "is", "cast", etc...
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
    name: 'WeakMap',
    id: 'weakmap',
    is: (value: any) => value instanceof WeakMap,
    cast: (value: any) => {
        return new Error(
            `Sorry but nothing can be casted to a WeakMap for now`,
        );
    },
};

export default descriptor;
