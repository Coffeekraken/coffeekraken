/**
 * @name            en
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
        string: 'Must have at least %n characters',
        object: 'Must have at least %n properties',
        number: 'Must be greater than %n',
        array: 'Must have at least %n items',
    },
    max: {
        string: 'Must have at max %n characters',
        object: 'Must have at max %n properties',
        number: 'Must be lower than %n',
        array: 'Must have at max %n items',
    },
    email: {
        string: 'Must be a valid email address',
    },
    required: {
        default: 'This is required',
    },
    isoDate: {
        string: 'Must be a valid ISO date',
    },
    isoTime: {
        string: 'Must be a valid ISO time',
    },
    isoDateTime: {
        string: 'Must be a valid ISO date time',
    },
    integer: {
        string: 'Must be an integer',
    },
    number: {
        string: 'Must be an number',
    },
    negative: {
        string: 'Must be a negative number',
    },
    positive: {
        string: 'Must be a positive number',
    },
    pattern: {
        string: 'Must match the pattern %pattern',
    },
    alphanum: {
        string: 'Must contain only alphanumeric characters',
    },
    creditCard: {
        string: 'Must be a valid credit card number',
    },
    color: {
        string: 'Must be a valid color (hex, rgb, rgba, hsl, hsla)',
    },
    hex: {
        string: 'Must be a valid hex color',
    },
    password: {
        weak: '',
        medium:
            'Must be >=6 characters, at least 1 lowercase/uppercase/special character',
        strong:
            'Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character',
    },
};
