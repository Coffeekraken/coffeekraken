"use strict";
// shared
/**
 * @name              bigintTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "bigint" with some utilities methods like "is", "cast", etc...
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const descriptor = {
    name: 'Bigint',
    id: 'bigint',
    is: (value) => typeof value === 'bigint',
    cast: (value) => {
        if (typeof value === 'bigint')
            return value;
        if (typeof value !== 'string' && typeof value !== 'number') {
            return new Error(`Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>`);
        }
        let res;
        try {
            res = BigInt(value);
        }
        catch (e) {
            res = new Error(`It seem's that the passed value "<yellow>${value}</yellow>" can not be casted to a <green>BigInt</green>`);
        }
        return res;
    }
};
module.exports = descriptor;
//# sourceMappingURL=bigintTypeDescriptor.js.map