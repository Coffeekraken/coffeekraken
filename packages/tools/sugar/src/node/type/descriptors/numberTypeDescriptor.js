"use strict";
// shared
/**
 * @name              numberTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const descriptor = {
    name: 'Number',
    id: 'number',
    is: (value) => typeof value === 'number',
    cast: (value) => {
        if (typeof value !== 'string') {
            throw `Sorry but only strings can be casted to numbers...`;
        }
        return parseFloat(value);
    }
};
module.exports = descriptor;
