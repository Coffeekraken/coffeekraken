// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';
import __en from '../i18n/en.js';

/**
 * @name            min
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "min" rule.
 * Here's the rules depending on the passed value type:
 *
 * - String: Has to have at least n characters
 * - Number: Has to be greater than n
 * - Array: Has to have at least n elements
 * - Object: Has to have at least n properties
 *
 * @param           {any}               value        The value to validate
 * @param           {Number}        n            The minimum value
 * @param          {IValidatorMinSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __minValidator from '@coffeekraken/s-validator/validators/min
 * __minValidator('hello world', 2);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorMinI18nSettings {
    string: string;
    object: string;
    number: string;
    array: string;
}

export interface ISValidatorMinSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}

export const definition = {
    description:
        'Validate string, array, object and number using the "min" rule',
    type: 'Number',
};

export default function min(
    value: any,
    n: number,
    settings?: Partial<ISValidatorMinSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: ISValidatorMinSettings = __deepMerge(
        {
            i18n: __en.min,
            trim: true,
        },
        settings ?? {},
    );

    switch (true) {
        case typeof value === 'string':
            if (finalSettings.trim) {
                value = value.trim();
            }
            valid = value.length >= n;
            message = finalSettings.i18n?.string.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value >= n;
            message = finalSettings.i18n?.number.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length >= n;
            message = finalSettings.i18n?.array.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length >= n;
            message = finalSettings.i18n?.object.replace('%n', n);
            break;
        default:
            throw new Error(
                `Sorry but the "min" validation only works with string, number, array or object values.`,
            );
            break;
    }

    return {
        valid,
        message,
    };
}
