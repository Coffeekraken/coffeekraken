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
        return (0, replaceTags_1.default)(m, tagsMap_1.default);
    });
    if (isArray)
        return message;
    return message[0];
}
exports.default = parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDZEQUF1QztBQUV2QyxzRUFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQVMsU0FBUyxDQUFDLE9BQU87SUFDdEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ2xCO1NBQU07UUFDSCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN2QjtJQUVELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDeEIsT0FBTyxJQUFBLHFCQUFhLEVBQUMsQ0FBQyxFQUFFLGlCQUFTLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksT0FBTztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBQzVCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==