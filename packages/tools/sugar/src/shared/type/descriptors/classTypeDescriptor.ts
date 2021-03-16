// shared

import { ISTypeDescriptor } from '../SType';
import __isClass from '../../is/class';

/**
 * @name              classTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "class" with some utilities methods like "is", "cast", etc...
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
  name: 'Class',
  id: 'class',
  is: (value: any) => __isClass(value),
  cast: (value: any) => {
    return new Error(`Sorry but nothing is castable to a Class`);
  }
};

export default descriptor;
