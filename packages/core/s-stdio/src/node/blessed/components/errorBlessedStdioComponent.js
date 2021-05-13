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
    id: 'error',
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
                    bg: 'red'
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
                content: __parseHtml(`<red>Error:</red>\n${logStr}`)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JCbGVzc2VkU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvckJsZXNzZWRTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFDdkUsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFDcEUsT0FBTyxtQkFBbUIsTUFBTSxvREFBb0QsQ0FBQztBQUVyRjs7Ozs7Ozs7O0dBU0c7QUFDSCxlQUFlO0lBQ2IsRUFBRSxFQUFFLE9BQU87SUFDWCxNQUFNLENBQUMsTUFBTSxFQUFFLFFBQWE7UUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE1BQU0sS0FBSyxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDcEMsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxDQUFDO2dCQUNOLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLEtBQUs7aUJBQ1Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDcEMsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxDQUFDO2dCQUNOLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxRQUFRO2dCQUNmLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixVQUFVLEVBQUUsS0FBSztnQkFDakIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxzQkFBc0IsTUFBTSxFQUFFLENBQUM7YUFDckQ7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsRUFBRTthQUNWO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=