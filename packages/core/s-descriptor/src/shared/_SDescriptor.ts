import __SClass from '@coffeekraken/s-class';
import __isOfType from '@coffeekraken/sugar/shared/is/ofType';
import __typeof from '@coffeekraken/sugar/shared/value/typeof';
import __SDescriptorResult from './SDescriptorResult';
import __get from '@coffeekraken/sugar/shared/object/get';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __set from '@coffeekraken/sugar/shared/object/set';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

import {
  ISDescriptorCtorSettings,
  ISDescriptorSettings,
  ISDescriptorDescription,
  ISDescriptorRuleApplyFn,
  ISDescriptorRule,
  ISDescriptorRegisteredRule,
  ISDescriptorRules,
  ISDescriptorRegisteredRules,
  ISDescriptionValidationResult,
  ISDescriptorCtor,
  ISDescriptor,
  ISDescriptorResult,
  ISDescriptorResultRule
} from './ISDescriptor';

/**
 * @name                SDescriptor
 * @namespace           s-descriptor.shared
 * @type                Class
 * @extends             SClass
 * @status              beta
 *
 * Make a description...
 *
 * @param       {ISDescriptorSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @todo      handle array values
 * @todo      handle not object values
 * @todo      doc
 * @todo      interfaces
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

// @ts-ignore
class SDescriptor extends __SClass implements ISDescriptor {
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
  _descriptorResult?: ISDescriptorResult;

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
   * @name      descriptorSettings
   * @type      ISDescriptorSettings
   * @get
   *
   * Access the descriptor settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get descriptorSettings(): ISDescriptorSettings {
    return (<any>this)._settings.descriptor;
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
  constructor(settings?: ISDescriptorCtorSettings) {
    // save the settings
    super(
      __deepMerge(
        {
          descriptor: {
            rules: {},
            type: 'Object',
            arrayAsValue: false,
            throwOnMissingRule: false,
            throw: false,
            complete: true,
            verbose: false
          }
        },
        settings ?? {}
      )
    );
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
    settings?: Partial<ISDescriptorSettings>
  ): ISDescriptorResult {
    // handle settings
    const set = <ISDescriptorSettings>(
      __deepMerge(this.descriptorSettings, settings || {})
    );

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
      Object.assign({}, set)
    );

    const rules = set.rules;

    // check the passed value type correspond to the descriptor type
    if (!__isOfType(value, set.type)) {
      throw `Sorry but this descriptor "<yellow>${
        this.metas.name
      }</yellow>" does not accept values of type "<cyan>${__typeof(
        value
      )}</cyan>" but only "<green>${set.type}</green>"...`;
    }

    // check the type to validate correctly the value
    if (Array.isArray(value) && !set.arrayAsValue) {
      // loop on each items
      throw new Error(
        `Sorry but the support for arrays like values has not been integrated for not...`
      );
      // value.forEach((item) => {});
    } else if (
      typeof value === 'object' &&
      value !== null &&
      value !== undefined
    ) {
      // loop on each object properties
      Object.keys(rules).forEach((propName) => {
        // const ruleObj = rules[propName];

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
          set.complete &&
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
          set
        );

        if (validationResult !== undefined && validationResult !== null) {
          __set(finalValuesObj, propName, validationResult);
        }
      });
    } else {
      console.warn(value);
      throw new Error(
        `You can apply an <yellow>SDescriptor</yellow> only on an Object like value...`
      );
    }

    if (this._descriptorResult.hasIssues() && set.throw) {
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
    propName: string,
    rulesObj: any,
    settings: ISDescriptorSettings
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
      if ((<any>this).constructor._registeredRules[ruleName] === undefined) {
        if (settings.throwOnMissingRule) {
          throw `Sorry but you try to validate a value using the "<yellow>${ruleName}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys((<any>this).constructor._registeredRules).join(
                '\n- '
              )}`;
        }
      } else {
        const ruleObj = (<any>this).constructor._registeredRules[ruleName];
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
      const obj: ISDescriptorResultRule = {
        __error: ruleResult,
        __ruleObj: ruleObj,
        __propName: propName
      };
      // @ts-ignore
      this._descriptorResult.add(obj);
      return value;
    } else {
      return ruleResult;
    }
  }
}

export default SDescriptor;
