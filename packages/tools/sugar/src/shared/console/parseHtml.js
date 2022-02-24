// @ts-nocheck
import __tagsMap from './html/tagsMap';
import __replaceTags from '../html/replaceTags';
/**
 * @name                                parseHtml
 * @namespace            js.console
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function parseHtml(message) {
    let isArray = false;
    if (Array.isArray(message)) {
        isArray = true;
    }
    else {
        message = [message];
    }
    message = message.map((m) => {
        return __replaceTags(m, __tagsMap);
    });
    if (isArray)
        return message;
    return message[0];
}
export default parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QyxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN0QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUM7S0FDbEI7U0FBTTtRQUNILE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN4QixPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU87UUFBRSxPQUFPLE9BQU8sQ0FBQztJQUM1QixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==