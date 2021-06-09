// shared

import __isMap from '@coffeekraken/sugar/shared/is/map';
import { ISTypeDescriptor } from '../SType';
import __SType from '../_SType';

/**
 * @name              arrayTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "array" with some utilities methods like "is", "cast", etc...
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
  name: 'Array',
  id: 'array',
  is: (value: any) => {
    // _console.log('CHeck', value, Array.isArray(value));
    return Array.isArray(value);
  },
  cast: (value: any, params: any = {}) => {

    if (!value) return [];

    if (params.splitChars && Array.isArray(params.splitChars)) {
      value = value.split(new RegExp(`(${params.splitChars.join('|')})`,'gm')).filter(l => l.trim() !== '');
    }

    if (Array.isArray(value)) return value;
    return [value];
  }
};

export default descriptor;
