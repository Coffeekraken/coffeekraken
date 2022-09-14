// @ts-nocheck
import { __isCreditCard } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __en from '../i18n/en';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';

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

export interface IValidatorMaxI18nSettings {
    string: string;
}

export interface IValidatorEmailSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}

export const definition = {
    description: 'Validate a credit card string',
    type: 'String',
};

export default function creditCard(
    value: any,
    settings?: Partial<IValidatorEmailSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorEmailSettings = __deepMerge(
        {
            i18n: __en.creditCard,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "creditCard" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = __isCreditCard(value);

    if (!valid) {
        message = finalSettings.i18n?.string;
    }

    return {
        valid,
        message,
    };
}
