// shared

import { ISTypeDescriptor } from '../interface/ISType';
import __SFile from '../../fs/SFile';
import __fs from 'fs';
import __isPath from '../../is/path';
import __toString from '../../string/toString';

/**
 * @name              fileTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "file" with some utilities methods like "is", "cast", etc...
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
  name: 'File',
  id: 'file',
  is: (value: any) => {
    if (value instanceof __SFile) return true;
    if (typeof value === 'string') {
      return __fs.existsSync(value);
    }
    return false;
  },
  cast: (value: any) => {
    if (value instanceof __SFile) return value;
    if (typeof value !== 'string' || __isPath(value) !== true) {
      return new Error(
        `Sorry but the passed value "${__toString(
          value
        )}" is not a valid path to a hypotetical file`
      );
    }
    return new __SFile(value);
  }
};

export = descriptor;
