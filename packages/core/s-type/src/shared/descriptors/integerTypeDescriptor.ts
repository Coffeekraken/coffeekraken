// shared

import type { ISTypeDescriptor } from '../SType';

/**
 * @name              integerTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "integer" with some utilities methods like "is", "cast", etc...
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
    name: 'Integer',
    id: 'integer',
    is: (value: any) => Number.isInteger(value),
    cast: (value: any) => {
        if (typeof value !== 'string' && typeof value !== 'number') {
            return new Error(
                `Sorry but only strings and numbers can be casted to integers... Passed value: ${value}`,
            );
        }
        // @ts-ignore
        const res = parseInt(value);
        if (isNaN(res))
            return new Error(
                `Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`,
            );
        return res;
    },
};

export default descriptor;
