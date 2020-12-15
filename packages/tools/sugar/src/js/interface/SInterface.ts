// @shared

import __toString from '../string/toString';
import __SDescriptor from '../descriptor/SDescriptor';
import ISInterface, {
  ISInterfaceSettings,
  ISInterfaceCtor
} from './interface/ISInterface';
import ISInterfaceResult from './interface/ISInterfaceResult';

import __deepMerge from '../object/deepMerge';
import { ISDescriptorRules } from '../descriptor/interface/ISDescriptor';
import ISDescriptorResult from '../descriptor/interface/ISDescriptorResult';
import __SInterfaceResult from './SInterfaceResult';

/**
 * @name            SInterface
 * @namespace       sugar.js.interface
 * @type            Class
 *
 * This class allows you to define some rules that some object or instance
 * have to follow. You will be able to apply these rules and see what
 * does not fit correctly.
 *
 * @todo         doc
 * @todo        tests
 * @todo        add possibility to set a "details" on each rules for better returns
 *
 * @example         js
 * import SInterface from '@coffeekraken/sugar/js/interface/SInterface';
 * class MyCoolInterface extends SInterface {
 *     static rules = {
 *          myProperty: {
 *              type: 'String',
 *              required: true
 *          }
 *      }
 * }
 * MyCoolInterface.apply({
 *      myProperty: 'Hello'
 * }); // => true
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISInterfaceCtor = class SInterface implements ISInterface {
  /**
   * @name              definition
   * @type              ISDescriptorRules
   * @static
   *
   * This property store all the SDescriptor rules that this interface
   * implements for each properties
   *
   * @since             2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definition: ISDescriptorRules = {};

  /**
   * @name              _definition
   * @type              ISDescriptorRules
   * @private
   *
   * This property store all the SDescriptor rules that this interface
   * implements for each properties
   *
   * @since             2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _definition: ISDescriptorRules = {};

  /**
   * @name              settings
   * @type              ISDescriptorRules
   * @static
   *
   * This property store all the settings for your SInterface class. These settings
   * can be overrided at instance level
   *
   * @since             2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static settings: ISInterfaceSettings = {};

  /**
   * @name              _settings
   * @type              ISDescriptorRules
   * @private
   *
   * This property store all the settings for your SInterface instance
   *
   * @since             2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISInterfaceSettings = {
    arrayAsValue: false,
    throwOnError: false,
    complete: true
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
   * @param       {Any}                instance              The instance to apply the interface on
   * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
   * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
   * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static apply(
    instance: any,
    settings: ISInterfaceSettings = {}
  ): ISInterfaceResult | true {
    // instanciate a new SInterface
    const int = new this(settings);
    return int.apply(instance);
  }

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings: ISInterfaceSettings = {}) {
    // @ts-ignore
    this._settings = __deepMerge(
      // @ts-ignore
      this.constructor.settings,
      this._settings,
      settings
    );
    // @ts-ignore
    this._definition = this.constructor.definition;
  }

  /**
   * @name              apply
   * @type              Function
   *
   * This method allows you to apply the interface on an object instance.
   * By default, if something is wrong in your class implementation, an error with the
   * description of what's wrong will be thrown. You can change that behavior if you prefer having
   * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
   *
   * @param       {Any}                instance              The instance to apply the interface on
   * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  apply(
    instance: any,
    settings: ISInterfaceSettings = {}
  ): ISInterfaceResult | true {
    let name = settings.name;
    if (name === undefined)
      name =
        instance.constructor !== undefined
          ? instance.constructor.name
          : instance.name;

    settings = __deepMerge(this._settings, settings);

    console.log('S', settings);

    const descriptor = new __SDescriptor({
      name,
      type: 'Object',
      rules: this._definition,
      arrayAsValue: settings.arrayAsValue,
      complete: settings.complete,
      throwOnError: false,
      ...(settings.descriptorSettings || {})
    });

    const descriptorResult: ISDescriptorResult = descriptor.apply(instance);

    // instanciate a new interface result object
    const interfaceResult: ISInterfaceResult = new __SInterfaceResult({
      descriptorResult
    });

    if (interfaceResult.hasIssues() && settings.throwOnError) {
      throw interfaceResult.toString();
    }

    // return new result object
    return interfaceResult;
  }
};
export = Cls;
