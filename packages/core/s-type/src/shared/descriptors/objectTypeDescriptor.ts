// shared

import { __isObject } from '@coffeekraken/sugar/is';
import type { ISTypeDescriptor } from '../SType';

/**
 * @name              objectTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "object" with some utilities methods like "is", "cast", etc...
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
    name: 'Object',
    id: 'object',
    is: (value: any) => __isObject(value),
    cast: (value: any) => {
        if (__isObject(value)) return value;
        return {
            value,
        };
    },
};

export default descriptor;
