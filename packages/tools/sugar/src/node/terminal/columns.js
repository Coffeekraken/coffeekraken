"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const splitLineEvery_1 = __importDefault(require("./__wip__/splitLineEvery"));
const countLine_1 = __importDefault(require("../../shared/string/countLine"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
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
 * - width (process.env.STDOUT_COLUMNS || process.stdout.columns) {Number}: The base width on which to calculate the columns
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
exports.default = columns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsOEVBQXdEO0FBQ3hELDhFQUF3RDtBQUN4RCw4RUFBd0Q7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDckMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTztRQUMzRCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksQ0FBQztLQUN6QyxFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUV2RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFN0QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUUxQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sY0FBYyxHQUNsQixDQUFDLEtBQUssQ0FBQztZQUNMLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTztZQUNsQixDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPO2dCQUNsQixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxLQUFLLEdBQUcsd0JBQWdCLENB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