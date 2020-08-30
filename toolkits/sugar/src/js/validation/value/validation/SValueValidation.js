import __SValueValidationInterface from './interface/SValueValidationInterface';

/**
 * @name          SValueValidation
 * @namespace     js.validation.value.validation
 * @type          Class
 *
 * This class represent the base validation class
 * that can be extended to create some validations like the "required" one, etc...
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SValueValidation {
  /**
   * @name          apply
   * @type          Function
   * @static
   *
   * This static method is the main one when you want to apply a certain
   * validation on your value. Simply call this method and pass your value to validate.
   * By default, if the value does not pass the test, this method will
   * throw an error by using the "message" static property of the
   * validation class. If you don't want that but getting the string message back
   * insteaf, simply pass in the settings object the property "throw" to false
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // static apply(value, settings = {}) {
  //   return true;
  // }
}

export default __SValueValidationInterface.implements(
  SValueValidation,
  __SValueValidationInterface,
  {
    applyOnStatic: true
  }
);
