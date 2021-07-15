import __SInterface from '@coffeekraken/s-interface';
import { SComponentUtilsDefaultInterface } from '@coffeekraken/s-component-utils';
export default class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = Object.assign(Object.assign({}, SComponentUtilsDefaultInterface.definition), { theme: {
        type: 'String',
        default: 'https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css'
    }, active: {
        type: 'String'
    }, toolbar: {
        type: 'Array<String>',
        values: ['copy'],
        default: ['copy']
    }, toolbarPosition: {
        type: 'String',
        values: ['content', 'nav'],
        default: 'content'
    }, defaultStyleClasses: {
        type: 'Object',
        default: {
            main: 's-tabs'
        }
    } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRWxGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTs7QUFDL0QseUNBQVUsbUNBQ1osK0JBQStCLENBQUMsVUFBVSxLQUM3QyxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFDTCw0RUFBNEU7S0FDL0UsRUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmLEVBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUNsQixFQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztRQUMxQixPQUFPLEVBQUUsU0FBUztLQUNuQixFQUNELG1CQUFtQixFQUFFO1FBQ25CLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7U0FDZjtLQUNGLElBQ0QifQ==