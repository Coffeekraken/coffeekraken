// shared

import type { ISTypeDescriptor } from '../SType';

/**
 * @name              numberTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "number" with some utilities methods like "is", "cast", etc...
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
    name: 'Number',
    id: 'number',
    is: (value: any) => typeof value === 'number',
    cast: (value: any) => {
        if (typeof value !== 'string') {
            return new Error(
                `Sorry but only strings can be casted to numbers...`,
            );
        }

        // console.trace('V', value);

        const res = parseFloat(value);

        if (isNaN(res)) {
            return new Error(
                `Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`,
            );
        }
        return res;
    },
};

export default descriptor;
