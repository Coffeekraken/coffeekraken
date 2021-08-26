import __SInterface from '@coffeekraken/s-interface';
export default class SActivateComponentInterface extends __SInterface {
}
SActivateComponentInterface.definition = {
    href: {
        type: 'String',
    },
    group: {
        type: 'String',
    },
    toggle: {
        type: {
            type: 'Boolean',
            nullishAsTrue: true,
        },
        default: false,
    },
    history: {
        type: {
            type: 'Boolean',
            nullishAsTrue: true,
        },
        default: false,
    },
    active: {
        type: {
            type: 'Boolean',
            nullishAsTrue: true,
        },
        default: false,
    },
    activeClass: {
        type: 'String',
        description: 'Specify the class to apply on target(s) when activate',
        default: 'active',
    },
    activeAttribute: {
        type: 'String',
        description: 'Specify the attribute to apply on target(s) when activate',
        default: 'active',
    },
    saveState: {
        type: 'Boolean',
        default: false,
    },
    activateTimeout: {
        type: 'Number',
        default: 0,
    },
    unactivateTimeout: {
        type: 'Number',
        default: 0,
    },
    trigger: {
        type: {
            type: 'Array<String>',
            splitChars: [','],
        },
        default: ['click'],
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0FjdGl2YXRlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTs7QUFDMUQsc0NBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsdURBQXVEO1FBQ3BFLE9BQU8sRUFBRSxRQUFRO0tBQ3BCO0lBQ0QsZUFBZSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsMkRBQTJEO1FBQ3hFLE9BQU8sRUFBRSxRQUFRO0tBQ3BCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELGVBQWUsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELGlCQUFpQixFQUFFO1FBQ2YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQ3JCO0NBQ0osQ0FBQyJ9