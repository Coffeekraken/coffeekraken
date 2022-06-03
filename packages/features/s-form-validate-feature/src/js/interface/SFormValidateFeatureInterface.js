import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SFormValidateFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SFormValidateFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFormValidateFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            type: {
                description: 'Specify the validation type. Usually automatically detected depending on the field type',
                type: 'String',
                default: 'text',
            },
            on: {
                description: 'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',
                type: 'Array<String>',
                values: ['keyup', 'change', 'submit', 'enter', 'reset'],
                default: ['keyup', 'change', 'submit', 'enter', 'reset'],
            },
            wrap: {
                description: 'Specify if you want to wrap your s-form-validate element when theres an error',
                type: 'Boolean',
                default: false,
            },
            errorClass: {
                description: 'Specify the class to apply when theres an error',
                type: 'String',
                default: 's-form-validate--error s-color--error',
            },
            validClass: {
                description: 'Specify the class to apply on your s-form-validate element when validation is passed successfully',
                type: 'String',
                default: 's-form-validate--valid s-color--success',
            },
            customValidations: {
                description: 'Specify some custom validations [key]: function(value, helpers). For mor info check out the [Joi](https://joi.dev/api/?v=17.4.2#anycustommethod-description) custom validation doc',
                type: 'Object',
                default: {},
            },
            joiOptions: {
                description: 'Specify some [Joi](https://joi.dev/) options to use for your validation',
                type: 'Object',
                default: {},
            },
            messages: {
                description: 'Specify some custom messages for your errors',
                type: 'Object',
                default: {},
            },
            language: {
                description: 'Specify the language you want to use for messages',
                type: 'String',
                default: 'fr',
            },
            displayError: {
                description: 'Specify if you want to display the error messages or not',
                type: 'Boolean',
                default: true,
            },
            alphanum: {
                type: 'Boolean',
                description: 'String: Requires the string value to only contain a-z, A-Z, and 0-9.',
            },
            base64: {
                type: 'Boolean',
                description: 'String: Requires the string value to be a valid base64 string; does not check the decoded value.',
            },
            case: {
                type: 'String',
                values: ['upper', 'lower'],
                description: 'String: Sets the required string case',
            },
            creditCard: {
                type: 'Boolean',
                description: 'String: Requires the number to be a credit card number (Using Luhn Algorithm).',
            },
            dataUri: {
                type: 'Boolean',
                description: 'String: Requires the string value to be a valid data URI string.',
            },
            domain: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be a valid domain name.',
            },
            email: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be a valid email address.',
            },
            guid: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be a valid GUID.',
            },
            hex: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be a valid hexadecimal string.',
            },
            hostname: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be a valid hostname as per RFC1123.',
            },
            insensitive: {
                type: 'Boolean|String',
                description: 'String: Allows the value to match any value in the allowed list or disallowed list in a case insensitive comparison.',
            },
            ip: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be a valid ip address.',
            },
            isoDate: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be in valid ISO 8601 date format.',
            },
            isoDuration: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be in valid ISO 8601 duration format.',
            },
            length: {
                type: 'Number',
                description: 'String: Specifies the exact string length required',
            },
            lowercase: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be all lowercase. If the validation convert option is on (enabled by default), the string will be forced to lowercase.',
            },
            max: {
                type: 'Number',
                description: 'String: String: Specifies the maximum number of string characters\nDate: Specifies the latest date allowed\nNumber: Specifies the minimum value',
            },
            min: {
                type: 'Number',
                description: 'String: String: Specifies the minimum number string characters\nDate: Specifies the oldest date allowed\nNumber: Specifies the minimum value',
            },
            normalize: {
                type: 'String',
                description: 'String: Requires the string value to be in a Unicode normalized form. If the validation convert option is on (enabled by default), the string will be normalized.',
            },
            pattern: {
                type: 'String',
                description: 'String: a regular expression object the string value must match against. Note that if the pattern is a regular expression, for it to match the entire key name, it must begin with ^ and end with $.',
            },
            token: {
                type: 'Boolean',
                description: 'String: Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.',
            },
            trim: {
                type: 'Boolean',
                description: 'String: Requires the string value to contain no whitespace before or after. If the validation convert option is on (enabled by default), the string will be trimmed.',
            },
            truncate: {
                type: 'Boolean',
                description: 'String: Specifies whether the string.max() limit should be used as a truncation.',
            },
            uppercase: {
                type: 'Boolean',
                description: 'String: Requires the string value to be all uppercase. If the validation convert option is on (enabled by default), the string will be forced to uppercase.',
            },
            uri: {
                type: 'Boolean|String',
                description: 'String: Requires the string value to be a valid RFC 3986 URI.',
            },
            greater: {
                type: 'String',
                description: 'String: Date: Specifies that the value must be greater than date (or a reference)\nNumber: Specifies that the value must be greater than limit or a reference.',
            },
            less: {
                type: 'String',
                description: 'String: Date: Specifies that the value must be less than date (or a reference)\nNumber: Specifies that the value must be less than limit or a reference.',
            },
            iso: {
                type: 'Boolean',
                description: 'Date: Requires the string value to be in valid ISO 8601 date format.',
            },
            timestamp: {
                type: 'Boolean|String',
                description: 'Date: Requires the value to be a timestamp interval from Unix Time',
            },
            integer: {
                type: 'Boolean',
                description: 'Number: Requires the number to be an integer (no floating point).',
            },
            multiple: {
                type: 'Number',
                description: 'Number: Specifies that the value must be a multiple of base (or a reference):',
            },
            negative: {
                type: 'Boolean',
                description: 'Number: Requires the number to be negative',
            },
            port: {
                type: 'Boolean',
                description: 'Number: Requires the number to be a TCP port, so between 0 and 65535.',
            },
            positive: {
                type: 'Boolean',
                description: 'Number: Requires the number to be positive',
            },
            precision: {
                type: 'Number',
                description: 'Number: Specifies the maximum number of decimal places',
            },
            unsafe: {
                type: 'Boolean',
                description: "Number: By default, numbers must be within JavaScript's safety range (Number.MIN_SAFE_INTEGER & Number.MAX_SAFE_INTEGER), and when given a string, should be converted without loss of information. You can allow unsafe numbers at your own risks by calling number.unsafe().",
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sNkJBQThCLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx5RkFBeUY7Z0JBQzdGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCwrRUFBK0U7Z0JBQ25GLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx1Q0FBdUM7YUFDbkQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLG1HQUFtRztnQkFDdkcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHlDQUF5QzthQUNyRDtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFDUCxvTEFBb0w7Z0JBQ3hMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxVQUFVLEVBQUU7Z0JBQ1Is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