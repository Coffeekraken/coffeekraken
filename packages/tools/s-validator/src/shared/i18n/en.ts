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
        string: 'This must have at least %n characters',
        object: 'This must have at least %n properties',
        number: 'This must be greater than %n',
        array: 'This must have at least %n items',
    },
    max: {
        string: 'This must have at max %n characters',
        object: 'This must have at max %n properties',
        number: 'This must be lower than %n',
        array: 'This must have at max %n items',
    },
    email: {
        string: 'This must be a valid email',
    },
    required: {
        default: 'This is required',
    },
    isoDate: {
        string: 'This must be a valid ISO date',
    },
    isoTime: {
        string: 'This must be a valid ISO time',
    },
    isoDateTime: {
        string: 'This must be a valid ISO date time',
    },
    integer: {
        string: 'This must be an integer',
    },
    number: {
        string: 'This must be an number',
    },
    negative: {
        string: 'This must be a negative number',
    },
    positive: {
        string: 'This must be a positive number',
    },
    pattern: {
        string: 'This must match the pattern %pattern',
    },
};
