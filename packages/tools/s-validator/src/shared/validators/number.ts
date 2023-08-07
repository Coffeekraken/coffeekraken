// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            number
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate passed value is a correct number
 *
 * @param           {any}               value        The date string to validate
 * @param          {IValidatorNumberSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __numberValidator from '@coffeekraken/s-validator/validators/number
 * __numberValidator('2017.12');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorNumberI18nSettings {
    default: string;
}

export interface IValidatorNumberSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorNumberI18nSettings;
    trim: boolean;
    cast: boolean;
}

export const definition = {
    description: 'Validate an number',
    type: 'Boolean',
};

export default function number(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorNumberSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorNumberSettings = __deepMerge(
        {
            i18n: settings?.i18n?.number,
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
        valid = true;
    }

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
