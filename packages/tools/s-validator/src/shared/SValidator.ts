// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from './i18n/en';

import __alphanumValidator, {
    definition as __alphanumValidatorDefinition,
} from './validators/alphanum';
import __colorValidator, {
    definition as __colorValidatorDefinition,
} from './validators/color';
import __creditCardValidator, {
    definition as __creditCardValidatorDefinition,
} from './validators/creditCard';
import __emailValidator, {
    definition as __emailValidatorDefinition,
} from './validators/email';
import __hexValidator, {
    definition as __hexValidatorDefinition,
} from './validators/hex';
import __integerValidator, {
    definition as __integerValidatorDefinition,
} from './validators/integer';
import __isoDateValidator, {
    definition as __isoDateValidatorDefinition,
} from './validators/isoDate';
import __isoDateTimeValidator, {
    definition as __isoDateTimeValidatorDefinition,
} from './validators/isoDateTime';
import __isoTimeValidator, {
    definition as __isoTimeValidatorDefinition,
} from './validators/isoTime';
import __maxValidator, {
    definition as __maxValidatorDefinition,
} from './validators/max';
import __minValidator, {
    definition as __minValidatorDefinition,
} from './validators/min';
import __negativeValidator, {
    definition as __negativeValidatorDefinition,
} from './validators/negative';
import __numberValidator, {
    definition as __numberValidatorDefinition,
} from './validators/number';
import __patternValidator, {
    definition as __patternValidatorDefinition,
} from './validators/pattern';
import __positiveValidator, {
    definition as __positiveValidatorDefinition,
} from './validators/positive';
import __requiredValidator, {
    definition as __requiredValidatorDefinition,
} from './validators/required';

/**
 * @name            SValidation
 * @namespace           shared
 * @type            Class
 * @extends       SClass
 * @status              beta
 *
 * This class allows you to validate a lot of data with a lot of validators like "email", "url", "min", "max", etc...
 *
 * @param       {ISValidatorSettings}        [settings={}]                      Configure your instance as wanted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import __SValidator from '@coffeekraken/s-validation';
 * const validator = new __SValidator();
 * validator.validate('Hello World Plop', {
 *    min: 2,
 *    max: 10
 * });
 * // {
 * //   valid: false,
 * //   messages: [
 * //       'This must have at max 10 characters'
 * //   ]
 * // }
 *
 * @see        https://www.npmjs.com/package/url-parse
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISValidatorSettings {
    i18n: any;
}

export interface ISValidatorValidatorSettings {
    i18n: any;
    validator?: any;
}

export interface ISValidatorResult {
    valid: boolean;
    message: string;
}

export interface ISValidatorRule {
    value: any;
    settings: any;
}

export type ISValidatorAvailableValidators =
    | 'min'
    | 'max'
    | 'email'
    | 'number'
    | 'integer';

export interface ISValidatorRules {
    [key: ISValidatorAvailableValidators]: any | ISValidatorRuleValue;
}

export interface ISValidatorValidateResultMessages {
    [key: ISValidatorAvailableValidators]: string;
}

export interface ISValidatorValidateResult {
    valid: boolean;
    rules: Record<string, ISValidatorRule>;
    messages: string[];
}

export interface ISValidatorRegisterSettingsDefinition {
    description: string;
    type: string;
}

export interface ISValidatorRegisterSettings {
    definition: ISValidatorRegisterSettingsDefinition;
}

export interface ISValidatorRegisteredValidators {
    [key: string]: ISValidatorRegisteredValidator;
}

export interface ISValidatorRegisteredValidator {
    validator: Function;
    settings: Partial<ISValidatorRegisterSettings>;
}

export interface ISValidatorRegisteredPresets {
    [key: string]: any | ISValidatorRule;
}

export default class SValidator extends __SClass {
    /**
     * Store the registered validators
     */
    static _validators: ISValidatorRegisteredValidators = {};

    /**
     * @name            registerValidator
     * @type            Function
     * @static
     *
     * This static method allows you to register a new validator
     *
     * @param       {}
     */
    static registerValidator(
        name: string,
        validator: Function,
        settings?: Partial<ISValidatorRegisterSettings>,
    ): void {
        SValidator._validators[name] = {
            validator,
            settings,
        };
    }

    /**
     * Store the registered presets
     */
    static _presets: ISValidatorRegisteredValidators = {};

    /**
     * @name            registerPreset
     * @type            Function
     * @static
     *
     * This static method allows you to register a new validator
     *
     * @param       {}
     */
    static registerPreset(
        name: string,
        rules: ISValidatorRules | any,
        settings?: Partial<ISValidatorRegisterSettings>,
    ): void {
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
    static getValidatorsDefinition(): any {
        const definition = {};
        for (let [name, validatorObj] of Object.entries(
            SValidator._validators,
        )) {
            if (!validatorObj.settings.definition) continue;
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
    constructor(settings?: Partial<ISValidatorSettings>) {
        // save the settings
        super(
            __deepMerge(
                {
                    i18n: __en,
                },
                settings ?? {},
            ),
        );
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
    validate(
        value: any,
        rulesOrPreset: ISValidatorRules | string,
        settings?: Partial<ISValidatorSettings>,
    ): ISValidatorValidateResult {
        let result: ISValidatorValidateResult = {
            valid: true,
            rules: {},
            messages: [],
        };

        let rules = rulesOrPreset;
        if (typeof rulesOrPreset === 'string') {
            if (!SValidator._presets[rulesOrPreset]) {
                throw new Error(
                    `Sorry but the preset "${rulesOrPreset}" is not registered`,
                );
            }
            rules = SValidator._presets[rulesOrPreset].rules;
        }

        for (let [validator, valueOrObj] of Object.entries(rules)) {
            let validatorSettings = valueOrObj.settings ?? {},
                validatorValue = valueOrObj.value ?? valueOrObj,
                res;

            // get the corresponding validator in the registered ones
            const validatorObj = SValidator._validators[validator];

            if (!validatorObj) {
                throw new Error(
                    `Sorry but the validator "${validator}" is not registered`,
                );
            }

            const finalValidatorSettings = {
                ...validatorSettings,
                i18n: this.settings.i18n[validator] ?? {},
            };

            // validate using the validator
            if (typeof rulesOrPreset === 'boolean') {
                res = validatorObj.validator(value, finalValidatorSettings);
            } else {
                res = validatorObj.validator(
                    value,
                    validatorValue,
                    finalValidatorSettings,
                );
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
        }

        // return the result
        return result;
    }
}

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
