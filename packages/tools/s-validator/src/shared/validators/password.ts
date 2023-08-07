// @ts-nocheck
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            password
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate using the "password" rule.
 *
 * @param           {any}               value        The password to validate
 * @param          {IValidatorMaxSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __passwordValidator from '@coffeekraken/s-validator/validators/password
 * __passwordValidator('wfoj90ji8jfj', 10);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorPasswordI18nSettings {
    weak: string;
    medium: string;
    strong: string;
}

export interface IValidatorPasswordSettings
    extends ISValidatorValidatorSettings {
    i18n: IValidatorPasswordI18nSettings;
    trim: boolean;
    weakReg: RegExp;
    mediumReg: RegExp;
    strongReg: RegExp;
}

export const definition = {
    description: 'Validate a password string',
    type: 'String',
};

export default function password(
    value: any,
    level: 'weak' | 'medium' | 'strong',
    settings?: Partial<IValidatorPasswordSettings>,
): ISValidatorResult {
    let message,
        valid = false;

    const finalSettings: IValidatorPasswordSettings = __deepMerge(
        {
            i18n: settings?.i18n?.password,
            trim: true,
            weakReg: /.*/,
            mediumReg:
                /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
            strongReg:
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
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

    let validLevels: ('weak' | 'medium' | 'strong')[] = [];

    if (finalSettings.weakReg.test(value)) {
        if (value) {
            validLevels.push('weak');
        }
        if (level === 'weak') {
            valid = true;
        }
    }
    if (finalSettings.mediumReg.test(value)) {
        if (value) {
            validLevels.push('medium');
        }
        if (level === 'medium') {
            valid = true;
        }
    }
    if (finalSettings.strongReg.test(value)) {
        if (value) {
            validLevels.push('strong');
        }
        if (level === 'strong') {
            valid = true;
        }
    }

    if (!valid) {
        message = finalSettings.i18n?.[level];
    }

    return {
        valid,
        message,
        metas: {
            levels: ['weak', 'medium', 'strong'],
            validLevels,
        },
    };
}
