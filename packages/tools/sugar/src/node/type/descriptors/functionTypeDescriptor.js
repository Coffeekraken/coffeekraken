"use strict";
// shared
/**
 * @name              functionTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "function" with some utilities methods like "is", "cast", etc...
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
    name: 'Function',
    id: 'function',
    is: (value) => typeof value === 'function',
    cast: (value) => {
        return new Error(`Sorry but nothing is castable to a Function`);
    }
};
module.exports = descriptor;
