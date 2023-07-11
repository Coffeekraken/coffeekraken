// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';
import __en from '../i18n/en.js';

/**
 * @name            hex
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "hex" rule.
 *
 * @param           {any}               value        The value to validate
 * @param          {IValidatorHexSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __hexValidator from '@coffeekraken/s-validator/validators/hex
 * __hexValidator('hello world');
 * __hexValidator('#fff');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorHexI18nSettings {
    string: string;
}

export interface IValidatorHexSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}

export const definition = {
    description: 'Validate a hexadecimal string',
    type: 'String',
};

export default function hex(
    value: any,
    settings?: Partial<IValidatorHexSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorHexSettings = __deepMerge(
        {
            i18n: __en.hex,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "hex" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = value.match(/^#[a-zA-Z0-9]{3,6}$/);

    if (!valid) {
        message = finalSettings.i18n?.string;
    }

    return {
        valid,
        message,
    };
}
