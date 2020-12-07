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
 * @beta
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
//# sourceMappingURL=columns.js.map