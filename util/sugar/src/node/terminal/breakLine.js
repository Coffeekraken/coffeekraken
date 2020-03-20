const __deepMerge = require('../object/deepMerge');

/**
 * @name                          breakLine
 * @namespace                     sugar.node.terminal
 * @type                          Function
 *
 * Will add an "\n" depending on the width of the terminal and the specified sides padding
 *
 * @param:settings
 * - width (process.env.STDOUT_COLUMNS || process.stdout.columns) {Number}: The base width on which break the line
 * - padding (padding=process.env.STDOUT_PADDING || 3) {Number}: The amount of sides padding that you want
 * 
 * @param             {String}                text              The text to process
 * @param             {Object}                [settings={}]     An object of settings descriped above
 * @return            {String}                                  The processed text
 *
 * @example         js
 * const breakLine = require('@coffeekraken/sugar/node/terminal/breakLine');
 * breakLine('My cool test ...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function breakLine(text, settings = {}) {

  settings = __deepMerge({
    width: process.env.STDOUT_COLUMNS || process.stdout.columns,
    padding: process.env.STDOUT_PADDING || 3
  }, settings);

  let currentLine = '';

  const p = settings.padding;
  const pHalf = Math.round(p / 2);
  const startingLine = text.slice(0, 2);
  const startingLineMatch = startingLine.match(/([^a-zA-Z0-9])\s/);

  const characters = text.match(/.{1,1}/g);
  let doNothingCount = 0;
  let pos = 0;

  if (!characters) {
    return '';
  };

  characters.forEach((c) => {

    currentLine += c;

    if (c.slice(0, 2) === '\u001b') {
      doNothingCount = 4;
      return;
    }
    if (doNothingCount > 0) {
      doNothingCount--;
      return;
    }

    pos++;

    if (pos >= settings.width - settings.padding * 2) {
      currentLine += '\n' + ' '.repeat(settings.padding);
      pos = 0;
    }

  });

  return currentLine;

}
