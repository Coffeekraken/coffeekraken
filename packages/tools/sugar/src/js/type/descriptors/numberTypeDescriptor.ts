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
      return new Error(`Sorry but only strings can be casted to numbers...`);
    }
    const res = parseFloat(value);
    if (isNaN(res))
      return new Error(
        `Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`
      );
    return res;
  }
};

export = descriptor;
