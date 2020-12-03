// shared

import { ISTypeDescriptor } from '../interface/ISType';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const descriptor: ISTypeDescriptor = {
  name: 'Integer',
  id: 'integer',
  is: (value: any) => Number.isInteger(value),
  cast: (value: any) => {
    if (typeof value !== 'string') {
      return new Error(`Sorry but only strings can be casted to integers...`);
    }
    const res = parseInt(value);
    if (isNaN(res))
      return new Error(
        `Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`
      );
    return res;
  }
};

export = descriptor;
