// shared

import __isObject from '@coffeekraken/sugar/shared/is/object';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import type { ISTypeDescriptor } from '../SType';
import __SType from '../_SType';

/**
 * @name              objectTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
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
