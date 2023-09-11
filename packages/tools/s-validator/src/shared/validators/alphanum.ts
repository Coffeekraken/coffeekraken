// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type { ISValidatorResult } from '../SValidator.js';

import type {
    ISRulesAlphanumI18nSettings,
    ISRulesAlphanumSettings,
} from '@specim3n/types';

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

export interface IValidatorAlphanumI18nSettings
    extends ISRulesAlphanumI18nSettings {}

export interface IValidatorAlphanumSettings extends ISRulesAlphanumSettings {}

export const definition = {
    description: 'Validate an alphanum string',
    type: 'Boolean',
};

export default function alphanum(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorAlphanumSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorAlphanumSettings = __deepMerge(
        {
            i18n: settings.i18n.alphanum,
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

    valid = value.match(/^[a-z0-9]+$/i);

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
