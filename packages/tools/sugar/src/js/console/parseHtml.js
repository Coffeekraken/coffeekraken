// @ts-nocheck
// @shared
import __tagsMap from './html/tagsMap';
import __isTerminal from '../is/terminal';
import __replaceTags from '../html/replaceTags';
/**
 * @name                                parseHtml
 * @namespace          sugar.js.console
 * @type                                Function
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHtml(message) {
    if (__isTerminal()) {
        const fn = require(`${__dirname}/../../node/terminal/parseHtml`).default;
        return fn(message);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxhQUFhLE1BQU0scUJBQXFCLENBQUM7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN4QixJQUFJLFlBQVksRUFBRSxFQUFFO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLFNBQVMsZ0NBQWdDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDekUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEI7SUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUM7S0FDaEI7U0FBTTtRQUNMLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMxQixPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU87UUFBRSxPQUFPLE9BQU8sQ0FBQztJQUM1QixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==