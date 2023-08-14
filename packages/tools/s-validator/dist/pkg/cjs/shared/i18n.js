"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_i18n_1 = require("@coffeekraken/s-i18n");
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
exports.default = {
    min: {
        string: (0, s_i18n_1.__i18n)('Must have at least %n characters', {
            id: 's-validator.min.string',
        }),
        object: (0, s_i18n_1.__i18n)('Must have at least %n properties', {
            id: 's-validator.min.object',
        }),
        number: (0, s_i18n_1.__i18n)('Must be greater than %n', {
            id: 's-validator.min.number',
        }),
        array: (0, s_i18n_1.__i18n)('Must have at least %n items', {
            id: 's-validator.min.array',
        }),
    },
    max: {
        string: (0, s_i18n_1.__i18n)('Must have at max %n characters', {
            id: 's-validator.max.string',
        }),
        object: (0, s_i18n_1.__i18n)('Must have at max %n properties', {
            id: 's-validator.max.object',
        }),
        number: (0, s_i18n_1.__i18n)('Must be lower than %n', {
            id: 's-validator.max.number',
        }),
        array: (0, s_i18n_1.__i18n)('Must have at max %n items', {
            id: 's-validator.max.array',
        }),
    },
    email: {
        default: (0, s_i18n_1.__i18n)('Must be a valid email address', {
            id: 's-validator.email.default',
        }),
    },
    required: {
        default: (0, s_i18n_1.__i18n)('This is required', {
            id: 's-validator.required.default',
        }),
    },
    isoDate: {
        default: (0, s_i18n_1.__i18n)('Must be a valid ISO date', {
            id: 's-validator.isoDate.default',
        }),
    },
    isoTime: {
        default: (0, s_i18n_1.__i18n)('Must be a valid ISO time', {
            id: 's-validator.isoTime.default',
        }),
    },
    isoDateTime: {
        default: (0, s_i18n_1.__i18n)('Must be a valid ISO date time', {
            id: 's-validator.isoDateTime.default',
        }),
    },
    integer: {
        default: (0, s_i18n_1.__i18n)('Must be an integer', {
            id: 's-validator.integer.default',
        }),
    },
    number: {
        default: (0, s_i18n_1.__i18n)('Must be an number', {
            id: 's-validator.number.default',
        }),
    },
    negative: {
        default: (0, s_i18n_1.__i18n)('Must be a negative number', {
            id: 's-validator.negative.default',
        }),
    },
    positive: {
        default: (0, s_i18n_1.__i18n)('Must be a positive number', {
            id: 's-validator.positive.default',
        }),
    },
    pattern: {
        default: (0, s_i18n_1.__i18n)('Must match the pattern %pattern', {
            id: 's-validator.pattern.default',
        }),
    },
    alphanum: {
        default: (0, s_i18n_1.__i18n)('Must contain only alphanumeric characters', {
            id: 's-validator.alphanum.default',
        }),
    },
    creditCard: {
        default: (0, s_i18n_1.__i18n)('Must be a valid credit card number', {
            id: 's-validator.creditCard.default',
        }),
    },
    color: {
        default: (0, s_i18n_1.__i18n)('Must be a valid color (hex, rgb, rgba, hsl, hsla)', {
            id: 's-validator.color.default',
        }),
    },
    hex: {
        default: (0, s_i18n_1.__i18n)('Must be a valid hex color', {
            id: 's-validator.hex.default',
        }),
    },
    type: {
        default: (0, s_i18n_1.__i18n)('Must be of type %type', {
            id: 's-validator.type.default',
        }),
    },
    base64: {
        default: (0, s_i18n_1.__i18n)('Must be a valid base64 string', {
            id: 's-validator.base64.default',
        }),
    },
    url: {
        default: (0, s_i18n_1.__i18n)('Must be a valid url', {
            id: 's-validator.url.default',
        }),
        secure: (0, s_i18n_1.__i18n)('Must be a secure url', {
            id: 's-validator.url.secure',
        }),
    },
    password: {
        default: (0, s_i18n_1.__i18n)('Must be a password string', {
            id: 's-validator.password.default',
        }),
        weak: (0, s_i18n_1.__i18n)('Must be a password elligible string', {
            id: 's-validator.password.weak',
        }),
        medium: (0, s_i18n_1.__i18n)('Must be >=6 characters, at least 1 lowercase/uppercase/special character', {
            id: 's-validator.password.medium',
        }),
        strong: (0, s_i18n_1.__i18n)('Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character', {
            id: 's-validator.password.strong',
        }),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGtCQUFlO0lBQ1gsR0FBRyxFQUFFO1FBQ0QsTUFBTSxFQUFFLElBQUEsZUFBTSxFQUFDLGtDQUFrQyxFQUFFO1lBQy9DLEVBQUUsRUFBRSx3QkFBd0I7U0FDL0IsQ0FBQztRQUNGLE1BQU0sRUFBRSxJQUFBLGVBQU0sRUFBQyxrQ0FBa0MsRUFBRTtZQUMvQyxFQUFFLEVBQUUsd0JBQXdCO1NBQy9CLENBQUM7UUFDRixNQUFNLEVBQUUsSUFBQSxlQUFNLEVBQUMseUJBQXlCLEVBQUU7WUFDdEMsRUFBRSxFQUFFLHdCQUF3QjtTQUMvQixDQUFDO1FBQ0YsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLDZCQUE2QixFQUFFO1lBQ3pDLEVBQUUsRUFBRSx1QkFBdUI7U0FDOUIsQ0FBQztLQUNMO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsTUFBTSxFQUFFLElBQUEsZUFBTSxFQUFDLGdDQUFnQyxFQUFFO1lBQzdDLEVBQUUsRUFBRSx3QkFBd0I7U0FDL0IsQ0FBQztRQUNGLE1BQU0sRUFBRSxJQUFBLGVBQU0sRUFBQyxnQ0FBZ0MsRUFBRTtZQUM3QyxFQUFFLEVBQUUsd0JBQXdCO1NBQy9CLENBQUM7UUFDRixNQUFNLEVBQUUsSUFBQSxlQUFNLEVBQUMsdUJBQXVCLEVBQUU7WUFDcEMsRUFBRSxFQUFFLHdCQUF3QjtTQUMvQixDQUFDO1FBQ0YsS0FBSyxFQUFFLElBQUEsZUFBTSxFQUFDLDJCQUEyQixFQUFFO1lBQ3ZDLEVBQUUsRUFBRSx1QkFBdUI7U0FDOUIsQ0FBQztLQUNMO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsT0FBTyxFQUFFLElBQUEsZUFBTSxFQUFDLCtCQUErQixFQUFFO1lBQzdDLEVBQUUsRUFBRSwyQkFBMkI7U0FDbEMsQ0FBQztLQUNMO0lBQ0QsUUFBUSxFQUFF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