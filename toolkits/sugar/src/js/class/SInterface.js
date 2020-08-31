import __getExtendsStack from '../class/getExtendsStack';
import __argsToObject from '../cli/argsToObject';
import __SError from '../error/SError';
import __isClass from '../is/class';
import __deepize from '../object/deepize';
import __deepMerge from '../object/deepMerge';
import __trimLines from '../string/trimLines';
import __validateObject from '../validation/object/validateObject';
import __validateObjectOutputString from '../validation/object/validateObjectOutputString';
import __typeof from '../value/typeof';
import __toString from '../string/toString';

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

    // name
    if (!settings.name) {
      settings.name = instance.constructor.name || instance.name;
    }

    const instanceType = __typeof(instance, {
      customClass: false
    });
    if (instanceType !== 'Object' && instanceType !== 'Class') {
      throw new __SError(
        `Sorry but the "<yellow>instance</yellow>" argument of the "<cyan>SInterface.apply</cyan>" static method have to be an <green>Object</green> and you've passed an <red>${__typeof(
          instance
        )}</red>...`
      );
    }

    let issueObj = {
      $issues: []
    };
    let implementationValidationResult;

    const extendsStack = __getExtendsStack(instance);

    // check if the passed instance base class already implements this insterface
    if (
      instance.constructor.__interfaces &&
      Array.isArray(instance.constructor.__interfaces)
    ) {
      if (instance.constructor.__interfaces.indexOf(this) !== -1) return true;
    } else if (instance.__interfaces && Array.isArray(instance.__interfaces)) {
      if (instance.__interfaces.indexOf(this) !== -1) return true;
    }

    // extends array
    if (this.extendsArray && Array.isArray(this.extendsArray)) {
      this.extendsArray.forEach((cls) => {
        if (extendsStack.indexOf(cls) === -1) {
          setTimeout(() => {
            throw new __SError(
              `Your class|instance "<yellow>${
                instance.name || instance.constructor.name
              }</yellow>" that implements the "<cyan>${
                this.name
              }</cyan>" interface has to extend the "<green>${cls}</green>" class...`
            );
          });
        }
      });
    }

    // implements array
    if (this.implementsArray && Array.isArray(this.implementsArray)) {
      this.implements(instance, this.implementsArray, settings);
    }

    // definition object
    if (this.definitionObj) {
      implementationValidationResult = __validateObject(
        instance,
        this.definitionObj,
        {
          throw: false,
          name: settings.name,
          interface: settings.interface
        }
      );
      if (implementationValidationResult !== true) {
        issueObj = __deepMerge(issueObj, implementationValidationResult, {
          array: true
        });
      }
    }

    if (!issueObj.$issues.length) {
      // save on the instance and the constructor that we implements this interface correctly
      if (!instance.__interfaces) {
        Object.defineProperty(instance, '__interfaces', {
          enumerable: false,
          writable: true,
          value: [this]
        });
      } else if (Array.isArray(instance.__interfaces)) {
        instance.__interfaces.push(this);
      }
      if (!instance.constructor.__interfaces) {
        Object.defineProperty(instance.constructor, '__interfaces', {
          enumerable: false,
          writable: true,
          value: [this]
        });
      } else if (Array.isArray(instance.constructor.__interfaces)) {
        instance.constructor.__interfaces.push(this);
      }

      return true;
    }

    if (settings.throw) {
      throw new __SError(this.outputString(issueObj, settings));
    }

    switch (settings.return.toLowerCase()) {
      case 'object':
        return issueObj;
      case 'string':
      default:
        return SInterface.outputString(issueObj, settings);
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
  static applyAndThrow(instance, settings = {}) {
    const apply = SInterface.apply.bind(this);
    return apply(instance, {
      ...settings,
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
  static applyAndComplete(object, settings = {}) {
    const completedObject = this.complete(object, settings);
    this.applyAndThrow(completedObject, settings);
    return completedObject;
  }

  /**
   * @name          implements
   * @type          Function
   * @static
   *
   * This static method allows you to tell that a particular instance of a class implements
   * one or more interfaces. This allows you after to specify the property "implements" with an array
   * of SInterface classes that you want your property to implements
   *
   * @param         {SInterface}          ...interfaces           The interfaces you want to implements
   *
   * @since         2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static implements(instance, interfaces = null, settings = {}) {
    if (interfaces === null) interfaces = [this];
    if (!Array.isArray(interfaces)) interfaces = [interfaces];

    if (__isClass(instance)) {
      // return instance;
      class SInterfaceImplementsMiddleClass extends instance {
        constructor(...args) {
          super(...args);
          SInterface.implements(this, interfaces, settings);
        }
      }
      Object.defineProperty(SInterfaceImplementsMiddleClass, 'name', {
        value: instance.name
      });

      // if (settings.applyOnStatic) {
      //   const staticFns = Object.getOwnPropertyNames(instance).filter(
      //     (prop) => typeof instance[prop] === 'function'
      //   );
      //   staticFns.forEach((fnName) => {
      //     SInterfaceImplementsMiddleClass[fnName] = function (...args) {
      //       interfaces.forEach((Interface) => {
      //         Interface.apply(SInterfaceImplementsMiddleClass, {
      //           ...settings,
      //           interface: Interface.name
      //         });
      //       });

      //       return instance[fnName](...args);
      //     };
      //   });
      // }

      return SInterfaceImplementsMiddleClass;
    }

    // make sure the instance has all the interfaces requirements
    interfaces.forEach((Interface) => {
      Interface.apply(instance, {
        ...settings,
        interface: Interface.name
      });
    });
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
  static complete(data, settings = {}) {
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
  static outputString(resultObj, settings = {}) {
    const headerString = this._outputHeaderString(settings);
    const string = __validateObjectOutputString(resultObj, settings);
    return __trimLines(`${headerString}${string}`);
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
  static output(resultObj, settings = {}) {
    const string = this.outputString(resultObj, settings);
    console.log(string);
  }

  /**
   * @name                _outputHeaderString
   * @type                Function
   * @private
   *
   * This method simply generate the output header depending on the passed settings like:
   * - title: The title you want to display
   * - description: A description to explain a little bit more the issue
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _outputHeaderString(settings = {}) {
    let array = [];
    if (settings.title) {
      array.push(`<red><underline>${settings.title}</underline></red>`);
      array.push(' ');
    }
    if (settings.description) {
      array.push(`${settings.description}`);
      array.push(' ');
    }

    return array.join('\n');
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
