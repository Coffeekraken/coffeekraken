// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            negative
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate passed value is a correct negative number
 *
 * @param           {any}               value        The date string to validate
 * @param          {IValidatorNegativeSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __negativeValidator from '@coffeekraken/s-validator/validators/negative
 * __negativeValidator(-2017.12);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorNegativeI18nSettings {
    default: string;
}

export interface IValidatorNegativeSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorNegativeI18nSettings;
    trim: boolean;
    cast: boolean;
}

export const definition = {
    description: 'Validate an negative number',
    type: 'Boolean',
};

export default function negative(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorNegativeSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorNegativeSettings = __deepMerge(
        {
            i18n: settings?.i18n?.negative,
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
        valid = value < 0;
    }

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
