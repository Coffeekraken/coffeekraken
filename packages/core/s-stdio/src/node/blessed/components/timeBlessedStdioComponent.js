// @ts-nocheck
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
/**
 * @name        timeBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'time',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const color = logObj.color || 'yellow';
        const logStr = __parseHtml(`<bgBlack> <${color}>◷</${color}> </bgBlack><bg${__upperFirst(color)}> <black>${new Date().toLocaleTimeString('en-US')} </black></bg${__upperFirst(color)}>\n`);
        const $component = new __SBlessedComponent({
            blessed: {
                width: '100%',
                height: 2,
                style: {},
                content: logStr
            }
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFDckYsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFFeEU7Ozs7Ozs7OztHQVNHO0FBQ0gsZUFBZTtJQUNiLEVBQUUsRUFBRSxNQUFNO0lBQ1YsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBRXJDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO1FBRXZDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FDeEIsY0FBYyxLQUFLLE9BQU8sS0FBSyxrQkFBa0IsWUFBWSxDQUMzRCxLQUFLLENBQ04sWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUN4QyxPQUFPLENBQ1IsZ0JBQWdCLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUMxQyxDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLE1BQU07YUFDaEI7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQyJ9