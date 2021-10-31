import __SInterface from '@coffeekraken/s-interface';
export default class SCodeExampleInterface extends __SInterface {
}
SCodeExampleInterface.definition = {
    theme: {
        description: 'Specify the theme you want to use for your code example',
        type: 'String',
        default: 'https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css',
    },
    active: {
        type: 'String',
    },
    toolbar: {
        type: 'Array<String>',
        values: ['copy'],
        default: ['copy'],
    },
    toolbarPosition: {
        type: 'String',
        values: ['content', 'nav'],
        default: 'nav',
    },
    languages: {
        type: 'Object',
        default: {},
    },
    lines: {
        type: 'Number',
    },
    moreLabel: {
        type: 'String',
        default: 'Show more',
    },
    lessLabel: {
        type: 'String',
        default: 'Show less',
    },
    moreAction: {
        type: 'String',
        default: 'toggle',
    },
    more: {
        type: 'Boolean',
        default: false,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8scUJBQXNCLFNBQVEsWUFBWTs7QUFDcEQsZ0NBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxXQUFXLEVBQ1AseURBQXlEO1FBQzdELElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUNILDRFQUE0RTtLQUNuRjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUNwQjtJQUNELGVBQWUsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztRQUMxQixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsV0FBVztLQUN2QjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFdBQVc7S0FDdkI7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxRQUFRO0tBQ3BCO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNqQjtDQUNKLENBQUMifQ==