import __deepMerge from '../object/deepMerge';
import __validateDefinitionObject from '../object/validateDefinitionObject';
import __validateWithDefinitionObject from '../object/validateWithDefinitionObject';
import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines';

/**
 * @name              Interface
 * @namespace           js.class
 * @type              Function
 *
 * This class allows you to define an interface that you can later apply to an object instance
 * to make sure this particular instance has all the features, methods and properties you want.
 *
 * @param         {Object}               instance                The class instance you want to check
 * @param         {Object}               interface               The interface that the class instance has to match
 * @param         {Object}                [settings={}]         An object of settings to configure your implement test:
 * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
 * @return        {Boolean}                                      true if the test pass, a string describing the error if not...
 *
 * @example         js
 * import Interface from '@coffeekraken/sugar/js/class/Interface';
 * class MyCoolInterface extends Interface {
 *    static interface = {
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
export default class Interface {
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
    throw: false
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
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static apply(instance, settings = {}) {
    settings = __deepMerge(Interface.settings, settings);

    let issues = [];
    let issueObj = {
      issues: []
    };

    // const definitionObjValidationResult = __validateDefinitionObject(
    //   this.interface
    // );
    // if (definitionObjValidationResult !== true)
    //   issues = [...issues, ...definitionObjValidationResult];

    // if (
    //   definitionObjValidationResult !== true &&
    //   settings.throw &&
    //   settings.bySteps
    // ) {
    //   throw new Error(definitionObjValidationResult);
    // }

    const implementationValidationResult = __validateWithDefinitionObject(
      instance,
      this.interface
    );
    if (implementationValidationResult !== true) {
      issueObj = {
        ...issueObj,
        ...implementationValidationResult,
        issues: [...issueObj.issues, ...implementationValidationResult.issues]
      };
    }

    if (!issueObj.issues.length) return true;

    if (settings.throw) {
      throw new Error(issueObj);
    }
    // console.log('SOSOS', issueObj);
    return issueObj;

    // let issuesString = __parseHtml(
    //   __trimLines(`<yellow>${
    //     instance.constructor.name
    //   }</yellow> implementing <cyan>${this.name}</cyan> issues:

    //   - ${issues.join('\n- ')}
    // `)
    // );

    // if (settings.throw) {
    //   throw new Error(issuesString);
    // } else {
    //   return issuesString;
    // }
  }
}
