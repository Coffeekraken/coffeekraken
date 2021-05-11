"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tagsMap_1 = __importDefault(require("./html/tagsMap"));
const replaceTags_1 = __importDefault(require("../html/replaceTags"));
/**
 * @name                                parseHtml
 * @namespace            js.console
 * @type                                Function
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHtml(message) {
    // if (__isTerminal()) {
    //   const fn = require(`${__dirname}/../../node/terminal/parseHtml`).default;
    //   return fn(message);
    // }
    let isArray = false;
    if (Array.isArray(message)) {
        isArray = true;
    }
    else {
        message = [message];
    }
    message = message.map((m) => {
        return replaceTags_1.default(m, tagsMap_1.default);
    });
    if (isArray)
        return message;
    return message[0];
}
exports.default = parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDZEQUF1QztBQUV2QyxzRUFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBUyxTQUFTLENBQUMsT0FBTztJQUN4Qix3QkFBd0I7SUFDeEIsOEVBQThFO0lBQzlFLHdCQUF3QjtJQUN4QixJQUFJO0lBRUosSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ2hCO1NBQU07UUFDTCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQjtJQUVELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsT0FBTyxxQkFBYSxDQUFDLENBQUMsRUFBRSxpQkFBUyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU87UUFBRSxPQUFPLE9BQU8sQ0FBQztJQUM1QixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=