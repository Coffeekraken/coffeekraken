import __SInterface from '@coffeekraken/s-interface';
import { SComponentUtilsDefaultInterface } from '@coffeekraken/s-component-utils';
export default class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = Object.assign(Object.assign({}, SComponentUtilsDefaultInterface.definition), { theme: {
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
        default: 'content',
    }, defaultStyleClasses: {
        type: 'Object',
        default: {
            main: 's-tabs',
        },
    } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTs7QUFDN0QseUNBQVUsbUNBQ1YsK0JBQStCLENBQUMsVUFBVSxLQUM3QyxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSw0RUFBNEU7S0FDeEYsRUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNqQixFQUNELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7S0FDcEIsRUFDRCxlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7UUFDMUIsT0FBTyxFQUFFLFNBQVM7S0FDckIsRUFDRCxtQkFBbUIsRUFBRTtRQUNqQixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRSxRQUFRO1NBQ2pCO0tBQ0osSUFDSCJ9