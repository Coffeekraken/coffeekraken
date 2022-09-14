// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from '../i18n/en';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';

/**
 * @name            max
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "max" rule.
 * Here's the rules depending on the passed value type:
 *
 * - String: Has to have at max n characters
 * - Number: Has to be greater than n
 * - Array: Has to have at max n elements
 * - Object: Has to have at max n properties
 *
 * @param           {any}               value        The value to validate
 * @param           {Number}        n            The maximum value
 * @param          {IValidatorMaxSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __maxValidator from '@coffeekraken/s-validator/validators/max
 * __maxValidator('hello world', 10);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorMaxI18nSettings {
    string: string;
    object: string;
    number: string;
    array: string;
}

export interface IValidatorMaxSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}

export const definition = {
    description:
        'Validate string, array, object and number using the "max" rule',
    type: 'String|Array|Object|Number',
};

export default function max(
    value: any,
    n: number,
    settings?: Partial<IValidatorMaxSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorMaxSettings = __deepMerge(
        {
            i18n: __en.max,
            trim: true,
        },
        settings ?? {},
    );

    switch (true) {
        case typeof value === 'string':
            if (finalSettings.trim) {
                value = value.trim();
            }
            valid = value.length <= n;
            message = finalSettings.i18n?.string.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value <= n;
            message = finalSettings.i18n?.number.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length <= n;
            message = finalSettings.i18n?.array.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length <= n;
            message = finalSettings.i18n?.object.replace('%n', n);
            break;
        default:
            throw new Error(
                `Sorry but the "max" validation only works with string, number, array or object values.`,
            );
            break;
    }

    return {
        valid,
        message,
    };
}
