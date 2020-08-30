const __SInterface = require('../../../../class/SInterface');

/**
 * @name                SValueValidationInterface
 * @namespace           js.validation.value.validation
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirements
 * for a validation class that extends the SValueValidation one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SValueValidationInterface extends __SInterface {
  static definitionObj = {
    apply: {
      type: 'Function',
      required: true,
      description:
        'This is the method that must be used when you want to validate a value.',
      static: true
    },
    exec: {
      type: 'Function',
      required: true,
      description:
        'This is the method that will be called to validate the passed value. This method has to return true of false depending on the check result',
      static: true
    }
  };
};
