// @ts-nocheck

import __isOfType from '../is/ofType';
import __typeof from '../value/typeof';
import __SDescriptorResult, {
  ISDescriptorResult,
  ISDescriptorResultObj
} from './SDescriptorResult';
import __get from '../object/get';
import __isGlob from '../is/glob';
import __flatten from '../object/flatten';
import __set from '../object/set';
import __deepMerge from '../object/deepMerge';

/**
 * @name                SDescriptor
 * @namespace           sugar.js.descriptor
 * @type                Class
 * @status              beta
 *
 * This class is the main one that MUST be used as parent one
 * when creating any descriptor like object, string, etc...
 *
 * @param       {ISDescriptorSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @todo      handle array values
 * @todo      handle not object values
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

export interface ISDescriptorSettings {
  type?: string;
  arrayAsValue?: boolean;
  throwOnMissingRule?: boolean;
  throw?: boolean;
  complete?: boolean;
  name?: string;
  id?: string;
  rules?: ISDescriptorRules;
  verbose?: boolean;
}

export interface ISDescriptorDescription {
  [key: string]: ISDescriptorDescription;
}

export interface ISDescriptorRuleApplyFn {
  (
    value: any,
    params: any,
    ruleSettings: any,
    settings: ISDescriptorSettings
  ): ISDescriptorResultObj;
}

export interface ISDescriptorRule {
  [key: string]: any;
}

export interface ISDescriptorRegisteredRule {
  id: string;
  name: string;
  settings: object;
  processParams?: Function;
  apply: ISDescriptorRuleApplyFn;
}

export interface ISDescriptorRules {
  [key: string]: ISDescriptorRule;
}

export interface ISDescroptorGenerateSettings {
  name?: string;
  id?: string;
  rules: ISDescriptorRules;
  type?: string;
  settings?: ISDescriptorSettings;
}

export interface ISDescriptionValidationResult {}
export interface ISDescriptorCtor {
  rules: ISDescriptorRules;
  type: string;
  new (settings?: ISDescriptorSettings): ISDescriptor;
  registerRule(rule: ISDescriptorRule): void;
}

export interface ISDescriptor {
  _settings: ISDescriptorSettings;
  name: string;
  id: string;
  apply(instance: any, settings?: ISDescriptorSettings);
}
class SDescriptor implements ISDescriptor {
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
  static _registeredRules: ISDescriptorRegisteredRules = {};

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
  static type = 'Object';

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
        type: 'Object',
        arrayAsValue: false,
        throwOnMissingRule: false,
        throw: false,
        complete: true,
        verbose: false
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

    // ensure we can apply the descriptor
    if (value === undefined || value === null) value = {};

    // need to be before the instanciation of the
    // descriptorResult for references reasons... to check when have time
    const valuesObjToProcess = {},
      finalValuesObj = {};

    // initialize the descriptor result instance
    this._descriptorResult = new __SDescriptorResult(
      this,
      finalValuesObj,
      Object.assign({}, settings)
    );

    const rules = settings.rules;

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
      throw new Error(
        `Sorry but the support for arrays like values has not been integrated for not...`
      );
      value.forEach((item) => {});
    } else if (
      typeof value === 'object' &&
      value !== null &&
      value !== undefined
    ) {
      // loop on each object properties
      Object.keys(rules).forEach((propName) => {
        const ruleObj = rules[propName];

        if (__isGlob(propName) && value) {
          // const globPropValue = __getGlob(value, `${propName}.*`, {
          //   deepize: false
          // });
          // if (Object.keys(globPropValue).length) {
          //   Object.keys(globPropValue).forEach((propName) => {
          //     valuesObjToProcess[propName] = globPropValue[propName];
          //     rules[propName] = ruleObj;
          //   });
          // }
        } else {
          valuesObjToProcess[propName] = __get(value, propName);
        }
      });

      Object.keys(valuesObjToProcess).forEach((propName) => {
        const ruleObj = rules[propName];
        // complete
        if (
          valuesObjToProcess[propName] === undefined &&
          settings.complete &&
          ruleObj.default !== undefined
        ) {
          valuesObjToProcess[propName] = ruleObj.default;
        }

        // interface
        if (ruleObj.interface !== undefined) {
          const interfaceValue = valuesObjToProcess[propName];
          // _console.log('VAL', valuesObjToProcess[propName], propName);
          const interfaceRes = ruleObj.interface.apply(interfaceValue || {}, {
            complete: true,
            throw: false
          });
          if (interfaceRes.hasIssues()) {
            throw new Error(interfaceRes.toString());
          } else {
            valuesObjToProcess[propName] = interfaceRes.value;
          }
        }

        // validate the property
        const validationResult = this._validate(
          valuesObjToProcess[propName],
          propName,
          ruleObj,
          settings
        );

        if (validationResult !== undefined && validationResult !== null) {
          __set(finalValuesObj, propName, validationResult);
        }
      });
    } else {
      _console.warn(value);
      throw new Error(
        `You can apply an <yellow>SDescriptor</yellow> only on an Object like value...`
      );
    }

    if (this._descriptorResult.hasIssues() && settings.throw) {
      throw new Error(this._descriptorResult.toString());
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
    rulesObj?: Object,
    settings?: ISDescriptorSettings
  ): ISDescriptorResult | true {
    if (rulesObj === undefined) return value;

    if (rulesObj.required === undefined || rulesObj.required === false) {
      if (value === undefined || value === null) return value;
    }

    let resultValue = value;

    // loop on the rules object
    Object.keys(rulesObj).forEach((ruleName) => {
      // do not take care of "default" rule name
      if (ruleName === 'default') return;
      const ruleValue = rulesObj[ruleName];
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
        // _console.log('AAA', propName, value, params);
        // if (ruleObj.accept && __isOfType(value, ruleObj.accept) !== true)
        //   return;
        // console.log('CC', propName, value, params);

        if (ruleSettings.mapOnArray && Array.isArray(resultValue)) {
          let newResultValue: any[] = [];
          resultValue.forEach((v) => {
            const processedValue = this._processRule(
              v,
              ruleObj,
              propName,
              params,
              ruleSettings,
              settings
            );
            if (Array.isArray(processedValue)) {
              newResultValue = [...newResultValue, ...processedValue];
            } else {
              newResultValue.push(processedValue);
            }
          });
          resultValue = newResultValue;
        } else {
          const processedValue = this._processRule(
            resultValue,
            ruleObj,
            propName,
            params,
            ruleSettings,
            settings
          );
          resultValue = processedValue;
        }
      }
    });

    // return the value that can have been processed
    return resultValue;
  }

  _processRule(value, ruleObj, propName, params, ruleSettings, settings) {
    const ruleResult = ruleObj.apply(value, params, ruleSettings, {
      ...settings,
      propName,
      name: `${settings.name}.${propName}`
    });

    if (ruleResult === true) return value;
    else if (ruleResult instanceof Error) {
      const obj = ruleResult === false ? {} : ruleResult;
      obj.__error = ruleResult;
      obj.__ruleObj = ruleObj;
      obj.__propName = propName;
      this._descriptorResult.add(obj);
      return value;
    } else {
      return ruleResult;
    }
  }
}

const Cls: ISDescriptorCtor = SDescriptor;

export default SDescriptor;
