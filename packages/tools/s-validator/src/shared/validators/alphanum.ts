// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __en from '../i18n/en';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';

/**
 * @name            alphanum
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "alphanum" rule.
 *
 * @param           {any}               value        The value to validate
 * @param          {IValidatorMaxSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __alphanumValidator from '@coffeekraken/s-validator/validators/alphanum
 * __alphanumValidator('hello world');
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
    description: 'Validate an alphanum string',
    type: 'String',
};

export default function alphanum(
    value: any,
    settings?: Partial<IValidatorEmailSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorEmailSettings = __deepMerge(
        {
            i18n: __en.alphanum,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "alphanum" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = value.match(/^[a-z0-9]+$/i);

    if (!valid) {
        message = finalSettings.i18n?.string;
    }

    return {
        valid,
        message,
    };
}
