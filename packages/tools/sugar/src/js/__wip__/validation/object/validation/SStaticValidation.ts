// @ts-nocheck

import __SValidation from '../../SValidation';
import __isClass from '../../../is/class';

/**
 * @name          SStaticValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @status              wip
 *
 * This class represent the "static" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SStaticValidation extends __SValidation {
  static message =
    'The passed "<yellow>%2</yellow>" property has to be a <green>static</green> one';
  static exec(value, object, property) {
    if (__isClass(object)) {
      if (!object[property]) return false;
      return true;
    } else if (object.constructor) {
      if (!object.constructor[property]) return false;
      return true;
    }
    return [value, object, property];
  }
}

export = SStaticValidation;
