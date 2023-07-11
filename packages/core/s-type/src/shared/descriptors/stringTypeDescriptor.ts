// shared

import { __isString } from '@coffeekraken/sugar/is';
import { __toString } from '@coffeekraken/sugar/string';
import type { ISTypeDescriptor } from '../SType.js';

/**
 * @name              stringTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "string" with some utilities methods like "is", "cast", etc...
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
    name: 'String',
    id: 'string',
    is: (value: any) => {
        return __isString(value);
    },
    cast: (value: any) =>
        __toString(value, {
            beautify: true,
        }),
};

export default descriptor;
