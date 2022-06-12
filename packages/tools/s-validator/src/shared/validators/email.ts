// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';
import __en from '../i18n/en';
import __isEmail from '@coffeekraken/sugar/shared/is/email';

/**
 * @name            email
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "email" rule.
 *
 * @param           {any}               value        The email to validate
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
}

export interface IValidatorEmailSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}

export const definition = {
    description: 'Validate an email string',
    type: 'String',
};

export default function email(
    value: any,
    settings?: Partial<IValidatorEmailSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorEmailSettings = __deepMerge(
        {
            i18n: __en.email,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "email" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = __isEmail(value);

    if (!valid) {
        message = finalSettings.i18n?.string?.replace('%email', value);
    }

    return {
        valid,
        message,
    };
}
