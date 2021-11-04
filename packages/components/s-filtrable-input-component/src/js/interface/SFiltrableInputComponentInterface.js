import __SInterface from '@coffeekraken/s-interface';
export default class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
    items: {
        type: 'String|Function',
    },
    value: {
        type: 'String',
        default: 'value',
    },
    label: {
        type: 'String|Function',
        default: 'value',
    },
    emptyText: {
        type: 'String',
        default: 'No item to display',
    },
    loadingText: {
        type: 'String',
        default: 'Loading please wait...',
    },
    filtrable: {
        type: {
            type: 'Array<String>',
            splitChars: [','],
        },
        default: [],
    },
    templates: {
        description: 'Specify either an object with properties like "item", "empty" and "loading", or a function returning the good template depending on tne "type" argument property',
        type: 'Object|Function',
    },
    closeTimeout: {
        type: 'Number',
        default: 100,
    },
    interactive: {
        type: 'Boolean',
        default: false,
    },
    notSelectable: {
        type: 'Boolean',
        default: false,
    },
    maxItems: {
        type: 'Number',
        default: 25,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0ZpbHRyYWJsZUlucHV0Q29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTs7QUFDN0QseUNBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsaUJBQWlCO0tBQzFCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsT0FBTztLQUNuQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxpQkFBaUI7UUFDdkIsT0FBTyxFQUFFLE9BQU87S0FDbkI7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxvQkFBb0I7S0FDaEM7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSx3QkFBd0I7S0FDcEM7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDcEI7UUFDRCxPQUFPLEVBQUUsRUFBRTtLQUNkO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsV0FBVyxFQUNQLGtLQUFrSztRQUN0SyxJQUFJLEVBQUUsaUJBQWlCO0tBQzFCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELGFBQWEsRUFBRTtRQUNYLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ2Q7Q0FDSixDQUFDIn0=