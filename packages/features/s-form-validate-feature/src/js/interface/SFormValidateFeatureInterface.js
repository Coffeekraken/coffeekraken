import __SInterface from '@coffeekraken/s-interface';
export default class SFormValidateFeatureInterface extends __SInterface {
}
SFormValidateFeatureInterface.definition = {
    type: {
        type: 'String',
        default: 'text',
    },
    on: {
        type: 'Array<String>',
        values: ['change', 'submit', 'enter', 'reset'],
        default: ['change', 'submit', 'enter', 'reset'],
    },
    wrap: {
        type: 'Boolean',
        default: true,
    },
    errorClass: {
        type: 'String',
        default: 's-form-validate s-form-validate--error s-ui--error',
    },
    errorMessageClass: {
        type: 'String',
        default: 's-form-validate__error-message',
    },
    validClass: {
        type: 'String',
        default: 's-form-validate s-form-validate--valid s-ui--success',
    },
    customValidations: {
        type: 'Object',
        default: {},
    },
    joiOptions: {
        type: 'Object',
        default: {},
    },
    language: {
        type: 'String',
        default: 'fr',
    },
    displayError: {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zvcm1WYWxpZGF0ZUZlYXR1cmVJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRm9ybVZhbGlkYXRlRmVhdHVyZUludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLFlBQVk7O0FBQzVELHdDQUFVLEdBQUc7SUFDaEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUM5QyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7S0FDbEQ7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsb0RBQW9EO0tBQ2hFO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxnQ0FBZ0M7S0FDNUM7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxzREFBc0Q7S0FDbEU7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZDtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZDtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFDRCxZ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