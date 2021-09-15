import __SInterface from '@coffeekraken/s-interface';
export default class SRangeComponentInterface extends __SInterface {
}
SRangeComponentInterface.definition = {
    name: {
        type: 'String',
        description: 'Specify the name to assign to the internal input[type="range"]',
    },
    value: {
        type: 'String',
        description: 'Specify the initial range value',
    },
    min: {
        type: 'Number',
        description: 'Specify the minimal value or the range',
        default: 0,
    },
    max: {
        type: 'Number',
        description: 'Specify the maximal value of the range',
        default: 100,
    },
    step: {
        type: 'Number',
        description: 'Specify the steps between each values',
    },
    target: {
        type: 'String',
        description: 'Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated',
    },
    tooltip: {
        type: 'Boolean',
        description: 'Specify if you want to display the value inside a tooltip on top of the thumb',
        default: false,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JhbmdlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1JhbmdlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTs7QUFDdkQsbUNBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxnRUFBZ0U7S0FDaEY7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxpQ0FBaUM7S0FDakQ7SUFDRCxHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx3Q0FBd0M7UUFDckQsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHdDQUF3QztRQUNyRCxPQUFPLEVBQUUsR0FBRztLQUNmO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdUNBQXVDO0tBQ3ZEO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQ1Asc0hBQXNIO0tBQzdIO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsK0VBQStFO1FBQzVGLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0NBQ0osQ0FBQyJ9