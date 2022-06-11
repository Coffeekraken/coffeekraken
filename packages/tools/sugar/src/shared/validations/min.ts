// @ts-nocheck
import __deepMerge from '../object/deepMerge';

/**
 * @name            min
 * @namespace            js.validations
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
 * @param          {IValidationMinSettings}         [settings={}]          Some settings to configure your validation
 * @return          {Boolean}                           True if the value is valid, false otherwise
 * @return          {String}                              The generated gravatar url
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move into "gravatar" folder
 *
 * @example       js
 * import gravatarUrl from '@coffeekraken/sugar/js/util/gravatarUrl';
 * console.log(gravatarUrl('olivier.bossel@gmail.com')); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidationMinResult {
    valid: boolean;
    message: string;
}

export interface IValidationMiMessageSettings {
    string: string;
    object: string;
    number: string;
    array: string;
}

export interface IValidationMinSettings {
    message: IValidationMiMessageSettings;
}

export default function min(
    value: any,
    n: number,
    settings?: Partial<IValidationMinSettings>,
): IValidationMinResult {
    let message, valid;

    const finalSettings: IValidationMinSettings = __deepMerge(
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
