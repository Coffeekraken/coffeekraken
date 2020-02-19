/**
 * @name                                  countLine
 * @namespace                             sugar.node.terminal
 * @type                                  Function
 *
 * Count how many characters their is in the passed line.
 * This function will exclude the characters like \u01bb, and the html tags like <red>, etc...
 *
 * @param           {String}              line              The line to count
 * @return          {Number}                                How many characters their is in the line
 *
 * @example         js
 * const countLine = require('@coffeekraken/sugar/node/terminal/countLine');
 * countLine('Hello <red>World</red>'); // 11
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function countLine(line) {

  // console.log(line.match(/\u001b\[\d{1,3}m/g));
  let newLine = line.replace(/\u001b\[\d{1,3}m/g, '');
  newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
  newLine = newLine.replace('\n', '');

  return newLine.length;

}
