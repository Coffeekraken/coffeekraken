"use strict";
// shared
/**
 * @name              symbolTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "symbol" with some utilities methods like "is", "cast", etc...
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
    name: 'Symbol',
    id: 'symbol',
    is: (value) => typeof value === 'symbol',
    cast: (value) => {
        if (typeof value === 'symbol')
            return value;
        return Symbol(value);
    }
};
module.exports = descriptor;
//# sourceMappingURL=symbolTypeDescriptor.js.map