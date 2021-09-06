import __SInterface from '@coffeekraken/s-interface';
export default class SActivateFeatureInterface extends __SInterface {
}
SActivateFeatureInterface.definition = {
    href: {
        type: 'String',
        default: '',
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
        physical: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlRmVhdHVyZUludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNBY3RpdmF0ZUZlYXR1cmVJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSxZQUFZOztBQUN4RCxvQ0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUN0QjtRQUNELE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxXQUFXLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSx1REFBdUQ7UUFDcEUsT0FBTyxFQUFFLFFBQVE7S0FDcEI7SUFDRCxlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSwyREFBMkQ7UUFDeEUsT0FBTyxFQUFFLFFBQVE7S0FDcEI7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsZUFBZSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDcEI7UUFDRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDckI7Q0FDSixDQUFDIn0=