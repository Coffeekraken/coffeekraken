// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';
import __en from '../i18n/en';
import __isIsoDateTime from '@coffeekraken/sugar/shared/is/isoDateTime';

/**
 * @name            isoDateTime
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate string date to match the iso format like "2008-08-30 17:21:59"
 *
 * @param           {any}               value        The date string to validate
 * @param          {IValidatorIsoDateTimeSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __isoDateTimeValidator from '@coffeekraken/s-validator/validators/isoDateTime
 * __isoDateTimeValidator('2008-08-30 17:21:59');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorIsoDateTimeI18nSettings {
    string: string;
}

export interface IValidatorIsoDateTimeSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorIsoDateTimeI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate an iso date string',
    type: 'String',
};

export default function isoDateTime(
    value: any,
    settings?: Partial<IValidatorIsoDateTimeSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorIsoDateTimeSettings = __deepMerge(
        {
            i18n: __en.isoDateTime,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "isoDateTime" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = __isIsoDateTime(value);

    if (!valid) {
        message = finalSettings.i18n?.string?.replace('%dateTime', value);
    }

    return {
        valid,
        message,
    };
}
