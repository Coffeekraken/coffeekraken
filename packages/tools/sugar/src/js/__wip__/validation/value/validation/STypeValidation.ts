// @ts-nocheck

import __SValidation from '../../SValidation';
import __isOfType from '../../../is/ofType';

/**
 * @name          STypeValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @wip
 *
 * This class represent the "type" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STypeValidation extends __SValidation {
  static message =
    'This value has to be of type "<yellow>%1</yellow>" and you\'ve passed "<red>%0</red>" which is of type "<red>%2</red>"';
  static exec(value, type) {
    const result = __isOfType(value, type);
    if (result === true) return true;
    return [value, type, result.received.type];
  }
}

export = STypeValidation;
