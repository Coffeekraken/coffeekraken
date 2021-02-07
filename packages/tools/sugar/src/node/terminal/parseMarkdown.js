"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = parseMarkdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VNYXJrZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhcnNlTWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQVMsYUFBYSxDQUFDLE9BQU87SUFDNUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ2hCO1NBQU07UUFDTCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQjtJQUVELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQzVCLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxTQUFTLEVBQUU7WUFDYixDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FDWCxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ1osT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUN0RCxDQUFDO1NBQ0g7UUFDRCxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUM7UUFDN0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLFNBQVMsRUFBRTtZQUNiLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUNYLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFDWixPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQ3ZELENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMxQixDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hCLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDL0M7UUFDRCxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDeEIsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUMvQztRQUNELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMxQixDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDN0M7UUFFRCxPQUFPLG1CQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU87UUFBRSxPQUFPLE9BQU8sQ0FBQztJQUM1QixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0QsaUJBQVMsYUFBYSxDQUFDIn0=