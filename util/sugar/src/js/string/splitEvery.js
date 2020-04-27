/**
 * @name                          splitEvery
 * @namespace                     sugar.js.string
 * @type                          Function
 *
 * Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...
 *
 * @param               {String}                  text                      The text to split
 * @param               {Number}                  every                     How many characters to split the text
 * @param               {Boolean}                 [splitWords=false]        If you want to split the words or not...
 * @return              {Array}                                             An array of the splited text parts
 *
 * @example           js
 * const splitEvery = require('@coffeekraken/node/string/splitEvery');
 * splitEvery('Hello World', 2, true); // => ['He','ll','o ','Wo','rl','d']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function splitEvery(text, every, splitWords = false) {
  if (splitWords) {
    const reg = new RegExp(`.{1,${every}}`, 'g');
    return [...text.matchAll(reg)].map((o) => o[0]);
  } else {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach((word, i) => {
      if (currentLine.length + word.length <= every) {
        currentLine += word + ' ';
        if (i === words.length - 1) {
          lines.push(currentLine);
        }
      } else if (i < words.length - 1) {
        lines.push(currentLine);
        currentLine = word + ' ';
      } else {
        lines.push(currentLine);
        lines.push(word);
      }
    });
    lines = lines.map((l) => l.trim());
    lines = lines.filter((l) => l !== '');
    return lines;
  }
};
