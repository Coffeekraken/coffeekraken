// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from './i18n/en';
import __alphanumValidator, { definition as __alphanumValidatorDefinition, } from './validators/alphanum';
import __colorValidator, { definition as __colorValidatorDefinition, } from './validators/color';
import __creditCardValidator, { definition as __creditCardValidatorDefinition, } from './validators/creditCard';
import __emailValidator, { definition as __emailValidatorDefinition, } from './validators/email';
import __hexValidator, { definition as __hexValidatorDefinition, } from './validators/hex';
import __integerValidator, { definition as __integerValidatorDefinition, } from './validators/integer';
import __isoDateValidator, { definition as __isoDateValidatorDefinition, } from './validators/isoDate';
import __isoDateTimeValidator, { definition as __isoDateTimeValidatorDefinition, } from './validators/isoDateTime';
import __isoTimeValidator, { definition as __isoTimeValidatorDefinition, } from './validators/isoTime';
import __maxValidator, { definition as __maxValidatorDefinition, } from './validators/max';
import __minValidator, { definition as __minValidatorDefinition, } from './validators/min';
import __negativeValidator, { definition as __negativeValidatorDefinition, } from './validators/negative';
import __numberValidator, { definition as __numberValidatorDefinition, } from './validators/number';
import __passwordValidator, { definition as __passwordValidatorDefinition, } from './validators/password';
import __patternValidator, { definition as __patternValidatorDefinition, } from './validators/pattern';
import __positiveValidator, { definition as __positiveValidatorDefinition, } from './validators/positive';
import __requiredValidator, { definition as __requiredValidatorDefinition, } from './validators/required';
export default class SValidator extends __SClass {
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
            i18n: __en,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
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
    validate(value, rulesOrPreset, settings) {
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
        for (let [validator, valueOrObj] of Object.entries(rules)) {
            let validatorSettings = (_a = valueOrObj.settings) !== null && _a !== void 0 ? _a : {}, validatorValue = (_b = valueOrObj.value) !== null && _b !== void 0 ? _b : valueOrObj, res;
            // get the corresponding validator in the registered ones
            const validatorObj = SValidator._validators[validator];
            if (!validatorObj) {
                throw new Error(`Sorry but the validator "${validator}" is not registered`);
            }
            const finalValidatorSettings = Object.assign(Object.assign({}, validatorSettings), { i18n: (_c = this.settings.i18n[validator]) !== null && _c !== void 0 ? _c : {} });
            // validate using the validator
            if (typeof rulesOrPreset === 'boolean') {
                res = validatorObj.validator(value, finalValidatorSettings);
            }
            else {
                res = validatorObj.validator(value, validatorValue, finalValidatorSettings);
            }
            if (!res.valid) {
                // replace tokens in message
                res.message = res.message
                    .replace('%value', value)
                    .replace('%validator', validator);
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
SValidator.registerValidator('password', __passwordValidator, {
    definition: __passwordValidatorDefinition,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxXQUFXLENBQUM7QUFFN0IsT0FBTyxtQkFBbUIsRUFBRSxFQUN4QixVQUFVLElBQUksNkJBQTZCLEdBQzlDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxnQkFBZ0IsRUFBRSxFQUNyQixVQUFVLElBQUksMEJBQTBCLEdBQzNDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxxQkFBcUIsRUFBRSxFQUMxQixVQUFVLElBQUksK0JBQStCLEdBQ2hELE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxnQkFBZ0IsRUFBRSxFQUNyQixVQUFVLElBQUksMEJBQTBCLEdBQzNDLE1BQU0sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxjQUFjLEVBQUUsRUFDbkIsVUFBVSxJQUFJLHdCQUF3QixHQUN6QyxNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sa0JBQWtCLEVBQUUsRUFDdkIsVUFBVSxJQUFJLDRCQUE0QixHQUM3QyxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sa0JBQWtCLEVBQUUsRUFDdkIsVUFBVSxJQUFJLDRCQUE0QixHQUM3QyxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sc0JBQXNCLEVBQUUsRUFDM0IsVUFBVSxJQUFJLGdDQUFnQyxHQUNqRCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sa0JBQWtCLEVBQUUsRUFDdkIsVUFBVSxJQUFJLDRCQUE0QixHQUM3QyxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sY0FBYyxFQUFFLEVBQ25CLFVBQVUsSUFBSSx3QkFBd0IsR0FDekMsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLGNB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