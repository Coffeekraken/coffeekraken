"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTags_1 = __importDefault(require("../../shared/html/replaceTags"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const upperFirst_1 = __importDefault(require("../../shared/string/upperFirst"));
const chalk_1 = __importDefault(require("chalk"));
const tagsMap_1 = __importDefault(require("../../shared/console/html/tagsMap"));
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
    const tagsMap = Object.assign({}, tagsMap_1.default);
    const sugarColors = Object.keys(s_sugar_config_1.default('colors')).filter((c) => c !== 'terminal');
    const terminalColors = Object.keys(s_sugar_config_1.default('terminal.colors'));
    const colorsObj = {};
    sugarColors.forEach((name) => {
        colorsObj[name] = s_sugar_config_1.default(`colors.${name}`);
    });
    terminalColors.forEach((name) => {
        colorsObj[name] = s_sugar_config_1.default(`terminal.colors.${name}`);
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
exports.default = parseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdGQUEwRDtBQUMxRCxrRkFBeUQ7QUFDekQsZ0ZBQTBEO0FBQzFELGtEQUE0QjtBQUM1QixnRkFBMEQ7QUFDMUQsZUFBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFbEIsYUFBYTtBQUViOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3hCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNoQjtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckI7SUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBUyxDQUFDLENBQUM7SUFFN0MsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUM3RCxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FDeEIsQ0FBQztJQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDckUsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsd0JBQWEsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDOUIsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLHdCQUFhLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLEtBQUssb0JBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDakQsZUFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8scUJBQWEsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU87UUFBRSxPQUFPLE9BQU8sQ0FBQztJQUM1QixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=