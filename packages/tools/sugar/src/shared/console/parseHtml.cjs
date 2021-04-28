"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tagsMap_1 = __importDefault(require("./html/tagsMap"));
const terminal_1 = __importDefault(require("../is/terminal"));
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
    if (terminal_1.default()) {
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
        return replaceTags_1.default(m, tagsMap_1.default);
    });
    if (isArray)
        return message;
    return message[0];
}
exports.default = parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jb25zb2xlL3BhcnNlSHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw2REFBdUM7QUFDdkMsOERBQTBDO0FBQzFDLHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLElBQUksa0JBQVksRUFBRSxFQUFFO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLFNBQVMsZ0NBQWdDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDekUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDcEI7SUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUM7S0FDaEI7U0FBTTtRQUNMLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMxQixPQUFPLHFCQUFhLENBQUMsQ0FBQyxFQUFFLGlCQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksT0FBTztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBQzVCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==