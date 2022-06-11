// @ts-nocheck
import __deepMerge from '../object/deepMerge';

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
 * @return          {ISValidatorMinResult}                       The result object
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

export interface IValidatorMinResult {
    valid: boolean;
    message: string;
}

export interface IValidatorMiMessageSettings {
    string: string;
    object: string;
    number: string;
    array: string;
}

export interface IValidatorMinSettings {
    message: IValidatorMiMessageSettings;
}

export default function min(
    value: any,
    n: number,
    settings?: Partial<IValidatorMinSettings>,
): IValidatorMinResult {
    let message, valid;

    const finalSettings: IValidatorMinSettings = __deepMerge(
        {
            message: {
                string: 'This must have at least %n characters',
                object: 'This must have at least %n properties',
                number: 'This must be greater than %n',
                array: 'This must have at least %n items',
            },
        },
        settings ?? {},
    );

    switch (true) {
        case typeof value === 'string':
            valid = value.length >= n;
            message = finalSettings.message?.string?.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value >= n;
            message = finalSettings.message?.number?.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length >= n;
            message = finalSettings.message?.array?.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length >= n;
            message = finalSettings.message?.object?.replace('%n', n);
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
