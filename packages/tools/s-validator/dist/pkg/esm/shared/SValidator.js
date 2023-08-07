// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __i18n from './i18n.js';
import __typeValidator, { definition as __typeValidatorDefinition, } from './validators/type.js';
import __base64Validator, { definition as __base64ValidatorDefinition, } from './validators/base64.js';
import __alphanumValidator, { definition as __alphanumValidatorDefinition, } from './validators/alphanum.js';
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
        var _a, _b, _c, _d;
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
            let validatorSettings = (_a = valueOrObj === null || valueOrObj === void 0 ? void 0 : valueOrObj.settings) !== null && _a !== void 0 ? _a : {}, validatorValue = (_b = valueOrObj === null || valueOrObj === void 0 ? void 0 : valueOrObj.value) !== null && _b !== void 0 ? _b : valueOrObj, res;
            // get the corresponding validator in the registered ones
            const validatorObj = SValidator._validators[validator];
            if (!validatorObj) {
                throw new Error(`Sorry but the validator "${validator}" is not registered`);
            }
            const finalValidatorSettings = Object.assign(Object.assign({}, validatorSettings), { i18n: (_c = this.settings.i18n[validator]) !== null && _c !== void 0 ? _c : {} });
            // validate using the validator
            res = validatorObj.validator(value, validatorValue, finalValidatorSettings);
            if (!res.valid) {
                // replace tokens in message
                res.message = (_d = res.message) === null || _d === void 0 ? void 0 : _d.replace('%value', value).replace('%validator', validator);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBRS9CLE9BQU8sZUFBZSxFQUFFLEVBRXBCLFVBQVUsSUFBSSx5QkFBeUIsR0FDMUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixPQUFPLGlCQUFpQixFQUFFLEVBQ3RCLFVBQVUsSUFBSSwyQkFBMkIsR0FDNUMsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLG1CQUFtQixFQUFFLEVBRXhCLFVBQVUsSUFBSSw2QkFBNkIsR0FDOUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLGdCQUFnQixFQUFFLEVBRXJCLFVBQVUsSUFBSSwwQkFBMEIsR0FDM0MsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLHFCQUFxQixFQUFFLEVBRTFCLFVBQVUsSUFBSSwrQkFBK0IsR0FDaEQsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLGdCQUFnQixFQUFFLEVBRXJCLFVBQVUsSUFBSSwwQkFBMEIsR0FDM0MsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLGNBQWMsRUFBRSxFQUVuQixVQUFVLElBQUksd0JBQXdCLEdBQ3pDLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxrQkFBa0IsRUFBRSxFQUV2QixVQUFVLElBQUksNEJBQTRCLEdBQzdDLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxrQkFBa0IsRUFBRSxFQUV2QixVQUFVLElBQUksNEJBQTRCLEdBQzdDLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxzQkFBc0IsRUFBRSxFQUUzQixVQUFVLElBQUksZ0NBQWdDLEdBQ2pELE1BQU0sNkJBQTZCLENBQUM7QUFD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