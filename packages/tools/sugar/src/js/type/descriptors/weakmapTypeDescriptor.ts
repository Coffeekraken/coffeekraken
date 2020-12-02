// shared

import { ISTypeDescriptor } from '../interface/ISType';

/**
 * @name              weakmapTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "map" with some utilities methods like "is", "cast", etc...
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
  name: 'WeakMap',
  id: 'weakmap',
  is: (value: any) => value instanceof WeakMap,
  cast: (value: any) => {
    throw `Sorry but nothing can be casted to a WeakMap for now`;
  }
};

export = descriptor;
