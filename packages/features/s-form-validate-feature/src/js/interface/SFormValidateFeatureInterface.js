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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zvcm1WYWxpZGF0ZUZlYXR1cmVJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRm9ybVZhbGlkYXRlRmVhdHVyZUludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AseUZBQXlGO2dCQUM3RixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTTthQUNsQjtZQUNELEVBQUUsRUFBRTtnQkFDQSxXQUFXLEVBQ1AsdUZBQXVGO2dCQUMzRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDdkQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQzthQUMzRDtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQ0gsdUNBQXVDO2FBQzlDO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxtR0FBbUc7Z0JBQ3ZHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFDSCx5Q0FBeUM7YUFDaEQ7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixXQUFXLEVBQ1Asb0xBQW9MO2dCQUN4TCxJQUFJLEVBQUUsUUFBUTtn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