"use strict";

var __countLine = require('./countLine');
/**
 * @name                          splitEvery
 * @namespace           sugar.js.string
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
// TODO: Add support for special characters like terminal colors, html tags, etc...


module.exports = function splitEvery(text, every, splitWords) {
  if (splitWords === void 0) {
    splitWords = false;
  }

  if (splitWords) {
    var reg = new RegExp(".{1,".concat(every, "}"), 'g');
    return [...text.matchAll(reg)].map(o => o[0]);
  } else {
    var _reg = new RegExp("(\\x1B[[0-9;]+m)|(\\x1B[39m])|(<[a-zA-Zs/]+>)", // `(?:(?:\x1B\[[\d;]*m)*[^\x1B]){1,${every}}(?:(?:\x1B\[[\d;]*m)+$)?`,
    'g'); // const reg = new RegExp(`(?:(?:\033\[[0-9;]*m)*.?){1,${every}}`, 'g');


    var chunks = text.split(_reg).filter(m => m != '' && m != null && m != undefined).map(item => {
      return item.split(/(\s{1,99999999})/g);
    });
    var finalChunks = [];
    chunks.forEach(chunk => {
      finalChunks = [...finalChunks, ...chunk];
    });
    var finalLines = [''];
    var lineCount = 0;
    var lastOpenedTag = null;
    finalChunks.forEach(item => {
      if (!item) return; // console.log(item, reg.test(item));

      if (_reg.test(item)) {
        if (item.substr(0, 2) !== '</' || item.substr(0, 4) !== '\x1B') {
          lastOpenedTag = item;

          if (item.substr(0, 1) !== '<') {
            lastOpenedTag = "\x1B".concat(lastOpenedTag);
          }
        }

        finalLines[finalLines.length - 1] += item;
        return;
      }

      if (lineCount + item.length > every) {
        // console.log('CHECK', item);
        var toAdd = item.substr(0, every - lineCount - 1);
        finalLines[finalLines.length - 1] += toAdd;
        var rest = lastOpenedTag + item.replace(toAdd, ''); // if (toAdd.slice(-1) !== ' ' && rest.slice(0, 1) !== ' ')
        //   finalLines[finalLines.length - 1] += '-';

        var restLines = splitEvery(rest, every);
        finalLines = [...finalLines, ...restLines];
        lineCount = __countLine(finalLines[finalLines.length - 1]);
      } else {
        lineCount += item.length;
        finalLines[finalLines.length - 1] += item;
      }
    });
    return finalLines; // const arr = [];
    // [].forEach.call(chunks, function (a) {
    //   if (!/^(?:\033\[[0-9;]*m)*$/.test(a)) {
    //     arr.push(a);
    //   }
    // });
    // console.log(arr);

    var words = text.split(' ');
    var lines = [];
    var currentLine = '';
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
    lines = lines.map(l => l.trim());
    lines = lines.filter(l => l !== '');
    return lines;
  }
};