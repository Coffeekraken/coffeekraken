// @ts-nocheck
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
/**
 * @name        defaultBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'warning',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const logStr = __toString(value);
        const $line = new __SBlessedComponent({
            blessed: {
                top: 0,
                left: 0,
                width: 1,
                height: 'shrink',
                style: {
                    bg: 'yellow'
                }
            }
        });
        const $text = new __SBlessedComponent({
            blessed: {
                top: 0,
                left: 3,
                width: '100%-3',
                height: 'shrink',
                scrollable: false,
                content: __parseHtml(`<yellow>Warning:</yellow>\n${logStr}`)
            }
        });
        const $component = new __SBlessedComponent({
            blessed: {
                width: '100%',
                height: 0,
                style: {}
            }
        });
        $component.append($line);
        $component.append($text);
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZ0JsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhcm5pbmdCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFFckY7Ozs7Ozs7OztHQVNHO0FBQ0gsZUFBZTtJQUNiLEVBQUUsRUFBRSxTQUFTO0lBQ2IsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3BDLE9BQU8sRUFBRTtnQkFDUCxHQUFHLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxRQUFRO2lCQUNiO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3BDLE9BQU8sRUFBRTtnQkFDUCxHQUFHLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsUUFBUTtnQkFDZixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE9BQU8sRUFBRSxXQUFXLENBQUMsOEJBQThCLE1BQU0sRUFBRSxDQUFDO2FBQzdEO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQyJ9