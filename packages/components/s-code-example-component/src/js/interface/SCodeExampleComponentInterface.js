import __SInterface from '@coffeekraken/s-interface';
import { SComponentUtilsDefaultInterface } from '@coffeekraken/s-component-utils';
export default class SCodeExampleInterface extends __SInterface {
}
SCodeExampleInterface.definition = Object.assign(Object.assign({}, SComponentUtilsDefaultInterface.definition), { theme: {
        type: 'String',
        default: 'https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css',
    }, active: {
        type: 'String',
    }, toolbar: {
        type: 'Array<String>',
        values: ['copy'],
        default: ['copy'],
    }, toolbarPosition: {
        type: 'String',
        values: ['content', 'nav'],
        default: 'nav',
    }, languages: {
        type: 'Object',
        default: {},
    } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxGLE1BQU0sQ0FBQyxPQUFPLE9BQU8scUJBQXNCLFNBQVEsWUFBWTs7QUFDcEQsZ0NBQVUsbUNBQ1YsK0JBQStCLENBQUMsVUFBVSxLQUM3QyxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSw0RUFBNEU7S0FDeEYsRUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNqQixFQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7S0FDcEIsRUFDRCxlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7UUFDMUIsT0FBTyxFQUFFLEtBQUs7S0FDakIsRUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ2QsSUFDSCJ9