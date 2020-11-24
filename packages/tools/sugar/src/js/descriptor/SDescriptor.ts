// @ts-nocheck

import __isOfType from '../is/ofType';
import __typeof from '../value/typeof';
import __deepMerge from '../object/deepMerge';
import ISDescriptor, {
  ISDescriptorCtor,
  ISDescriptorRule,
  ISDescriptorSettings,
  ISDescriptorRules,
  ISDescriptorResultObj,
  ISDescriptionValidationResult,
  ISDescriptorRuleApplyFn
} from './interface/ISDescriptor';

/**
 * @name                SDescriptor
 * @namespace           sugar.js.descriptor
 * @type                Class
 *
 * This class is the main one that MUST be used as parent one
 * when creating any descriptor like object, string, etc...
 *
 * @param       {ISDescriptorSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @example       js
 * import SDescriptor from '@coffeekraken/sugar/js/descriptor/SDescriptor';
 * class MyDescriptor extends SDescriptor {
 *    constructor(settings) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISDescriptorCtor = class SDescriptor implements ISDescriptor {
  /**
   * @name        _settings
   * @type        ISDescriptorSettings
   * @private
   *
   * Store the descriptor settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISDescriptorSettings;

  /**
   * @name      _registeredRules
   * @type      Object
   * @static
   *
   * Store the registered _registeredRules into a simple object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static _registeredRules: ISDescriptorRules = {};

  /**
   * @name      rules
   * @type      Object
   * @static
   *
   * Store the registered rules into a simple object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static rules: ISDescriptorRules = {};

  /**
   * @name      type
   * @type      String
   * @static
   * @default     Object
   *
   * Specify the type of the values that this descriptor is made for.
   * Can be:
   * - String|Array<String>
   * - Object
   * - Number
   * - Integer
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static type: string = 'Object';

  /**
   * @name      registerRule
   * @type      Function
   * @static
   *
   * This static method allows you to register a new rule
   * by passing a valid ISDescriptorRule object
   *
   * @param     {ISDescriptorRule}        rule        The rule object to register
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static registerRule(rule: ISDescriptorRule): void {
    if (rule.id === undefined || typeof rule.id !== 'string') {
      throw `Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`;
    }
    this._registeredRules[rule.id] = rule;
  }

  /**
   * @name        apply
   * @type        Function
   * @static
   *
   * This static method allows you to apply the descriptor on a value
   * withour having to instanciate a new descriptor.
   *
   * @param       {Any}         value         The value on which you want to apply the descriptor
   * @param       {ISDescriptorSettings}      [settings={}]       An object of settings to configure your apply process
   * @return      {ISDescriptorResultObj|true}            true if the descriptor does not have found any issue(s), an ISDescriptorResultObj object if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static apply(
    value: any,
    settings?: ISDescriptorSettings
  ): ISDescriptorResultObj | true {
    const instance = new this(settings);
    return instance.apply(value);
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings?: ISDescriptorSettings) {
    // save the settings
    this._settings = __deepMerge(
      {
        arrayAsValue: false,
        throwOnMissingRule: true
      },
      settings
    );
    // check that the descriptor class has a static "description" property
  }

  /**
   * @name          apply
   * @type          Function
   *
   * This method simply apply the descriptor instance on the passed value.
   * The value can be anything depending on the descriptor you use.
   * When you pass an Array, by default it will apply the descriptor on
   * each array items. If you don't want this behavior and the Array passed has to be
   * treated as a single value, pass the "arrayAsValue" setting to true
   *
   * @param       {Any}       value         The value to apply the descriptor on
   * @param       {ISDescriptorSettings}        [settings={}]       An object of settings to configure your descriptor. These settings will override the base ones passed in the constructor
   * @return      {ISDescriptorResultObj|true}           Will return true if all is ok, and an object describing the issue if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  apply(
    value: any,
    settings?: ISDescriptorSettings
  ): ISDescriptorResultObj | true {
    // handle settings
    settings = __deepMerge(this._settings, settings);

    // check the passed value type correspond to the descriptor type
    if (!__isOfType(value, this.constructor.type)) {
      throw `Sorry but this descriptor "<yellow>${
        this.constructor.name
      }</yellow>" does not accept values of type "<cyan>${__typeof(
        value
      )}</cyan>" but only "<green>${this.constructor.type}</green>"...`;
    }

    // check the type to validate correctly the value
    if (Array.isArray(value) && !settings.arrayAsValue) {
      // loop on each items
      value.forEach((item) => {});
    } else if (typeof value === 'object') {
      // loop on each object properties
      Object.keys(value).forEach((propName) => {
        const propValue = value[propName];
        // validate the object property
        this._validate(propValue, propName, settings);
      });
    } else {
      // validate the passed value
    }

    return true;
  }

  /**
   * @name          _validate
   * @type          Function
   * @private
   *
   * This method take a value and validate it using the defined rules
   *
   * @param       {Any}       value       The value to validate
   * @return      {ISDescriptionValidationResult|true}        true if the validation has been made correctly, an object describing the issue if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _validate(
    value: any,
    propName?: string,
    settings?: ISDescriptorSettings
  ): ISDescriptionValidationResult | true {
    // check if we have a propName, meaning that we are validating an object
    let rules = this.constructor.rules;
    if (propName !== undefined) {
      if (this.constructor.rules[propName] === undefined) return true;
      rules = this.constructor.rules[propName];
    }
    // loop on the rules object
    Object.keys(rules).forEach((ruleName) => {
      const ruleValue = rules[ruleName];
      // make sure we have this rule registered
      if (this.constructor._registeredRules[ruleName] === undefined) {
        if (settings.throwOnMissingRule) {
          throw `Sorry but you try to validate a value using the "<yellow>${ruleName}</yellow>" rule but this rule is not registered. Here's the available rules:
          - ${Object.keys(this.constructor._registeredRules).join('\n- ')}`;
        }
      } else {
        console.log('validte', ruleName);
      }
    });
  }
};

export = Cls;
