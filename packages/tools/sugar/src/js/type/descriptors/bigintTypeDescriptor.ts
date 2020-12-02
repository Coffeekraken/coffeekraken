// shared

import { ISTypeDescriptor } from '../interface/ISType';

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
const descriptor: ISTypeDescriptor = {
  name: 'Bigint',
  id: 'bigint',
  is: (value: any) => typeof value === 'bigint',
  cast: (value: any) => {
    if (typeof value === 'bigint') return value;
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw `Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>`;
    }
    return BigInt(value);
  }
};

export = descriptor;
