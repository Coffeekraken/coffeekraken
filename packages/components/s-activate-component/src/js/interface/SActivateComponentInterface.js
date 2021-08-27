import __SInterface from '@coffeekraken/s-interface';
export default class SActivateComponentInterface extends __SInterface {
}
SActivateComponentInterface.definition = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0FjdGl2YXRlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTs7QUFDMUQsc0NBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ2Q7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxTQUFTO1lBQ2YsYUFBYSxFQUFFLElBQUk7U0FDdEI7UUFDRCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxTQUFTO1lBQ2YsYUFBYSxFQUFFLElBQUk7U0FDdEI7UUFDRCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxTQUFTO1lBQ2YsYUFBYSxFQUFFLElBQUk7U0FDdEI7UUFDRCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxPQUFPLEVBQUUsUUFBUTtLQUNwQjtJQUNELGVBQWUsRUFBRTtRQUNiLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLDJEQUEyRDtRQUN4RSxPQUFPLEVBQUUsUUFBUTtLQUNwQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDakI7SUFDRCxlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNwQjtRQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtDQUNKLENBQUMifQ==