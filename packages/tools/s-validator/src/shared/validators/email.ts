// @ts-nocheck
import { __isEmail } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

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

export interface IValidatorEmailI18nSettings {
    default: string;
}

export interface IValidatorEmailSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorEmailI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate an email string',
    type: 'Boolean',
};

export default function email(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorEmailSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorEmailSettings = __deepMerge(
        {
            i18n: settings?.i18n?.email,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        return {
            valid: false,
            message: finalSettings.i18n.default,
        };
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = __isEmail(value);

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
