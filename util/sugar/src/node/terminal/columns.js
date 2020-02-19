const __splitLineEvery = require('./splitLineEvery');
const __countLine = require('./countLine');

/**
 * @name                                          columns
 * @namespace                                     sugar.node.terminal
 * @type                                          Function
 *
 * Display your content using columns. The number of columns is defined by the number of items in the content array
 *
 * @param                 {Array}                       content                     The columns content stored in an Array
 * @param                 {Number}                      [padding=3]                 The padding to apply on the sides
 * @return                {String}                                                  The string to log in the terminal
 *
 * @example               js
 * const columns = require('@coffeekraken/sugar/node/terminal/columns');
 * columns([
 *  'Hello world',
 *  'How are you?'
 * ]);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function columns(content, padding = process.env.STDOUT_PADDING || 3) {

  const columns = process.env.STDOUT_COLUMNS || process.stdout.columns;
  const maxWidth = columns - padding * 2;

  const maxColumnWidth = Math.round(maxWidth / content.length);

  const lines = [];
  const splitedContent = {};

  content.forEach((c, i) => {

    splitedContent['column_' + i] = __splitLineEvery(c, maxColumnWidth - padding);

  });

  let biggestColumnHeight = 0;
  Object.keys(splitedContent).forEach((columnName) => {
    if (splitedContent[columnName].length > biggestColumnHeight) {
      biggestColumnHeight = splitedContent[columnName].length;
    }
  });

  for (let i=0; i<biggestColumnHeight; i++) {

    let currentLine = '';

    Object.keys(splitedContent).forEach((columnName, j) => {

      const columnContentArray = splitedContent[columnName];
      if (i > columnContentArray.length-1) {
        currentLine += ' '.repeat(maxColumnWidth);
      } else {
        const columnContentString = columnContentArray[i];

        const restOfLineCount = maxColumnWidth - __countLine(columnContentString || '');

        if (j > 0) {
          currentLine += ' '.repeat(padding) + columnContentString + ' '.repeat(restOfLineCount);
        } else {
          currentLine += columnContentString + ' '.repeat(restOfLineCount);
        }

      }

    });

    lines.push(' '.repeat(padding) + currentLine);
    currentLine = '';

  }

  return lines.join('\n');

  // console.log(lines);


}
