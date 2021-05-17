import __SInterface from '@coffeekraken/s-interface';
export default class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
    value: {
        type: 'String',
        default: ''
    },
    noItemText: {
        type: 'String',
        default: 'No item to display'
    },
    filtrable: {
        type: {
            type: 'Array<String>',
            commaSplit: true
        },
        default: []
    },
    maxItems: {
        type: 'Number',
        default: 25
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTs7QUFDL0QseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxvQkFBb0I7S0FDOUI7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7Q0FDRixDQUFDIn0=