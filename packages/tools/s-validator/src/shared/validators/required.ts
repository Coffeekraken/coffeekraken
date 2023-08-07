// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

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
 * @param          {IValidatorRequiredSettings}         [settings={}]          Some settings to configure your validation
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

export interface IValidatorRequiredI18nSettings {
    default: string;
}

export interface IValidatorRequiredSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorRequiredI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Make sure a value has been provided',
    type: 'Boolean',
};

export default function required(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorRequiredSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorRequiredSettings = __deepMerge(
        {
            i18n: settings?.i18n?.required,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value === 'string' && finalSettings.trim) {
        value = value.trim();
    }

    valid = value !== undefined && value !== null && value !== '';

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
