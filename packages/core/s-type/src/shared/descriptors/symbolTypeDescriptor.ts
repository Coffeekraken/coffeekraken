// shared

import { ISTypeDescriptor } from '../SType';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const descriptor: ISTypeDescriptor = {
  name: 'Symbol',
  id: 'symbol',
  is: (value: any) => typeof value === 'symbol',
  cast: (value: any) => {
    if (typeof value === 'symbol') return value;
    return Symbol(value);
  }
};

export default descriptor;
