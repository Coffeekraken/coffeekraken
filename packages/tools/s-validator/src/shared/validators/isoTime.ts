// @ts-nocheck
import { __isIsoTime } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            isoTime
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate string time to match the iso format like "12:18:00"
 *
 * @param           {any}               value        The time string to validate
 * @param          {IValidatorIsoTimeSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __isoTimeValidator from '@coffeekraken/s-validator/validators/isoTime
 * __isoTimeValidator('2017-09-22');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorIsoTimeI18nSettings {
    default: string;
}

export interface IValidatorIsoTimeSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorIsoTimeI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate an iso time string',
    type: 'Boolean',
};

export default function isoTime(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorIsoTimeSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorIsoTimeSettings = __deepMerge(
        {
            i18n: settings?.i18n?.isoTime,
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

    valid = __isIsoTime(value);

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
