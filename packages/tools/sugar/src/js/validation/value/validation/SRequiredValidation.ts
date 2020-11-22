import __SValidation from '../../SValidation';

/**
 * @name          SRequiredValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "required" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SRequiredValidation extends __SValidation {
  static message =
    'This value is <yellow>required</yellow> and you\'ve passed "<red>%0"</red>';
  static exec(value) {
    return value !== null && value !== undefined;
  }
}

export default SRequiredValidation;
