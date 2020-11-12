import __toString from '../string/toString';
import __isNode from '../is/node';

/**
 * @name          SValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the base validation class
 * that can be extended to create some validations like the "required" one, etc...
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SValidation {
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
  static apply(...args) {
    const checkResult = this.exec(...args);
    if (checkResult === true) return true;
    let message = this.message;
    const finalArgs = Array.isArray(checkResult) ? checkResult : args;
    finalArgs.forEach((arg, i) => {
      let value = __toString(arg);
      if (Array.isArray(arg)) {
        value = arg.join(',');
      }
      message = message.replace(`%${i}`, value);
      // if (__isNode()) {
      //   const packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');
      //   message = message.replace(`${packageRoot(__dirname)}/`, '');
      //   message = message.replace(`${packageRoot()}/`, '');
      // }
    });
    return message;
  }

  /**
   * @name          exec
   * @type          Function
   * @static
   *
   * This static method is the one you have to overrive. It will be called by the ```apply``` one
   * with the same arguments and you have to return ```true``` or ```false``` depending on your
   * check result.
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
}

export default SValidation;
