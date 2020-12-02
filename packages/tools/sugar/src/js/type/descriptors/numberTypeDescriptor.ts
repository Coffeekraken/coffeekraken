// shared

import __isMap from '../../is/map';
import { ISTypeDescriptor } from '../interface/ISType';
import __SType from '../_SType';

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
const descriptor: ISTypeDescriptor = {
  name: 'Number',
  id: 'number',
  is: (value: any) => typeof value === 'number',
  cast: (value: any) => {
    if (typeof value !== 'string') {
      throw `Sorry but only strings can be casted to numbers...`;
    }
    return parseFloat(value);
  }
};

export = descriptor;
