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
        values: ['change', 'submit', 'blur', 'enter'],
        default: ['blur', 'submit', 'enter'],
    },
    errorClass: {
        type: 'String',
        default: 's-form-validate s-form-validate--error s-ui--error',
    },
    errorMessageClass: {
        type: 'String',
        default: 's-form-validate__error-message',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zvcm1WYWxpZGF0ZUZlYXR1cmVJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRm9ybVZhbGlkYXRlRmVhdHVyZUludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLFlBQVk7O0FBQzVELHdDQUFVLEdBQUc7SUFDaEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNsQjtJQUNELEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztRQUM3QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztLQUN2QztJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLG9EQUFvRDtLQUNoRTtJQUNELGlCQUFpQixFQUFFO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZ0NBQWdDO0tBQzVDO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNkO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsSUFBSTtLQUNoQjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7S0FDaEI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSxzRUFBc0U7S0FDdEY7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFDUCxrR0FBa0c7S0FDekc7SUFDRCxJQUFJLEVBQUU7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