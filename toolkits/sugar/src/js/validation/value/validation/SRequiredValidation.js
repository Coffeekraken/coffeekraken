import __SValueValidation from './SValueValidation';
import __SValueValidationInterface from './interface/SValueValidationInterface';

/**
 * @name          SRequiredValidation
 * @namespace     js.validation.value.validation
 * @type          Class
 *
 * This class represent the "required" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SRequiredValidation extends __SValueValidation {
  static apply(value) {
    return false;
  }
}
