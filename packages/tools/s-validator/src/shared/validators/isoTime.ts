// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';
import __en from '../i18n/en';
import __isIsoTime from '@coffeekraken/sugar/shared/is/isoTime';

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
    string: string;
}

export interface IValidatorIsoTimeSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorIsoTimeI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate an iso time string',
    type: 'String',
};

export default function isoTime(
    value: any,
    settings?: Partial<IValidatorIsoTimeSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorIsoTimeSettings = __deepMerge(
        {
            i18n: __en.isoTime,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "isoTime" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = __isIsoTime(value);

    if (!valid) {
        message = finalSettings.i18n?.string?.replace('%time', value);
    }

    return {
        valid,
        message,
    };
}
