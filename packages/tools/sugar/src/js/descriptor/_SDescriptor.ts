// @ts-nocheck
// @shared

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
 * @todo      handle array values
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
   *
   * @todo      check utility of this property
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
        id: this.constructor.id || this.constructor.name,
        name: this.constructor.name,
        rules: this.constructor.rules || {},
        arrayAsValue: false,
        throwOnMissingRule: false,
        throwOnError: false,
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
  apply(value: any, settings?: ISDescriptorSettings): ISDescriptorResult {
    // handle settings
    settings = __deepMerge(this._settings, settings);

    // initialize the descriptor result instance
    this._descriptorResult = new __SDescriptorResult(
      this,
      value,
      Object.assign({}, settings)
    );

    // check the passed value type correspond to the descriptor type
    if (!__isOfType(value, settings.type)) {
      throw `Sorry but this descriptor "<yellow>${
        settings.name
      }</yellow>" does not accept values of type "<cyan>${__typeof(
        value
      )}</cyan>" but only "<green>${settings.type}</green>"...`;
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
      Object.keys(settings.rules).forEach((propName) => {
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

    if (this._descriptorResult.hasIssues() && settings.throwOnError) {
      throw this._descriptorResult.toString();
    }

    return this._descriptorResult;
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
    let rules = settings.rules;
    if (propName !== undefined) {
      if (settings.rules[propName] === undefined) return true;
      rules = settings.rules[propName];
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

    if (rules.required === undefined || rules.required === false) {
      if (value === undefined || value === null) return value;
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
