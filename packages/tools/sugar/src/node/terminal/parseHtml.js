// @ts-nocheck
import __replaceTags from '../../shared/html/replaceTags';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __upperFirst from '../../shared/string/upperFirst';
import __chalk from 'chalk';
import __tagsMap from '../../shared/console/html/tagsMap';
__chalk.level = 3;
// TODO tests
/**
 * @name                                parseHtml
 * @namespace            node.terminal
 * @type                                Function
 * @status              wip
 *
 * Parse the simple html tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHtml(message) {
    let isArray = false;
    if (Array.isArray(message)) {
        isArray = true;
    }
    else {
        message = [message];
    }
    const tagsMap = Object.assign({}, __tagsMap);
    // const sugarColors = Object.keys(__SugarConfig.get('colors')).filter(
    //   (c) => c !== 'terminal'
    // );
    const terminalColors = Object.keys(__SugarConfig.get('terminal.colors'));
    const colorsObj = {};
    // sugarColors.forEach((name) => {
    //   colorsObj[name] = __SugarConfig.get(`colors.${name}`);
    // });
    terminalColors.forEach((name) => {
        colorsObj[name] = __SugarConfig.get(`terminal.colors.${name}`);
    });
    message = message.map((m) => {
        Object.keys(colorsObj).forEach((c) => {
            const cValue = colorsObj[c];
            tagsMap[c] = (tag, content) => __chalk.hex(cValue)(content);
            tagsMap[`bg${__upperFirst(c)}`] = (tag, content) => __chalk.bgHex(cValue)(content);
        });
        return __replaceTags(m, tagsMap);
    });
    if (isArray)
        return message;
    return message[0];
}
export default parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxTQUFTLE1BQU0sbUNBQW1DLENBQUM7QUFDMUQsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFbEIsYUFBYTtBQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNoQjtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckI7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUU3Qyx1RUFBdUU7SUFDdkUsNEJBQTRCO0lBQzVCLEtBQUs7SUFDTCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQixrQ0FBa0M7SUFDbEMsMkRBQTJEO0lBQzNELE1BQU07SUFDTixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDOUIsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUNqRCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPO1FBQUUsT0FBTyxPQUFPLENBQUM7SUFDNUIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=