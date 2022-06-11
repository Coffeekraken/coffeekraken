// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from './i18n/en';

import __minValidator from './validators/min';

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
    messages: ISValidatorValidateResultMessages;
}

export default class SValidator extends __SClass {
    /**
     * @name                    constructor
     * @type                    Function
     *
     * Constructor
     *
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
        rules: ISValidatorRules,
        settings?: Partial<ISValidatorSettings>,
    ): ISValidatorValidateResult {
        let result: ISValidatorValidateResult = {
            valid: true,
            messages: {},
        };

        for (let [validator, valueOrObj] of Object.entries(rules)) {
            let settings = valueOrObj.settings ?? {},
                value = valueOrObj.value ?? valueOrObj,
                res;

            switch (validator) {
                case 'min':
                    res = __minValidator(value, settings);
                    break;
            }

            if (!res.valid) {
                result.valid = false;
                result.messages[validator] = res.message;
            }
        }
    }
}
