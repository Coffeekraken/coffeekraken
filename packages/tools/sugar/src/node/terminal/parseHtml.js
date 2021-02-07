"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const replaceTags_1 = __importDefault(require("../html/replaceTags"));
const sugar_1 = __importDefault(require("../config/sugar"));
const upperFirst_1 = __importDefault(require("../string/upperFirst"));
const chalk_1 = __importDefault(require("chalk"));
const tagsMap_1 = __importDefault(require("../console/html/tagsMap"));
chalk_1.default.level = 3;
// TODO tests
/**
 * @name                                parseHtml
 * @namespace           sugar.node.terminal
 * @type                                Function
 * @status              wip
 *
 * Parse the simple html tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
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
    const tagsMap = Object.assign({}, tagsMap_1.default);
    const sugarColors = Object.keys(sugar_1.default('colors')).filter((c) => c !== 'terminal');
    const terminalColors = Object.keys(sugar_1.default('terminal.colors'));
    const colorsObj = {};
    sugarColors.forEach((name) => {
        colorsObj[name] = sugar_1.default(`colors.${name}.color`);
    });
    terminalColors.forEach((name) => {
        colorsObj[name] = sugar_1.default(`terminal.colors.${name}.color`);
    });
    message = message.map((m) => {
        Object.keys(colorsObj).forEach((c) => {
            const cValue = colorsObj[c];
            tagsMap[c] = (tag, content) => chalk_1.default.hex(cValue)(content);
            tagsMap[`bg${upperFirst_1.default(c)}`] = (tag, content) => chalk_1.default.bgHex(cValue)(content);
        });
        return replaceTags_1.default(m, tagsMap);
    });
    if (isArray)
        return message;
    return message[0];
}
module.exports = parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsc0VBQWdEO0FBQ2hELDREQUE0QztBQUM1QyxzRUFBZ0Q7QUFDaEQsa0RBQTRCO0FBQzVCLHNFQUFnRDtBQUNoRCxlQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUVsQixhQUFhO0FBRWI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILFNBQVMsU0FBUyxDQUFDLE9BQU87SUFDeEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO0tBQ2hCO1NBQU07UUFDTCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQjtJQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGlCQUFTLENBQUMsQ0FBQztJQUU3QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDN0QsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxVQUFVLENBQ3hCLENBQUM7SUFDRixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDckUsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBYSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNILGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM5QixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBYSxDQUFDLG1CQUFtQixJQUFJLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ25DLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVELE9BQU8sQ0FBQyxLQUFLLG9CQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ2pELGVBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLHFCQUFhLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPO1FBQUUsT0FBTyxPQUFPLENBQUM7SUFDNUIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUNELGlCQUFTLFNBQVMsQ0FBQyJ9