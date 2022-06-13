// @ts-nocheck
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator';
import __en from '../i18n/en';
import __isColor from '@coffeekraken/sugar/shared/is/color';

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
    string: string;
}

export interface IValidatorColorSettings extends ISValidatorValidatorSettings {
    trim: boolean;
}

export const definition = {
    description: 'Validate a color string',
    type: 'String',
};

export default function color(
    value: any,
    settings?: Partial<IValidatorColorSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorColorSettings = __deepMerge(
        {
            i18n: __en.color,
            trim: true,
        },
        settings ?? {},
    );

    if (typeof value !== 'string') {
        throw new Error(
            `Sorry but the "color" validation only works with string`,
        );
    }

    if (finalSettings.trim) {
        value = value.trim();
    }

    valid = __isColor(value);

    if (!valid) {
        message = finalSettings.i18n?.string;
    }

    return {
        valid,
        message,
    };
}
