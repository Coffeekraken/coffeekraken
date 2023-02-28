// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from './i18n/en';
import __alphanumValidator, { definition as __alphanumValidatorDefinition } from './validators/alphanum';
import __colorValidator, { definition as __colorValidatorDefinition } from './validators/color';
import __creditCardValidator, { definition as __creditCardValidatorDefinition } from './validators/creditCard';
import __emailValidator, { definition as __emailValidatorDefinition } from './validators/email';
import __hexValidator, { definition as __hexValidatorDefinition } from './validators/hex';
import __integerValidator, { definition as __integerValidatorDefinition } from './validators/integer';
import __isoDateValidator, { definition as __isoDateValidatorDefinition } from './validators/isoDate';
import __isoDateTimeValidator, { definition as __isoDateTimeValidatorDefinition } from './validators/isoDateTime';
import __isoTimeValidator, { definition as __isoTimeValidatorDefinition } from './validators/isoTime';
import __maxValidator, { definition as __maxValidatorDefinition } from './validators/max';
import __minValidator, { definition as __minValidatorDefinition } from './validators/min';
import __negativeValidator, { definition as __negativeValidatorDefinition } from './validators/negative';
import __numberValidator, { definition as __numberValidatorDefinition } from './validators/number';
import __passwordValidator, { definition as __passwordValidatorDefinition } from './validators/password';
import __patternValidator, { definition as __patternValidatorDefinition } from './validators/pattern';
import __positiveValidator, { definition as __positiveValidatorDefinition } from './validators/positive';
import __requiredValidator, { definition as __requiredValidatorDefinition } from './validators/required';
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
            i18n: __en,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sV0FBVyxDQUFDO0FBRTdCLE9BQU8sbUJBQW1CLEVBQUUsRUFDeEIsVUFBVSxJQUFJLDZCQUE2QixFQUM5QyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sZ0JBQWdCLEVBQUUsRUFDckIsVUFBVSxJQUFJLDBCQUEwQixFQUMzQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8scUJBQXFCLEVBQUUsRUFDMUIsVUFBVSxJQUFJLCtCQUErQixFQUNoRCxNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sZ0JBQWdCLEVBQUUsRUFDckIsVUFBVSxJQUFJLDBCQUEwQixFQUMzQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sY0FBYyxFQUFFLEVBQ25CLFVBQVUsSUFBSSx3QkFBd0IsRUFDekMsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLGtCQUFrQixFQUFFLEVBQ3ZCLFVBQVUsSUFBSSw0QkFBNEIsRUFDN0MsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLGtCQUFrQixFQUFFLEVBQ3ZCLFVBQVUsSUFBSSw0QkFBNEIsRUFDN0MsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHNCQUFzQixFQUFFLEVBQzNCLFVBQVUsSUFBSSxnQ0FBZ0MsRUFDakQsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLGtCQUFrQixFQUFFLEVBQ3ZCLFVBQVUsSUFBSSw0QkFBNEIsRUFDN0MsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLGNBQWMsRUFBRSxFQUNuQixVQUFVLElBQUksd0JBQXdCLEVBQ3pDLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxjQUFjLEVBQUUsRUFDbkIsVUFBVSxJQUFJLHdCQUF3QixFQUN6QyxNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sbUJBQW1CLEVBQUUsRUFDeEIsVUFBVSxJQUFJLDZCQUE2QixFQUM5QyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8saUJBQWlCLEVBQUUsRUFDdEIsVUFBVSxJQUFJLDJCQUEyQixFQUM1QyxNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sbUJBQW1CLEVBQUUsRUFDeEIsVUFBVSxJQUFJLDZCQUE2QixFQUM5QyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sa0JBQWtCLEVBQUUsRUFDdkIsVUFBVSxJQUFJLDRCQUE0QixFQUM3QyxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sbUJBQW1CLEVBQUUsRUFDeEIsVUFBVSxJQUFJLDZCQUE2QixFQUM5QyxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sbUJBQW1CLEVBQUUsRUFDeEIsVUFBVSxJQUFJLDZCQUE2QixFQUM5QyxNQUFNLHVCQUF1QixDQUFDO0FBaUgvQixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBTTVDOzs7Ozs7OztPQVFHO0lBQ0gsTUFBTSxDQUFDLGlCQUFpQixDQUNwQixJQUFZLEVBQ1osU0FBbUIsRUFDbkIsUUFBK0M7UUFFL0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUMzQixTQUFTO1lBQ1QsUUFBUTtTQUNYLENBQUM7SUFDTixDQUFDO0lBT0Q7Ozs7Ozs7O09BUUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFZLEVBQ1osS0FBNkIsRUFDN0IsUUFBK0M7UUFFL0MsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUN4QixLQUFLO1lBQ0wsUUFBUTtTQUNYLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLHVCQUF1QjtRQUMxQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQzNDLFVBQVUsQ0FBQyxXQUFXLENBQ3pCLEVBQUU7WUFDQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVO2dCQUFFLFNBQVM7WUFDaEQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQ0c7SUFDSCxRQUFRLENBQ0osS0FBVSxFQUNWLGFBQXdDLEVBQ3hDLFFBQXVDOztRQUV2QyxJQUFJLE1BQU0sR0FBOEI7WUFDcEMsS0FBSyxFQUFFLElBQUk7WUFDWCxLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUVGLElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUMxQixJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FDWCx5QkFBeUIsYUFBYSxxQkFBcUIsQ0FDOUQsQ0FBQzthQUNMO1lBQ0QsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3BEO1FBRUQsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxpQkFBaUIsR0FBRyxNQUFBLFVBQVUsQ0FBQyxRQUFRLG1DQUFJLEVBQUUsRUFDN0MsY0FBYyxHQUFHLE1BQUEsVUFBVSxDQUFDLEtBQUssbUNBQUksVUFBVSxFQUMvQyxHQUFHLENBQUM7WUFFUix5REFBeUQ7WUFDekQsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsNEJBQTRCLFNBQVMscUJBQXFCLENBQzdELENBQUM7YUFDTDtZQUVELE1BQU0sc0JBQXNCLG1DQUNyQixpQkFBaUIsS0FDcEIsSUFBSSxFQUFFLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1DQUFJLEVBQUUsR0FDNUMsQ0FBQztZQUVGLCtCQUErQjtZQUMvQixJQUFJLE9BQU8sYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDcEMsR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7YUFDL0Q7aUJBQU07Z0JBQ0gsR0FBRyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQ3hCLEtBQUssRUFDTCxjQUFjLEVBQ2Qsc0JBQXNCLENBQ3pCLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNaLDRCQUE0QjtnQkFDNUIsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTztxQkFDcEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7cUJBQ3hCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBRXRDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ2pDO1NBQ0o7UUFFRCxvQkFBb0I7UUFDcEIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7QUEvTUQ7O0dBRUc7QUFDSSxzQkFBVyxHQUFvQyxFQUFFLENBQUM7QUFzQnpEOztHQUVHO0FBQ0ksbUJBQVEsR0FBb0MsRUFBRSxDQUFDO0FBc0wxRCw4QkFBOEI7QUFDOUIsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUU7SUFDaEQsVUFBVSxFQUFFLHdCQUF3QjtDQUN2QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtJQUNoRCxVQUFVLEVBQUUsd0JBQXdCO0NBQ3ZDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUU7SUFDcEQsVUFBVSxFQUFFLDBCQUEwQjtDQUN6QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFO0lBQzFELFVBQVUsRUFBRSw2QkFBNkI7Q0FDNUMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRTtJQUN4RCxVQUFVLEVBQUUsNEJBQTRCO0NBQzNDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUU7SUFDeEQsVUFBVSxFQUFFLDRCQUE0QjtDQUMzQyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLHNCQUFzQixFQUFFO0lBQ2hFLFVBQVUsRUFBRSxnQ0FBZ0M7Q0FDL0MsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRTtJQUN4RCxVQUFVLEVBQUUsNEJBQTRCO0NBQzNDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7SUFDdEQsVUFBVSxFQUFFLDJCQUEyQjtDQUMxQyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFO0lBQzFELFVBQVUsRUFBRSw2QkFBNkI7Q0FDNUMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBRTtJQUMxRCxVQUFVLEVBQUUsNkJBQTZCO0NBQzVDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUU7SUFDeEQsVUFBVSxFQUFFLDRCQUE0QjtDQUMzQyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFO0lBQzFELFVBQVUsRUFBRSw2QkFBNkI7Q0FDNUMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxxQkFBcUIsRUFBRTtJQUM5RCxVQUFVLEVBQUUsK0JBQStCO0NBQzlDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUU7SUFDcEQsVUFBVSxFQUFFLDBCQUEwQjtDQUN6QyxDQUFDLENBQUM7QUFDSCxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRTtJQUNoRCxVQUFVLEVBQUUsd0JBQXdCO0NBQ3ZDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUU7SUFDMUQsVUFBVSxFQUFFLDZCQUE2QjtDQUM1QyxDQUFDLENBQUMifQ==