"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const splitLineEvery_1 = __importDefault(require("./__wip__/splitLineEvery"));
const countLine_1 = __importDefault(require("../string/countLine"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name                                          columns
 * @namespace           sugar.node.terminal
 * @type                                          Function
 * @status              beta
 *
 * Display your content using columns. The number of columns is defined by the number of items in the content array
 *
 * @param                 {Array}                       content                     The columns content stored in an Array
 * @param                 {Object}                      [settings={}]               An object of settings descripbed above
 * - width (process.env.STDOUT_COLUMNS || process.stdout.columns) {Number}: The base width on which to calculate the columns
 * - padding (process.env.STDOUT_PADDING || 3) {Number}: The padding to apply on the sides
 * @return                {String}                                                  The string to log in the terminal
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @example               js
 * import columns from '@coffeekraken/sugar/node/terminal/columns';
 * columns([
 *  'Hello world',
 *  'How are you?'
 * ]);
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function columns(content, settings = {}) {
    settings = deepMerge_1.default({
        width: process.env.STDOUT_COLUMNS || process.stdout.columns,
        padding: process.env.STDOUT_PADDING || 3
    }, settings);
    const maxWidth = settings.width - settings.padding * 2;
    const maxColumnWidth = Math.round(maxWidth / content.length);
    const lines = [];
    const splitedContent = {};
    content.forEach((c, i) => {
        const columnsPadding = i === 0
            ? settings.padding
            : i === content.length - 1
                ? settings.padding
                : settings.padding * 2;
        let lines = splitLineEvery_1.default(c, maxColumnWidth - columnsPadding);
        splitedContent['column_' + i] = {
            lines: lines,
            padding: columnsPadding
        };
    });
    let biggestColumnHeight = 0;
    Object.keys(splitedContent).forEach((columnName) => {
        if (splitedContent[columnName].lines.length > biggestColumnHeight) {
            biggestColumnHeight = splitedContent[columnName].lines.length;
        }
    });
    for (let i = 0; i < biggestColumnHeight; i++) {
        let currentLine = '';
        Object.keys(splitedContent).forEach((columnName, j) => {
            const hasColumnLeftAndRightPadding = j === 0 ? false : j === content.length - 1 ? false : true;
            const paddingSide = j === 0 ? 'right' : j === content.length - 1 ? 'left' : null;
            const currentColumn = splitedContent[columnName];
            const columnLinesArray = currentColumn.lines;
            if (i > columnLinesArray.length - 1) {
                currentLine += ' '.repeat(maxColumnWidth);
            }
            else {
                const columnContentString = columnLinesArray[i];
                let restOfLineCount = maxColumnWidth -
                    countLine_1.default(columnContentString || '') -
                    (hasColumnLeftAndRightPadding
                        ? settings.padding * 2
                        : settings.padding);
                if (hasColumnLeftAndRightPadding) {
                    currentLine +=
                        ' '.repeat(settings.padding) +
                            columnContentString +
                            ' '.repeat(restOfLineCount) +
                            ' '.repeat(settings.padding);
                }
                else {
                    if (paddingSide === 'left') {
                        currentLine +=
                            ' '.repeat(settings.padding) +
                                columnContentString +
                                ' '.repeat(restOfLineCount);
                    }
                    else if (paddingSide === 'right') {
                        currentLine +=
                            columnContentString +
                                ' '.repeat(restOfLineCount) +
                                ' '.repeat(settings.padding);
                    }
                }
            }
        });
        lines.push(currentLine);
        currentLine = '';
    }
    return lines.join('\n');
}
module.exports = columns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCw4RUFBd0Q7QUFDeEQsb0VBQThDO0FBQzlDLG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyQyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPO1FBQzNELE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxDQUFDO0tBQ3pDLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRXZELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3RCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBRTFCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsTUFBTSxjQUFjLEdBQ2xCLENBQUMsS0FBSyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQ2xCLENBQUMsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUMxQixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU87Z0JBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUUzQixJQUFJLEtBQUssR0FBRyx3QkFBZ0IsQ0FB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