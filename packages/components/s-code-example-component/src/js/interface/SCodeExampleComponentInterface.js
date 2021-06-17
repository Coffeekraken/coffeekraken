import __SInterface from '@coffeekraken/s-interface';
export default class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
    theme: {
        type: 'String',
        default: 'https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css'
    },
    active: {
        type: 'String'
    },
    toolbar: {
        type: 'Array<String>',
        values: ['copy'],
        default: ['copy']
    },
    toolbarPosition: {
        type: 'String',
        values: ['content', 'nav'],
        default: 'content'
    },
    language: {
        type: 'String',
        default: 'javascript'
    },
    defaultStyleClasses: {
        type: 'Object',
        default: {
            main: 's-tabs'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvZGVFeGFtcGxlQ29tcG9uZW50SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxPQUFPLE9BQU8sOEJBQStCLFNBQVEsWUFBWTs7QUFDL0QseUNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFDTCw0RUFBNEU7S0FDL0U7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUNsQjtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztRQUMxQixPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFlBQVk7S0FDdEI7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1NBQ2Y7S0FDRjtDQUNGLENBQUMifQ==