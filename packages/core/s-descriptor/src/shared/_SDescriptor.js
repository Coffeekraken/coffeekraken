var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import __SClass from "@coffeekraken/s-class";
import __isOfType from "@coffeekraken/sugar/shared/is/ofType";
import __typeof from "@coffeekraken/sugar/shared/value/typeof";
import __SDescriptorResult from "./SDescriptorResult";
import __get from "@coffeekraken/sugar/shared/object/get";
import __isGlob from "@coffeekraken/sugar/shared/is/glob";
import __set from "@coffeekraken/sugar/shared/object/set";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
class SDescriptor extends __SClass {
  static registerRule(rule) {
    if (rule.id === void 0 || typeof rule.id !== "string") {
      throw new Error(`Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`);
    }
    this._registeredRules[rule.id] = rule;
  }
  get descriptorSettings() {
    return this._settings.descriptor;
  }
  constructor(settings) {
    super(__deepMerge({
      descriptor: {
        rules: {},
        type: "Object",
        arrayAsValue: false,
        throwOnMissingRule: false,
        defaults: true
      }
    }, settings != null ? settings : {}));
  }
  apply(value, settings) {
    const set = __deepMerge(this.descriptorSettings, settings || {});
    if (value === void 0 || value === null)
      value = {};
    const valuesObjToProcess = {}, finalValuesObj = {};
    this._descriptorResult = new __SDescriptorResult(this, finalValuesObj, Object.assign({}, set));
    const rules = set.rules;
    if (!__isOfType(value, set.type)) {
      throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${__typeof(value)}</cyan>" but only "<green>${set.type}</green>"...`);
    }
    if (Array.isArray(value) && !set.arrayAsValue) {
      throw new Error(`Sorry but the support for arrays like values has not been integrated for not...`);
    } else if (typeof value === "object" && value !== null && value !== void 0) {
      Object.keys(rules).forEach((propName) => {
        if (__isGlob(propName) && value) {
        } else {
          valuesObjToProcess[propName] = __get(value, propName);
        }
      });
      Object.keys(valuesObjToProcess).forEach((propName) => {
        const ruleObj = rules[propName];
        if (valuesObjToProcess[propName] === void 0 && set.defaults && ruleObj.default !== void 0) {
          valuesObjToProcess[propName] = ruleObj.default;
        }
        if (ruleObj.interface !== void 0) {
          const interfaceValue = valuesObjToProcess[propName];
          valuesObjToProcess[propName] = ruleObj.interface.apply(interfaceValue || {}, {});
        }
        const validationResult = this._validate(valuesObjToProcess[propName], propName, ruleObj, set);
        if (validationResult !== void 0 && validationResult !== null) {
          __set(finalValuesObj, propName, validationResult);
        }
      });
    } else {
      console.warn(value);
      throw new Error(`You can apply an <yellow>SDescriptor</yellow> only on an Object like value...`);
    }
    if (this._descriptorResult.hasIssues()) {
      throw new Error(this._descriptorResult.toString());
    }
    return this._descriptorResult;
  }
  _validate(value, propName, rulesObj, settings) {
    if (rulesObj === void 0)
      return value;
    if (rulesObj.required === void 0 || rulesObj.required === false) {
      if (value === void 0 || value === null)
        return value;
    }
    let rulesNamesInOrder = Object.keys(rulesObj).filter((l) => l !== "default");
    rulesNamesInOrder = rulesNamesInOrder.sort((a, b) => {
      const objA = this.constructor._registeredRules[a];
      const objB = this.constructor._registeredRules[b];
      if (!objA)
        return -1;
      if (!objB)
        return 1;
      if (objA.priority === void 0)
        objA.priority = 9999999999;
      if (objB.priority === void 0)
        objB.priority = 9999999999;
      return objA.priotity - objB.priority;
    }).reverse();
    let resultValue = value;
    rulesNamesInOrder.forEach((ruleName) => {
      const ruleValue = rulesObj[ruleName];
      if (this.constructor._registeredRules[ruleName] === void 0) {
        if (settings.throwOnMissingRule) {
          throw new Error(`Sorry but you try to validate a value using the "<yellow>${ruleName}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys(this.constructor._registeredRules).join("\n- ")}`);
        }
      } else {
        const ruleObj = this.constructor._registeredRules[ruleName];
        const params = ruleObj.processParams !== void 0 ? ruleObj.processParams(ruleValue) : ruleValue;
        const ruleSettings = ruleObj.settings !== void 0 ? ruleObj.settings : {};
        if (ruleSettings.mapOnArray && Array.isArray(resultValue)) {
          let newResultValue = [];
          resultValue.forEach((v) => {
            const processedValue = this._processRule(v, ruleObj, propName, params, ruleSettings, settings);
            if (Array.isArray(processedValue)) {
              newResultValue = [
                ...newResultValue,
                ...processedValue
              ];
            } else {
              newResultValue.push(processedValue);
            }
          });
          resultValue = newResultValue;
        } else {
          const processedValue = this._processRule(resultValue, ruleObj, propName, params, ruleSettings, settings);
          resultValue = processedValue;
        }
      }
    });
    return resultValue;
  }
  _processRule(value, ruleObj, propName, params, ruleSettings, settings) {
    const ruleResult = ruleObj.apply(value, params, ruleSettings, __spreadProps(__spreadValues({}, settings), {
      propName,
      name: `${settings.name}.${propName}`
    }));
    if (params && params.type && params.type.toLowerCase() === "boolean" && ruleResult === true) {
      return true;
    }
    if (ruleResult instanceof Error) {
      const obj = {
        __error: ruleResult,
        __ruleObj: ruleObj,
        __propName: propName
      };
      if (this._descriptorResult) {
        this._descriptorResult.add(obj);
        throw new Error(this._descriptorResult.toString());
      }
    } else {
      return ruleResult;
    }
  }
}
SDescriptor._registeredRules = {};
SDescriptor.rules = {};
SDescriptor.type = "Object";
var SDescriptor_default = SDescriptor;
export {
  SDescriptor_default as default
};
