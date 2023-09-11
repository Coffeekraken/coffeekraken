// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type { ISValidatorResult } from '../SValidator.js';

import { __isBase64 } from '@coffeekraken/sugar/is';

import type {
    ISRulesBase64I18nSettings,
    ISRulesBase64Settings,
} from '@specim3n/types';

/**
 * @name            base64
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "base64" rule.
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
 * import __base64Validator from '@coffeekraken/s-validator/validators/base64
 * __base64Validator('hello world');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorBase64I18nSettings
    extends ISRulesBase64I18nSettings {}

export interface IValidatorBase64Settings extends ISRulesBase64Settings {}

export const definition = {
    description: 'Validate a base64 string',
    type: 'Boolean',
};

export default function alphanum(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorBase64Settings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorBase64Settings = __deepMerge(
        {
            i18n: settings.i18n.base64,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        return {
            valid: false,
            message: finalSettings.i18n?.default,
        };
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    const isBase64 = __isBase64(value);

    if (!isBase64) {
        message = finalSettings.i18n.default;
    }

    return {
        valid: isBase64,
        message,
    };
}
