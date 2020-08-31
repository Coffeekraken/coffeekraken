import __SValidation from '../../SValidation';
import __isOfType from '../../../is/ofType';

/**
 * @name          SValuesValidation
 * @namespace     js.validation.value.validation
 * @type          Class
 *
 * This class represent the "values" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SValuesValidation extends __SValidation {
  static message =
    'This value must be one of these "<green>%1</green>" but you\'ve passed "<red>%0</red>"';
  static exec(value, values) {
    return values.indexOf(value) !== -1;
  }
}

export default SValuesValidation;
