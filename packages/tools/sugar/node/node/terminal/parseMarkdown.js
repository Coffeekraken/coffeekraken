"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("./parseHtml"));
/**
 * @name                                parseMarkdown
 * @namespace           sugar.node.terminal
 * @type                                Function
 * @status              wip
 *
 * Parse the simple markdown tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseMarkdown(message) {
    let isArray = false;
    if (Array.isArray(message)) {
        isArray = true;
    }
    else {
        message = [message];
    }
    message = message.map((m) => {
        const h1Reg = /#\s(.*\n?)/g;
        const h1Matches = m.match(h1Reg);
        if (h1Matches) {
            m = m.replace(h1Matches[0], `<h1>${h1Matches[0].replace(/^#\s/, '').trim()}</h1>`);
        }
        const h2Reg = /##\s(.*\n?)/g;
        const h2Matches = m.match(h2Reg);
        if (h2Matches) {
            m = m.replace(h2Matches[0], `<h2>${h2Matches[0].replace(/^##\s/, '').trim()}</h2>`);
        }
        if (m.match(/^#success\s/)) {
            m = `<iCheck/> ${m.replace(/^#success\s/, '')}`;
        }
        if (m.match(/^#start\s/)) {
            m = `<iStart/> ${m.replace(/^#start\s/, '')}`;
        }
        if (m.match(/^#error\s/)) {
            m = `<iCross/> ${m.replace(/^#error\s/, '')}`;
        }
        if (m.match(/^#warning\s/)) {
            m = `<iWarn/> ${m.replace(/^#warning\s/, '')}`;
        }
        if (m.match(/^#warn\s/)) {
            m = `<iWarn/> ${m.replace(/^#warn\s/, '')}`;
        }
        return parseHtml_1.default(m.trim());
    });
    if (isArray)
        return message;
    return message[0];
}
exports.default = parseMarkdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VNYXJrZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3Rlcm1pbmFsL3BhcnNlTWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNERBQXNDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxPQUFPO0lBQzVCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNoQjtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckI7SUFFRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUM1QixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksU0FBUyxFQUFFO1lBQ2IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQ1gsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUNaLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FDdEQsQ0FBQztTQUNIO1FBQ0QsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQzdCLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxTQUFTLEVBQUU7WUFDYixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FDWCxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ1osT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUN2RCxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDMUIsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4QixDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hCLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDL0M7UUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDMUIsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2QixDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQzdDO1FBRUQsT0FBTyxtQkFBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPO1FBQUUsT0FBTyxPQUFPLENBQUM7SUFDNUIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUNELGtCQUFlLGFBQWEsQ0FBQyJ9