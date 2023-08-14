// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

import { __isUrl } from '@coffeekraken/sugar/is';

/**
 * @name            required
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Make sure a value has been provided.
 *
 * @param           {any}               value        The value to validate
 * @param          {IValidatorUrlSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __requiredValidator from '@coffeekraken/s-validator/validators/required
 * __requiredValidator('hello');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorUrlI18nSettings {
    secure: string;
    default: string;
}

export interface IValidatorUrlSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorUrlI18nSettings;
    trim: boolean;
    secure: boolean;
}

export const definition = {
    description: 'Make sure the provided value is a valid url',
    type: 'Boolean',
};

export default function url(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorUrlSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorUrlSettings = __deepMerge(
        {
            i18n: settings?.i18n?.url,
            trim: true,
            secure: false,
        },
        settings ?? {},
    );

    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }

    valid = __isUrl(value);

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    if (valid && finalSettings.secure) {
        if (!value.match(/^https:\/\//)) {
            valid = false;
            message = finalSettings.i18n?.secure;
        }
    }

    return {
        valid,
        message,
    };
}
