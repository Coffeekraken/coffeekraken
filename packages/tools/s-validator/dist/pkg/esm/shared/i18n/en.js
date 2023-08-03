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
    type: {
        string: 'Must be of type %type',
    },
    password: {
        weak: '',
        medium: 'Must be >=6 characters, at least 1 lowercase/uppercase/special character',
        strong: 'Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILGVBQWU7SUFDWCxHQUFHLEVBQUU7UUFDRCxNQUFNLEVBQUUsa0NBQWtDO1FBQzFDLE1BQU0sRUFBRSxrQ0FBa0M7UUFDMUMsTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxLQUFLLEVBQUUsNkJBQTZCO0tBQ3ZDO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsTUFBTSxFQUFFLGdDQUFnQztRQUN4QyxNQUFNLEVBQUUsZ0NBQWdDO1FBQ3hDLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsS0FBSyxFQUFFLDJCQUEyQjtLQUNyQztJQUNELEtBQUssRUFBRTtRQUNILE1BQU0sRUFBRSwrQkFBK0I7S0FDMUM7SUFDRCxRQUFRLEVBQUU7UUFDTixPQUFPLEVBQUUsa0JBQWtCO0tBQzlCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsTUFBTSxFQUFFLDBCQUEwQjtLQUNyQztJQUNELE9BQU8sRUFBRTtRQUNMLE1BQU0sRUFBRSwwQkFBMEI7S0FDckM7SUFDRCxXQUFXLEVBQUU7UUFDVCxNQUFNLEVBQUUsK0JBQStCO0tBQzFDO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsTUFBTSxFQUFFLG9CQUFvQjtLQUMvQjtJQUNELE1BQU0sRUFBRTtRQUNKLE1BQU0sRUFBRSxtQkFBbUI7S0FDOUI7SUFDRCxRQUFRLEVBQUU7UUFDTixNQUFNLEVBQUUsMkJBQTJCO0tBQ3RDO0lBQ0QsUUFBUSxFQUFFO1FBQ04sTUFBTSxFQUFFLDJCQUEyQjtLQUN0QztJQUNELE9BQU8sRUFBRTtRQUNMLE1BQU0sRUFBRSxpQ0FBaUM7S0FDNUM7SUFDRCxRQUFRLEVBQUU7UUFDTixNQUFNLEVBQUUsMkNBQTJDO0tBQ3REO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsTUFBTSxFQUFFLG9DQUFvQztLQUMvQztJQUNELEtBQUssRUFBRTtRQUNILE1BQU0sRUFBRSxtREFBbUQ7S0FDOUQ7SUFDRCxHQUFHLEVBQUU7UUFDRCxNQUFNLEVBQUUsMkJBQTJCO0tBQ3RDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLHVCQUF1QjtLQUNsQztJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxFQUFFO1FBQ1IsTUFBTSxFQUFFLDBFQUEwRTtRQUNsRixNQUFNLEVBQUUsZ0ZBQWdGO0tBQzNGO0NBQ0osQ0FBQyJ9