// @ts-nocheck

import __uniquid from '../string/uniqid';
import __isOfType from '../is/ofType';
import __typeof from '../value/typeof';
import __SDescriptorResult from './SDescriptorResult';
import __get from '../object/get';
import __set from '../object/set';
import __deepMerge from '../object/deepMerge';
import ISDescriptor, {
  ISDescriptorCtor,
  ISDescriptorRule,
  ISDescriptorSettings,
  ISDescriptorRules,
  ISDescriptorResultObj,
  ISDescroptorGenerateSettings
} from './interface/ISDescriptor';
import ISDescriptorResult from './interface/ISDescriptorResult';

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
const __descriptorsStack: any = {};
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
   * @name      _descriptorResult
   * @type      ISDescriptorResult
   * @private
   *
   * Store the descriptor result object
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _descriptorResult: ISDescriptorResult;

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
   * @name         settings
   * @type         ISDescriptorSettings
   * @static
   *
   * Store the default settings for this particular descriptor class
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static settings: ISDescriptorSettings = {};

  /**
   * @name       generate
   * @type       Function
   * @static
   *
   * This static method allows you to generate quickly a new descriptor
   * bysimply passing some properties as settings.
   *
   * @param         {ISDescriptorGenerateSettings}      descriptorObj          An object describing your descriptor
   * @return        {Class}                                    A new class that represent your descriptor
   *
   * @setting       {String}        [name=null]             A name for your descriptor
   * @setting       {String}        [id=null]               An id for your descriptor
   * @setting       {ISDescriptorRules}         rules           An object of rules that your descriptor has to apply
   * @setting       {String}        [type='Object']         Specify some type(s) that your descriptor accept to validate
   * @setting       {ISDecriptorSettings}       [settings={}]       An object of settings to configure your descriptor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static generate(descriptorObj: ISDescroptorGenerateSettings): Class {
    const id = __uniquid();
    __descriptorsStack[id] = descriptorObj;
    class SGeneratedDescriptor extends SDescriptor {}
    SGeneratedDescriptor._descriptorId = id;
    return SGeneratedDescriptor;
  }

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
    let instance: any;
    if (this._descriptorId) {
      instance = new SDescriptor(this._descriptorId);
    } else {
      instance = new this(settings);
    }
    return instance.apply(value, settings);
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
  constructor(settings?: ISDescriptorSettings | string) {
    if (typeof settings === 'string') {
      // restore from a generated descriptor
      const descriptorObj = __descriptorsStack[settings];
      this.constructor.rules = descriptorObj.rules;
      this.constructor.type = descriptorObj.type || 'Object';
      this.constructor.settings = descriptorObj.settings || {};
      settings = {};
      if (descriptorObj.name) settings.name = descriptorObj.name;
      if (descriptorObj.id) settings.id = descriptorObj.id;
    }

    // save the settings
    this._settings = __deepMerge(
      {
        arrayAsValue: false,
        throwOnMissingRule: true,
        complete: true
      },
      this.constructor.settings,
      settings
    );
  }

  /**
   * @name          name
   * @type          String
   * @get
   *
   * Access the descriptor name. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get name(): string {
    return this._settings.name !== undefined
      ? this._settings.name
      : this.constructor.name;
  }

  /**
   * @name          id
   * @type          String
   * @get
   *
   * Access the descriptor id. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get id(): string {
    return this._settings.id !== undefined
      ? this._settings.id
      : this.constructor.id;
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

    // initialize the descriptor result instance
    this._descriptorResult = new __SDescriptorResult(
      this,
      value,
      Object.assign({}, settings)
    );

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
    } else if (
      typeof value === 'object' &&
      value !== null &&
      value !== undefined
    ) {
      // loop on each object properties
      Object.keys(this.constructor.rules).forEach((propName) => {
        const propValue = __get(value, propName);
        // validate the object property
        const validationResult = this._validate(propValue, propName, settings);
        if (validationResult !== undefined && validationResult !== null) {
          __set(value, propName, validationResult);
        }
      });
    } else {
      // validate the object property
      const validationResult = this._validate(value, undefined, settings);
    }

    if (this._descriptorResult.hasIssues()) return this._descriptorResult;
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
  ): ISDescriptorResult | true {
    // check if we have a propName, meaning that we are validating an object
    let rules = this.constructor.rules;
    if (propName !== undefined) {
      if (this.constructor.rules[propName] === undefined) return true;
      rules = this.constructor.rules[propName];
    }

    // check the "complete" setting
    if (settings.complete) {
      if (
        (value === null || value === undefined) &&
        rules.default !== undefined
      ) {
        value = rules.default;
      }
    }

    // loop on the rules object
    Object.keys(rules).forEach((ruleName) => {
      // do not take care of "default" rule name
      if (ruleName === 'default') return;

      const ruleValue = rules[ruleName];
      // make sure we have this rule registered
      if (this.constructor._registeredRules[ruleName] === undefined) {
        if (settings.throwOnMissingRule) {
          throw `Sorry but you try to validate a value using the "<yellow>${ruleName}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys(this.constructor._registeredRules).join('\n- ')}`;
        }
      } else {
        const ruleObj = this.constructor._registeredRules[ruleName];
        const params =
          ruleObj.processParams !== undefined
            ? ruleObj.processParams(ruleValue)
            : ruleValue;
        const ruleSettings =
          ruleObj.settings !== undefined ? ruleObj.settings : {};
        // check if the rule accept this type of value
        if (ruleObj.accept && __isOfType(value, ruleObj.accept) !== true)
          return;
        const ruleResult = ruleObj.apply(value, params, ruleSettings, settings);
        if (ruleResult === true) return value;
        const obj = ruleResult === false ? {} : ruleResult;
        obj.__ruleObj = ruleObj;
        obj.__propName = propName;
        this._descriptorResult.add(obj);
      }
    });

    // return the value that can have been processed
    return value;
  }
};

export = Cls;
