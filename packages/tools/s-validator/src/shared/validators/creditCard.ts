// @ts-nocheck
import { __isCreditCard } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            creditCard
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "creditCard" rule.
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
 * import __creditCardValidator from '@coffeekraken/s-validator/validators/creditCard
 * __creditCardValidator('hello world');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorCreditCardI18nSettings {
    default: string;
}

export interface IValidatorCreditCardSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorCreditCardI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate a credit card string',
    type: 'Boolean',
};

export default function creditCard(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorCreditCardSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorCreditCardSettings = __deepMerge(
        {
            i18n: settings?.i18n?.creditCard,
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

    valid = __isCreditCard(value);

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
