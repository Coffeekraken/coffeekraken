/**
 * @name                          breakLineDependingOnSidesPadding
 * @namespace                     sugar.node.terminal
 * @type                          Function
 *
 * Will add an "\n" depending on the width of the terminal and the specified sides padding
 *
 * @param             {String}                text              The text to process
 * @param             {Number}                sidesPadding      The amount of sides padding that you want
 * @return            {String}                                  The processed text
 *
 * @example         js
 * const breakLineDependingOnSidesPadding = require('@coffeekraken/sugar/node/terminal/breakLineDependingOnSidesPadding');
 * breakLineDependingOnSidesPadding('My cool test ...', 12);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function breakLineDependingOnSidesPadding(text, sidesPadding) {

  let currentLine = '';

  const p = sidesPadding;
  const pHalf = Math.round(p / 2);
  const startingLine = text.slice(0,2);
  const startingLineMatch = startingLine.match(/([^a-zA-Z0-9])\s/);
  if (startingLineMatch) {
    text = text.replace(startingLineMatch[0], '');
    currentLine += `${' '.repeat(pHalf)}${startingLineMatch[1]}${' '.repeat(pHalf-1)}`;
  } else {
    currentLine += `${' '.repeat(p)}`;
  }
  // if () {
  //   currentLine += `${startingLine}`
  // }

  const columns = process.env.STDOUT_COLUMNS || process.stdout.columns;
  const characters = text.match(/.{1,1}/g);
  let doNothingCount = 0;
  let pos = 0;

  if ( ! characters) {
    return '';
  };

  characters.forEach((c) => {

    currentLine += c;

    if (c.slice(0,2) === '\u001b') {
      doNothingCount = 4;
      return;
    }
    if (doNothingCount > 0) {
      doNothingCount--;
      return;
    }

    pos++;

    if (pos >= columns - (sidesPadding * 2)) {
      currentLine += '\n' + ' '.repeat(sidesPadding);
      pos = 0;
    }

  });

  return currentLine;

}
