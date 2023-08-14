import { __i18n } from '@coffeekraken/s-i18n';

/**
 * @name            i18n
 * @namespace            shared.i18n
 * @type            Object
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Store all the validations messages in a single big object for quick and easy translation
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default {
    min: {
        string: __i18n('Must have at least %n characters', {
            id: 's-validator.min.string',
        }),
        object: __i18n('Must have at least %n properties', {
            id: 's-validator.min.object',
        }),
        number: __i18n('Must be greater than %n', {
            id: 's-validator.min.number',
        }),
        array: __i18n('Must have at least %n items', {
            id: 's-validator.min.array',
        }),
    },
    max: {
        string: __i18n('Must have at max %n characters', {
            id: 's-validator.max.string',
        }),
        object: __i18n('Must have at max %n properties', {
            id: 's-validator.max.object',
        }),
        number: __i18n('Must be lower than %n', {
            id: 's-validator.max.number',
        }),
        array: __i18n('Must have at max %n items', {
            id: 's-validator.max.array',
        }),
    },
    email: {
        default: __i18n('Must be a valid email address', {
            id: 's-validator.email.default',
        }),
    },
    required: {
        default: __i18n('This is required', {
            id: 's-validator.required.default',
        }),
    },
    isoDate: {
        default: __i18n('Must be a valid ISO date', {
            id: 's-validator.isoDate.default',
        }),
    },
    isoTime: {
        default: __i18n('Must be a valid ISO time', {
            id: 's-validator.isoTime.default',
        }),
    },
    isoDateTime: {
        default: __i18n('Must be a valid ISO date time', {
            id: 's-validator.isoDateTime.default',
        }),
    },
    integer: {
        default: __i18n('Must be an integer', {
            id: 's-validator.integer.default',
        }),
    },
    number: {
        default: __i18n('Must be an number', {
            id: 's-validator.number.default',
        }),
    },
    negative: {
        default: __i18n('Must be a negative number', {
            id: 's-validator.negative.default',
        }),
    },
    positive: {
        default: __i18n('Must be a positive number', {
            id: 's-validator.positive.default',
        }),
    },
    pattern: {
        default: __i18n('Must match the pattern %pattern', {
            id: 's-validator.pattern.default',
        }),
    },
    alphanum: {
        default: __i18n('Must contain only alphanumeric characters', {
            id: 's-validator.alphanum.default',
        }),
    },
    creditCard: {
        default: __i18n('Must be a valid credit card number', {
            id: 's-validator.creditCard.default',
        }),
    },
    color: {
        default: __i18n('Must be a valid color (hex, rgb, rgba, hsl, hsla)', {
            id: 's-validator.color.default',
        }),
    },
    hex: {
        default: __i18n('Must be a valid hex color', {
            id: 's-validator.hex.default',
        }),
    },
    type: {
        default: __i18n('Must be of type %type', {
            id: 's-validator.type.default',
        }),
    },
    base64: {
        default: __i18n('Must be a valid base64 string', {
            id: 's-validator.base64.default',
        }),
    },
    url: {
        default: __i18n('Must be a valid url', {
            id: 's-validator.url.default',
        }),
        secure: __i18n('Must be a secure url', {
            id: 's-validator.url.secure',
        }),
    },
    password: {
        default: __i18n('Must be a password string', {
            id: 's-validator.password.default',
        }),
        weak: __i18n('Must be a password elligible string', {
            id: 's-validator.password.weak',
        }),
        medium: __i18n(
            'Must be >=6 characters, at least 1 lowercase/uppercase/special character',
            {
                id: 's-validator.password.medium',
            },
        ),
        strong: __i18n(
            'Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character',
            {
                id: 's-validator.password.strong',
            },
        ),
    },
};
