import __deepMerge from '../object/deepMerge';
import __validateObject from '../validation/object/validateObject';
import __validateObjectOutputString from '../validation/object/validateObjectOutputString';
import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines';
import __SDefinitionObjectError from '../error/SObjectValidationError';

/**
 * @name              SInterface
 * @namespace           js.class
 * @type              Function
 *
 * This class allows you to define an interface that you can later apply to an object instance
 * to make sure this particular instance has all the features, methods and properties you want.
 *
 * @example         js
 * import SInterface from '@coffeekraken/sugar/js/class/SInterface';
 * class MyCoolInterface extends SInterface {
 *    static definitionObj = {
 *      title: {
 *        type: 'String',
 *        required: true
 *      },
 *      doSomething: {
 *        type: 'Function',
 *        required: true
 *      }
 *    }
 * }
 *
 * class MyClass {
 *    constructor() {
 *      MyCoolInterface.apply(this);
 *    }
 * }
 *
 * const myObject = new MyClass();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
export default class SInterface {
  /**
   * @name              settings
   * @type              Object
   * @static
   *
   * Store the default settings that will be passed to the ```apply``` function
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static settings = {
    throw: true,
    return: 'String'
  };

  /**
   * @name              apply
   * @type              Function
   * @static
   *
   * This static method allows you to apply the interface on an object instance.
   * By default, if something is wrong in your class implementation, an error with the
   * description of what's wrong will be thrown. You can change that behavior if you prefer having
   * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
   *
   * @param       {Object}                instance              The instance to apply the interface on
   * @param       {Object}               [settings={}]         An object of settings to configure your apply process
   * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
   * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static apply(instance, settings = {}) {
    settings = __deepMerge(SInterface.settings, settings);

    let issues = [];
    let issueObj = {
      issues: []
    };

    const implementationValidationResult = __validateObject(
      instance,
      this.definitionObj,
      {
        throw: settings.throw,
        name: instance.name || instance.constructor.name
      }
    );
    if (implementationValidationResult !== true) {
      issueObj = __deepMerge(issueObj, implementationValidationResult, {
        array: true
      });
    }

    if (!issueObj.issues.length) return true;

    if (settings.throw) {
      throw new __SDefinitionObjectError(issueObj);
    }

    switch (settings.return.toLowerCase()) {
      case 'object':
        return issueObj;
        break;
      case 'string':
      default:
        return SInterface.outputString(issueObj);
        break;
    }
  }

  /**
   * @name          applyAndThrow
   * @type          Function
   * @static
   *
   * This static method do the exact same as the ```apply``` one but will throw an error if something is wrong...
   *
   * @param       {Object}                instance              The instance to apply the interface on
   * @return      {Boolean}                                     Return true is all is ok. Throw an error otherwise
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static applyAndThrow(instance) {
    const apply = SInterface.apply.bind(this);
    apply(instance, {
      throw: true
    });
  }

  /**
   * @name          outputString
   * @type          Function
   * @static
   *
   * This static method allows you to get the ```apply``` result
   * in a readable way.
   *
   * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
   * @return        {String}                                    The string version of the result
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static outputString(resultObj) {
    const string = __validateObjectOutputString(resultObj);
    return string;
  }

  /**
   * @name          output
   * @type          Function
   * @static
   *
   * This static method allows you to console.log the ```apply``` result
   * in a readable way.
   *
   * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
   * @return        {String}                                    The string version of the result
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static output(resultObj) {
    const string = __validateObjectOutputString(resultObj);
    console.log(string);
  }
}
