// shared

import type { ISTypeDescriptor } from '../SType.js';

/**
 * @name              functionTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const descriptor: ISTypeDescriptor = {
    name: 'Function',
    id: 'function',
    is: (value: any) => typeof value === 'function',
    cast: (value: any) => {
        return new Error(`Sorry but nothing is castable to a Function`);
    },
};

export default descriptor;
