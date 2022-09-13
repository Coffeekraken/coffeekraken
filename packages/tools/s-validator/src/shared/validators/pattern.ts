// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';

/**
 * @name            pattern
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate a value using a regex.
 *
 * @param           {any}               value        The value to validate
 * @param           {String}            pattern      The regex pattern to use
 * @param          {IValidatorPatternSettings}         [settings={}]          Some settings to configure your validation
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

export interface ISValidatorPattern18nSettings {
    string: string;
}

export interface IValidatorPatternSettings
    extends ISValidatorValidatorSettings {
    i18n: ISValidatorPattern18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate a string using a regex pattern',
    type: 'String',
};

export default function pattern(
    value: any,
    pattern: string,
    settings?: Partial<IValidatorPatternSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorPatternSettings = __deepMerge(
        {
            i18n: __en.pattern,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "pattern" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    const reg = new RegExp(pattern);
    valid = reg.test(value);

    if (!valid) {
        message = finalSettings.i18n?.string.replace('%pattern', pattern);
    }

    return {
        valid,
        message,
    };
}
