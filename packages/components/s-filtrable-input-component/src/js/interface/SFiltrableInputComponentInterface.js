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
            splitChars: [',']
        },
        default: []
    },
    closeTimeout: {
        type: 'Number',
        default: 200
    },
    interactive: {
        type: 'Boolean',
        default: false
    },
    maxItems: {
        type: 'Number',
        default: 25
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTs7QUFDL0QseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxvQkFBb0I7S0FDOUI7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDbEI7UUFDRCxPQUFPLEVBQUUsRUFBRTtLQUNaO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsR0FBRztLQUNiO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNaO0NBQ0YsQ0FBQyJ9