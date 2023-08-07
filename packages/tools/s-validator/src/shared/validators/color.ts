// @ts-nocheck
import { __isColor } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            color
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "color" rule.
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
 * import __colorValidator from '@coffeekraken/s-validator/validators/color
 * __colorValidator('hello world');
 * __colorValidator('#fff');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorColorI18nSettings {
    default: string;
}

export interface IValidatorColorSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorColorI18nSettings;
    trim: boolean;
}

export const definition = {
    description: 'Validate a color string',
    type: 'Boolean',
};

export default function color(
    value: any,
    validatorValue: boolean,
    settings?: Partial<IValidatorColorSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorColorSettings = __deepMerge(
        {
            i18n: settings?.i18n?.color,
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

    valid = __isColor(value);

    if (!valid) {
        message = finalSettings.i18n?.default;
    }

    return {
        valid,
        message,
    };
}
