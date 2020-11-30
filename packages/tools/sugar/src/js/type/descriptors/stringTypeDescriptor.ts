// shared

import __isString from '../../is/string';
import __toString from '../../string/toString';
import { ISTypeDescriptor } from '../interface/ISType';
import __SType from '../_SType';

/**
 * @name              stringTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "string" with some utilities methods like "is", "cast", etc...
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
  name: 'String',
  id: 'string',
  is: (value: any) => __isString(value),
  cast: (value: any) =>
    __toString(value, {
      beautify: true
    })
};

__SType.registerType(descriptor);

export = descriptor;
