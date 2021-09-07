import __SInterface from '@coffeekraken/s-interface';
export default class SCodeExampleInterface extends __SInterface {
}
SCodeExampleInterface.definition = {
    theme: {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8scUJBQXNCLFNBQVEsWUFBWTs7QUFDcEQsZ0NBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSw0RUFBNEU7S0FDeEY7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7S0FDcEI7SUFDRCxlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7UUFDMUIsT0FBTyxFQUFFLEtBQUs7S0FDakI7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ2Q7Q0FDSixDQUFDIn0=