import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
/**
 * @name        timeTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default {
    id: 'time',
    render(logObj, settings = {}) {
        const value = logObj.value || '';
        const color = logObj.color || 'yellow';
        const logStr = __parseHtml(`<bgBlack> <${color}>◷</${color}> </bgBlack><bg${__upperFirst(color)}> <black>${new Date().toLocaleTimeString('en-US')} </black></bg${__upperFirst(color)}> ${value}\n`);
        return logStr;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVRlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lVGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUV4RTs7Ozs7Ozs7O0dBU0c7QUFDSCxlQUFlO0lBQ2IsRUFBRSxFQUFFLE1BQU07SUFDVixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDO1FBRXZDLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FDeEIsY0FBYyxLQUFLLE9BQU8sS0FBSyxrQkFBa0IsWUFBWSxDQUMzRCxLQUFLLENBQ04sWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUN4QyxPQUFPLENBQ1IsZ0JBQWdCLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksQ0FDbkQsQ0FBQztRQUVGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFDIn0=