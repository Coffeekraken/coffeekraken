// @ts-nocheck
import { __isIsoDate } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';
import __en from '../i18n/en.js';

/**
 * @name            isoDate
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate string date to match the iso format like "2017-09-22"
 *
 * @param           {any}               value        The date string to validate
 * @param          {IValidatorIsoDateSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __isoDateValidator from '@coffeekraken/s-validator/validators/isoDate
 * __isoDateValidator('2017-09-22');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorIsoDateI18nSettings {
    string: string;
}

export interface IValidatorIsoDateSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorIsoDateI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate an iso date string',
    type: 'Boolean',
};

export default function isoDate(
    value: any,
    validatorValue: boolean;
    settings?: Partial<IValidatorIsoDateSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorIsoDateSettings = __deepMerge(
        {
            i18n: __en.isoDate,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "isoDate" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = __isIsoDate(value);

    if (!valid) {
        message = finalSettings.i18n?.string;
    }

    return {
        valid,
        message,
    };
}
