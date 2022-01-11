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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                values: ['change', 'submit', 'enter', 'reset'],
                default: ['change', 'submit', 'enter', 'reset'],
            },
            wrap: {
                description: 'Specify if you want to wrap your s-form-validate element when theres an error',
                type: 'Boolean',
                default: true,
            },
            errorClass: {
                description: 'Specify the class to apply when theres an error',
                type: 'String',
                default: 's-form-validate s-form-validate--error s-color--error',
            },
            errorMessageClass: {
                description: 'Specify the class to apply on the injected error message container',
                type: 'String',
                default: 's-form-validate__error-message',
            },
            validClass: {
                description: 'Specify the class to apply on your s-form-validate element when validation is passed successfully',
                type: 'String',
                default: 's-form-validate s-form-validate--valid s-color--success',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zvcm1WYWxpZGF0ZUZlYXR1cmVJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRm9ybVZhbGlkYXRlRmVhdHVyZUludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AseUZBQXlGO2dCQUM3RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTTthQUNsQjtZQUNELEVBQUUsRUFBRTtnQkFDQSxXQUFXLEVBQ1AsdUZBQXVGO2dCQUMzRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUM5QyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDbEQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUNILHVEQUF1RDthQUM5RDtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFDUCxvRUFBb0U7Z0JBQ3hFLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxnQ0FBZ0M7YUFDNUM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLG1HQUFtRztnQkFDdkcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUNILHlEQUF5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