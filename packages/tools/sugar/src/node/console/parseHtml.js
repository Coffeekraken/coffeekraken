"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tagsMap_1 = __importDefault(require("./html/tagsMap"));
const terminal_1 = __importDefault(require("../is/terminal"));
const replaceTags_1 = __importDefault(require("../html/replaceTags"));
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
    if (terminal_1.default()) {
        const fn = require(`${__dirname}/../terminal/parseHtml`);
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
        return replaceTags_1.default(m, tagsMap_1.default);
    });
    if (isArray)
        return message;
    return message[0];
}
exports.default = parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFViw2REFBdUM7QUFDdkMsOERBQTBDO0FBQzFDLHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLElBQUksa0JBQVksRUFBRSxFQUFFO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLFNBQVMsd0JBQXdCLENBQUMsQ0FBQztRQUN6RCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwQjtJQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNoQjtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckI7SUFFRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFCLE9BQU8scUJBQWEsQ0FBQyxDQUFDLEVBQUUsaUJBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPO1FBQUUsT0FBTyxPQUFPLENBQUM7SUFDNUIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9