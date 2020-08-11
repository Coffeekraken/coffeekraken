import __deepMerge from '../object/deepMerge';
import __validateObject from '../validation/object/validateObject';
import __validateObjectOutputString from '../validation/object/validateObjectOutputString';
import __parseHtml from '../console/parseHtml';
import __trimLines from '../string/trimLines';
import __argsToObject from '../cli/argsToObject';
import __SDefinitionObjectError from '../error/SObjectValidationError';
import __deepize from '../object/deepize';

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
    settings = __deepMerge(this.settings, settings);

    let issues = [];
    let issueObj = {
      issues: []
    };

    const implementationValidationResult = __validateObject(
      instance,
      this.definitionObj,
      {
        throw: false,
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
      const message = this.outputString(implementationValidationResult);
      let outputArray = [];
      if (this.title || settings.title) {
        outputArray.push(
          `<bold><underline>${settings.title || this.title}</underline></bold>`
        );
        outputArray.push('');
      }
      if (this.description || settings.description) {
        outputArray.push(settings.description || this.description);
        outputArray.push('');
      }
      outputArray.push(message);
      throw outputArray.join('\n');
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
   * @name          applyAndComplete
   * @type          Function
   * @static
   *
   * This static method allows you to complete the passed data object and apply the interface
   * directly. If something goes wrong, it will throw an error, otherwise, return the
   * completed object
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static applyAndComplete(object) {
    const completedObject = this.complete(object);
    this.applyAndThrow(completedObject);
    return completedObject;
  }

  /**
   * @name          complete
   * @type          Function
   * @static
   *
   * This static method allows you to pass an object to complete with the "default" values
   * of the definition object if needed
   *
   * @param         {Object}            data              The data object to complete
   * @return        {Object}                              The completed data object
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static complete(data) {
    const argsObj = Object.assign({}, data);

    // loop on all the arguments
    Object.keys(this.definitionObj).forEach((argString) => {
      const argDefinitionObj = this.definitionObj[argString];

      // check if we have an argument passed in the properties
      if (
        argsObj[argString] === undefined &&
        argDefinitionObj.default !== undefined
      ) {
        argsObj[argString] = argDefinitionObj.default;
      }
    });

    // return the argsObj
    return __deepize(argsObj);
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

  /**
   * @name                parse
   * @type                Function
   * @static
   *
   * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
   * depending on the definition object of this interface
   *
   * @param       {String}            string            The string to parse
   * @return      {Object}                              The object of arguments values
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static parse(string) {
    const args = __argsToObject(string, this.definitionObj);
    return args;
  }

  /**
   * @name                parseAndComplete
   * @type                Function
   * @static
   *
   * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
   * depending on the definition object of this interface.
   * It will also complete the data object obtained with the "default" values if needed
   *
   * @param       {String}            string            The string to parse
   * @return      {Object}                              The object of arguments values
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static parseAndComplete(string) {
    let args = __argsToObject(string, this.definitionObj);
    args = this.complete(args);
    return args;
  }
}
