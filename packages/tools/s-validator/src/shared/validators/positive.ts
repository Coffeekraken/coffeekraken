// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            positive
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate passed value is a correct positive number
 *
 * @param           {any}               value        The date string to validate
 * @param          {IValidatorPositiveSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __positiveValidator from '@coffeekraken/s-validator/validators/positive
 * __positiveValidator(-2017.12);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorPositiveI18nSettings {
    default: string;
}

export interface IValidatorPositiveSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorPositiveI18nSettings;
    trim: boolean;
    cast: boolean;
}

export const definition = {
    description: 'Validate an positive number',
    type: 'Boolean',
};

export default function positive(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorPositiveSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorPositiveSettings = __deepMerge(
        {
            i18n: settings?.i18n?.positive,
            cast: true,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string' && typeof value !== 'number') {
        return {
            valid: false,
            message: finalSettings.i18n.default,
        };
    }

    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }
    if (typeof value === 'string' && finalSettings.cast) {
        value = Number(value);
    }

    if (isNaN(value)) {
        valid = false;
    } else {
        valid = value >= 0;
    }

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
