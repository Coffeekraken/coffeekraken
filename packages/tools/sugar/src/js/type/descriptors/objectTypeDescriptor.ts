// shared

import __isObject from '../../is/object';
import __toString from '../../string/toString';
import { ISTypeDescriptor } from '../interface/ISType';
import __SType from '../_SType';

/**
 * @name              objectTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "object" with some utilities methods like "is", "cast", etc...
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
  name: 'Object',
  id: 'object',
  is: (value: any) => __isObject(value),
  cast: (value: any) => {
    if (__isObject(value)) return value;
    return {
      value
    };
  }
};

export = descriptor;
