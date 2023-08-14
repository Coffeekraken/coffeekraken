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
        medium: __i18n('Must be >=6 characters, at least 1 lowercase/uppercase/special character', {
            id: 's-validator.password.medium',
        }),
        strong: __i18n('Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character', {
            id: 's-validator.password.strong',
        }),
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxlQUFlO0lBQ1gsR0FBRyxFQUFFO1FBQ0QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxrQ0FBa0MsRUFBRTtZQUMvQyxFQUFFLEVBQUUsd0JBQXdCO1NBQy9CLENBQUM7UUFDRixNQUFNLEVBQUUsTUFBTSxDQUFDLGtDQUFrQyxFQUFFO1lBQy9DLEVBQUUsRUFBRSx3QkFBd0I7U0FDL0IsQ0FBQztRQUNGLE1BQU0sRUFBRSxNQUFNLENBQUMseUJBQXlCLEVBQUU7WUFDdEMsRUFBRSxFQUFFLHdCQUF3QjtTQUMvQixDQUFDO1FBQ0YsS0FBSyxFQUFFLE1BQU0sQ0FBQyw2QkFBNkIsRUFBRTtZQUN6QyxFQUFFLEVBQUUsdUJBQXVCO1NBQzlCLENBQUM7S0FDTDtJQUNELEdBQUcsRUFBRTtRQUNELE1BQU0sRUFBRSxNQUFNLENBQUMsZ0NBQWdDLEVBQUU7WUFDN0MsRUFBRSxFQUFFLHdCQUF3QjtTQUMvQixDQUFDO1FBQ0YsTUFBTSxFQUFFLE1BQU0sQ0FBQyxnQ0FBZ0MsRUFBRTtZQUM3QyxFQUFFLEVBQUUsd0JBQXdCO1NBQy9CLENBQUM7UUFDRixNQUFNLEVBQUUsTUFBTSxDQUFDLHVCQUF1QixFQUFFO1lBQ3BDLEVBQUUsRUFBRSx3QkFBd0I7U0FDL0IsQ0FBQztRQUNGLEtBQUssRUFBRSxNQUFNLENBQUMsMkJBQTJCLEVBQUU7WUFDdkMsRUFBRSxFQUFFLHVCQUF1QjtTQUM5QixDQUFDO0tBQ0w7SUFDRCxLQUFLLEVBQUU7UUFDSCxPQUFPLEVBQUUsTUFBTSxDQUFDLCtCQUErQixFQUFFO1lBQzdDLEVBQUUsRUFBRSwyQkFBMkI7U0FDbEMsQ0FBQztLQUNMO0lBQ0QsUUFBUSxFQUFFO1FBQ04sT0FBTyxFQUFFLE1B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