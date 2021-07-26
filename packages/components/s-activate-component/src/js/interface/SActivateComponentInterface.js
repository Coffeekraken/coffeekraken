import __SInterface from '@coffeekraken/s-interface';
export default class SActivateComponentInterface extends __SInterface {
}
SActivateComponentInterface.definition = {
    href: {
        type: 'String'
    },
    group: {
        type: 'String'
    },
    toggle: {
        type: {
            type: 'Boolean',
            nullishAsTrue: true
        },
        default: false
    },
    history: {
        type: {
            type: 'Boolean',
            nullishAsTrue: true
        },
        default: false
    },
    active: {
        type: {
            type: 'Boolean',
            nullishAsTrue: true
        },
        default: false
    },
    saveState: {
        type: 'Boolean',
        default: false
    },
    trigger: {
        type: {
            type: 'Array<String>',
            splitChars: [',']
        },
        default: ['click']
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0FjdGl2YXRlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0FjdGl2YXRlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsWUFBWTs7QUFDNUQsc0NBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxTQUFTO1lBQ2YsYUFBYSxFQUFFLElBQUk7U0FDcEI7UUFDRCxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLFNBQVM7WUFDZixhQUFhLEVBQUUsSUFBSTtTQUNwQjtRQUNELE9BQU8sRUFBRSxLQUFLO0tBQ2Y7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsU0FBUztZQUNmLGFBQWEsRUFBRSxJQUFJO1NBQ3BCO1FBQ0QsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNsQjtRQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNuQjtDQUNGLENBQUMifQ==