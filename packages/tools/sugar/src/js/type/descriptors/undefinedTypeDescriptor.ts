// shared

import { ISTypeDescriptor } from '../interface/ISType';

/**
 * @name              undefinedTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "undefined" with some utilities methods like "is", "cast", etc...
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
  name: 'Undefined',
  id: 'undefined',
  is: (value: any) => value === undefined,
  cast: (value: any) => {
    return undefined;
  }
};

export = descriptor;
