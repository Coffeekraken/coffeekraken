// @ts-nocheck
import { __isInteger, __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISValidatorResult,
    ISValidatorValidatorSettings,
} from '../SValidator.js';

/**
 * @name            type
 * @namespace            shared.validators
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Validate passed value is of passed type like "string", "number", "boolean", "integer", etc...
 *
 * @param           {any}               value        The date string to validate
 * @param          {IValidatorTypeSettings}         [settings={}]          Some settings to configure your validation
 * @return          {ISValidatorResult}                       The result object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import __typeValidator from '@coffeekraken/s-validator/validators/type
 * __typeValidator('2017.12');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IValidatorTypeI18nSettings {
    default: string;
}

export interface IValidatorTypeSettings extends ISValidatorValidatorSettings {
    i18n: IValidatorTypeI18nSettings;
    type: 'string' | 'number' | 'boolean' | 'integer' | 'array' | 'object';
}

export const definition = {
    description: 'Validate a specific type',
    type: 'String',
    values: ['string', 'number', 'boolean', 'integer', 'array', 'object'],
};

export default function number(
    value: any,
    type: string,
    settings?: Partial<IValidatorTypeSettings>,
): ISValidatorResult {
    let message, valid;

    const finalSettings: IValidatorTypeSettings = __deepMerge(
        {
            i18n: settings?.i18n?.type,
        },
        settings ?? {},
    );

    switch (type.toLowerCase()) {
        case 'array':
            valid = Array.isArray(value);
            break;
        case 'boolean':
            valid = value === true || value === false;
            break;
        case 'integer':
            valid = __isInteger(value);
            break;
        case 'number':
            valid = typeof value === 'number';
            break;
        case 'string':
            valid = typeof value === 'string';
            break;
        case 'object':
            valid = __isPlainObject(value);
            break;
        case 'checkbox':
        case 'select':
            valid = __isPlainObject(value) && value.id;
            break;
        case 'image':
            valid = __isPlainObject(value) && value.url;
            break;
        case 'video':
            valid =
                __isPlainObject(value) &&
                value.sources &&
                (value.sources.webm || value.sources.mp4 || value.sources.ogg);
            break;
        case 'datetime':
            valid =
                __isPlainObject(value) &&
                value.iso &&
                value.value &&
                value.format;
            break;
        case 'link':
            valid = __isPlainObject(value) && value.text && value.url;
            break;
        case 'color':
            valid =
                __isPlainObject(value) &&
                (value.format === 'hex' ||
                    value.format === 'hexa' ||
                    value.format === 'hsl' ||
                    value.format === 'hsla' ||
                    value.format === 'rgb' ||
                    value.format === 'rgba') &&
                value.value;
            break;
    }

    if (!valid) {
        message = finalSettings.i18n?.default.replace(
            '%type',
            finalSettings.type,
        );
    }

    return {
        valid,
        message,
    };
}
