// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __i18n from './i18n.js';
import __typeValidator, { definition as __typeValidatorDefinition, } from './validators/type.js';
import __base64Validator, { definition as __base64ValidatorDefinition, } from './validators/base64.js';
import __alphanumValidator, { definition as __alphanumValidatorDefinition, } from './validators/alphanum.js';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import __colorValidator, { definition as __colorValidatorDefinition, } from './validators/color.js';
import __creditCardValidator, { definition as __creditCardValidatorDefinition, } from './validators/creditCard.js';
import __emailValidator, { definition as __emailValidatorDefinition, } from './validators/email.js';
import __hexValidator, { definition as __hexValidatorDefinition, } from './validators/hex.js';
import __integerValidator, { definition as __integerValidatorDefinition, } from './validators/integer.js';
import __isoDateValidator, { definition as __isoDateValidatorDefinition, } from './validators/isoDate.js';
import __isoDateTimeValidator, { definition as __isoDateTimeValidatorDefinition, } from './validators/isoDateTime.js';
import __isoTimeValidator, { definition as __isoTimeValidatorDefinition, } from './validators/isoTime.js';
import __maxValidator, { definition as __maxValidatorDefinition, } from './validators/max.js';
import __minValidator, { definition as __minValidatorDefinition, } from './validators/min.js';
import __negativeValidator, { definition as __negativeValidatorDefinition, } from './validators/negative.js';
import __numberValidator, { definition as __numberValidatorDefinition, } from './validators/number.js';
import __passwordValidator, { definition as __passwordValidatorDefinition, } from './validators/password.js';
import __patternValidator, { definition as __patternValidatorDefinition, } from './validators/pattern.js';
import __positiveValidator, { definition as __positiveValidatorDefinition, } from './validators/positive.js';
import __requiredValidator, { definition as __requiredValidatorDefinition, } from './validators/required.js';
import __urlValidator, { definition as __urlValidatorDefinition, } from './validators/url.js';
export default class SValidator extends __SClass {
    /**
     * @name            registerValidator
     * @type            Function
     * @static
     *
     * This static method allows you to register a new validator
     *
     * @param       {}
     */
    static registerValidator(name, validator, settings) {
        SValidator._validators[name] = {
            validator,
            settings,
        };
    }
    /**
     * @name            registerPreset
     * @type            Function
     * @static
     *
     * This static method allows you to register a new validator
     *
     * @param       {}
     */
    static registerPreset(name, rules, settings) {
        SValidator._presets[name] = {
            rules,
            settings,
        };
    }
    /**
     * @name         getValidatorsDefinition
     * @type        Function
     * @static
     *
     * Get back an definition of the validators in the SValidator class
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static getValidatorsDefinition() {
        const definition = {};
        for (let [name, validatorObj] of Object.entries(SValidator._validators)) {
            if (!validatorObj.settings.definition)
                continue;
            definition[name] = validatorObj.settings.definition;
        }
        return definition;
    }
    /**
     * @name                    constructor
     * @type                    Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(settings) {
        // save the settings
        super(__deepMerge({
            i18n: __i18n,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            validate
     * @type            Function
     *
     * This method allows you to validate any data using a lot of validators like "email", "url", "min", "max", etc...
     * The passed rules have to be an object with one or multiple properties representing the validations you want to make on your passed value.
     *
     * @param       {any}             value        The value to validate
     * @param       {ISValidatorRules}      rules        The rules to validate the value with
     * @param       {Partial<ISValidatorSettings>}         [settings={}]          Some settings to override from the constructor passed ones
     * @return      {ISValidatorValidateResult}                         The result object
     *
     * @example         js
     * import __SValidator from '@coffeekraken/s-validation';
     * const validator = new __SValidator();
     *
     * // min 2
     * validator.validate('Hello World Plop', {
     *      min: 2
     * });
     *
     * // email
     * validator.validate('plop', {
     *     email: true
     * });
     *
     * // with some custom settings
     * validator.validate('Hello World Plop', {
     *    min: {
     *       value: 2,
     *       settings: {
     *          i18n: {
     *             string: 'Something goes wrong'
     *          }
     *       }
     *    },
     * });
     *
     * // multiple rules
     * validator.validate('Hello World Plop', {
     *      min: 2,
     *      max: 10,
     *     email: true
     * });
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    validate(value, rulesOrPreset) {
        var _a, _b, _c;
        let result = {
            valid: true,
            rules: {},
            messages: [],
        };
        let rules = rulesOrPreset;
        if (typeof rulesOrPreset === 'string') {
            if (!SValidator._presets[rulesOrPreset]) {
                throw new Error(`Sorry but the preset "${rulesOrPreset}" is not registered`);
            }
            rules = SValidator._presets[rulesOrPreset].rules;
        }
        // empty value when no required rule
        if (!rules.required) {
            if (value === undefined || value === null || value === '') {
                return {
                    valid: true,
                    messages: null,
                };
            }
        }
        for (let [validator, valueOrObj] of Object.entries(rules)) {
            let validatorSettings = __isPlainObject(valueOrObj)
                ? valueOrObj
                : {}, validatorValue = (_a = valueOrObj === null || valueOrObj === void 0 ? void 0 : valueOrObj.value) !== null && _a !== void 0 ? _a : valueOrObj, res;
            // get the corresponding validator in the registered ones
            const validatorObj = SValidator._validators[validator];
            if (!validatorObj) {
                throw new Error(`Sorry but the validator "${validator}" is not registered`);
            }
            const finalValidatorSettings = Object.assign(Object.assign({}, validatorSettings), { i18n: (_b = this.settings.i18n[validator]) !== null && _b !== void 0 ? _b : {} });
            // validate using the validator
            res = validatorObj.validator(value, validatorValue, finalValidatorSettings);
            if (!res.valid) {
                // replace tokens in message
                res.message = (_c = res.message) === null || _c === void 0 ? void 0 : _c.replace('%value', value).replace('%validator', validator);
                result.valid = false;
                result.rules[validator] = res;
                result.messages.push(res.message);
            }
            else {
                result.rules[validator] = res;
            }
        }
        // return the result
        return result;
    }
}
/**
 * Store the registered validators
 */
SValidator._validators = {};
/**
 * Store the registered presets
 */
SValidator._presets = {};
// register default validators
SValidator.registerValidator('base64', __base64Validator, {
    definition: __base64ValidatorDefinition,
});
SValidator.registerValidator('min', __minValidator, {
    definition: __minValidatorDefinition,
});
SValidator.registerValidator('max', __maxValidator, {
    definition: __maxValidatorDefinition,
});
SValidator.registerValidator('email', __emailValidator, {
    definition: __emailValidatorDefinition,
});
SValidator.registerValidator('required', __requiredValidator, {
    definition: __requiredValidatorDefinition,
});
SValidator.registerValidator('isoDate', __isoDateValidator, {
    definition: __isoDateValidatorDefinition,
});
SValidator.registerValidator('isoTime', __isoTimeValidator, {
    definition: __isoTimeValidatorDefinition,
});
SValidator.registerValidator('isoDateTime', __isoDateTimeValidator, {
    definition: __isoDateTimeValidatorDefinition,
});
SValidator.registerValidator('integer', __integerValidator, {
    definition: __integerValidatorDefinition,
});
SValidator.registerValidator('number', __numberValidator, {
    definition: __numberValidatorDefinition,
});
SValidator.registerValidator('negative', __negativeValidator, {
    definition: __negativeValidatorDefinition,
});
SValidator.registerValidator('positive', __positiveValidator, {
    definition: __positiveValidatorDefinition,
});
SValidator.registerValidator('pattern', __patternValidator, {
    definition: __patternValidatorDefinition,
});
SValidator.registerValidator('alphanum', __alphanumValidator, {
    definition: __alphanumValidatorDefinition,
});
SValidator.registerValidator('creditCard', __creditCardValidator, {
    definition: __creditCardValidatorDefinition,
});
SValidator.registerValidator('color', __colorValidator, {
    definition: __colorValidatorDefinition,
});
SValidator.registerValidator('hex', __hexValidator, {
    definition: __hexValidatorDefinition,
});
SValidator.registerValidator('type', __typeValidator, {
    definition: __typeValidatorDefinition,
});
SValidator.registerValidator('password', __passwordValidator, {
    definition: __passwordValidatorDefinition,
});
SValidator.registerValidator('url', __urlValidator, {
    definition: __urlValidatorDefinition,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBRS9CLE9BQU8sZUFBZSxFQUFFLEVBQ3BCLFVBQVUsSUFBSSx5QkFBeUIsR0FDMUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLGlCQUFpQixFQUFFLEVBQ3RCLFVBQVUsSUFBSSwyQkFBMkIsR0FDNUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLG1CQUFtQixFQUFFLEVBRXhCLFVBQVUsSUFBSSw2QkFBNkIsR0FDOUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxnQkFBZ0IsRUFBRSxFQUVyQixVQUFVLElBQUksMEJBQTBCLEdBQzNDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxxQkFBcUIsRUFBRSxFQUUxQixVQUFVLElBQUksK0JBQStCLEdBQ2hELE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxnQkFBZ0IsRUFBRSxFQUVyQixVQUFVLElBQUksMEJBQTBCLEdBQzNDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxjQUFjLEVBQUUsRUFFbkIsVUFBVSxJQUFJLHdCQUF3QixHQUN6QyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sa0JBQWtCLEVBQUUsRUFFdkIsVUFBVSxJQUFJLDRCQUE0QixHQUM3QyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sa0JBQWtCLEVBQUUsRUFFdkIsVUFBVSxJQUFJLDRCQUE0QixHQUM3QyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sc0JBQXNCLEVBQUUsRUFFM0IsVUFBVSxJQUFJLGdDQUFnQyxHQUNqRCxNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sa0JBQWtCLEVBQUUsRUFFdkIsVUFBVSxJQUFJLDRCQUE0QixHQUM3QyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sY0FBYyxFQUFFLEVBRW5CLFVBQVUsSUFBSSx3QkFBd0IsR0FDekMsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGNBQWMsRUFBRSxFQUVuQixVQUFVLElBQUksd0JBQXdCLEdBQ3pDLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxtQkFBbUIsRUFBRSxFQUV4QixVQUFVLElBQUksNkJBQTZCLEdBQzlDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxpQkFBaUIsRUFBRSxFQUN0QixVQUFVLElBQUksMkJBQTJCLEdBQzVDLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxtQkFBbUIsRUFBRSxFQUV4QixVQUFVLElBQUksNkJBQTZCLEdBQzlDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxrQkFBa0IsRUFBRSxFQUV2QixVQUFVLElBQUksNEJBQTRCLEdBQzdDLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxtQkFBbUIsRUFBRSxFQUV4QixVQUFVLElBQUksNkJBQTZCLEdBQzlDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxtQkFBbUIsRUFBRSxFQUV4QixVQUFVLElBQUksNkJBQTZCLEdBQzlDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxjQUFjLEVBQUUsRUFFbkIsVUFBVSxJQUFJLHdCQUF3QixHQUN6QyxNQUFNLHFCQUFxQixDQUFDO0FBdUo3QixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBTTVDOzs7Ozs7OztPQVFHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUNwQixJQUFZLEVBQ1osU0FBbUIsRUFDbkIsUUFBK0M7UUFFL0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUMzQixTQUFTO1lBQ1QsUUFBUTtTQUNYLENBQUM7SUFDTixDQUFDO0lBT0Q7Ozs7Ozs7O09BUUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osS0FBNkIsRUFDN0IsUUFBK0M7UUFFL0MsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUN4QixLQUFLO1lBQ0wsUUFBUTtTQUNYLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLHVCQUF1QjtRQUMxQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQzNDLFVBQVUsQ0FBQyxXQUFXLENBQ3pCLEVBQUU7WUFDQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVO2dCQUFFLFNBQVM7WUFDaEQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxNQUFNO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQ0c7SUFDSCxRQUFRLENBQ0osS0FBVSxFQUNWLGFBQXdDOztRQUV4QyxJQUFJLE1BQU0sR0FBOEI7WUFDcEMsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUMxQixJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FDWCx5QkFBeUIsYUFBYSxxQkFBcUIsQ0FDOUQsQ0FBQzthQUNMO1lBQ0QsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3BEO1FBRUQsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZELE9BQU87b0JBQ0gsS0FBSyxFQUFFLElBQUk7b0JBQ1gsUUFBUSxFQUFFLElBQUk7aUJBQ2pCLENBQUM7YUFDTDtTQUNKO1FBRUQsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxpQkFBaUIsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsVUFBVTtnQkFDWixDQUFDLENBQUMsRUFBRSxFQUNSLGNBQWMsR0FBRyxNQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxLQUFLLG1DQUFJLFVBQVUsRUFDaEQsR0FBRyxDQUFDO1lBRVIseURBQXlEO1lBQ3pELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixNQUFNLElBQUksS0FBSyxDQUNYLDRCQUE0QixTQUFTLHFCQUFxQixDQUM3RCxDQUFDO2FBQ0w7WUFFRCxNQUFNLHNCQUFzQixtQ0FDckIsaUJBQWlCLEtBQ3BCLElBQUksRUFBRSxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxFQUFFLEdBQzVDLENBQUM7WUFFRiwrQkFBK0I7WUFDL0IsR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQ3hCLEtBQUssRUFDTCxjQUFjLEVBQ2Qsc0JBQXNCLENBQ3pCLENBQUM7WUFFRixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDWiw0QkFBNEI7Z0JBQzVCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBQSxHQUFHLENBQUMsT0FBTywwQ0FDbkIsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQ3hCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBRXRDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2pDO1NBQ0o7UUFFRCxvQkFBb0I7UUFDcEIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7QUF0TkQ7O0dBRUc7QUFDSSxzQkFBVyxHQUFvQyxFQUFFLENBQUM7QUFzQnpEOztHQUVHO0FBQ0ksbUJBQVEsR0FBb0MsRUFBRSxDQUFDO0FBNkwxRCw4QkFBOEI7QUFDOUIsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTtJQUN0RCxVQUFVLEVBQUUsMkJBQTJCO0NBQzFDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFO0lBQ2hELFVBQVUsRUFBRSx3QkFBd0I7Q0FDdkMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDaEQsVUFBVSxFQUFFLHdCQUF3QjtDQUN2QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFO0lBQ3BELFVBQVUsRUFBRSwwQkFBMEI7Q0FDekMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtJQUMxRCxVQUFVLEVBQUUsNkJBQTZCO0NBQzVDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUU7SUFDeEQsVUFBVSxFQUFFLDRCQUE0QjtDQUMzQyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFO0lBQ3hELFVBQVUsRUFBRSw0QkFBNEI7Q0FDM0MsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxzQkFBc0IsRUFBRTtJQUNoRSxVQUFVLEVBQUUsZ0NBQWdDO0NBQy9DLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUU7SUFDeEQsVUFBVSxFQUFFLDRCQUE0QjtDQUMzQyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFO0lBQ3RELFVBQVUsRUFBRSwyQkFBMkI7Q0FDMUMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtJQUMxRCxVQUFVLEVBQUUsNkJBQTZCO0NBQzVDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUU7SUFDMUQsVUFBVSxFQUFFLDZCQUE2QjtDQUM1QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFO0lBQ3hELFVBQVUsRUFBRSw0QkFBNEI7Q0FDM0MsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtJQUMxRCxVQUFVLEVBQUUsNkJBQTZCO0NBQzVDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLEVBQUU7SUFDOUQsVUFBVSxFQUFFLCtCQUErQjtDQUM5QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFO0lBQ3BELFVBQVUsRUFBRSwwQkFBMEI7Q0FDekMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDaEQsVUFBVSxFQUFFLHdCQUF3QjtDQUN2QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRTtJQUNsRCxVQUFVLEVBQUUseUJBQXlCO0NBQ3hDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUU7SUFDMUQsVUFBVSxFQUFFLDZCQUE2QjtDQUM1QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtJQUNoRCxVQUFVLEVBQUUsd0JBQXdCO0NBQ3ZDLENBQUMsQ0FBQyJ9