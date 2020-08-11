"use strict";

var __splitLineEvery = require('./__wip__/splitLineEvery');

var __countLine = require('../string/countLine');

var __deepMerge = require('../object/deepMerge');
/**
 * @name                                          columns
 * @namespace           node.terminal
 * @type                                          Function
 *
 * Display your content using columns. The number of columns is defined by the number of items in the content array
 *
 * @param                 {Array}                       content                     The columns content stored in an Array
 * @param                 {Object}                      [settings={}]               An object of settings descripbed above
 * - width (process.env.STDOUT_COLUMNS || process.stdout.columns) {Number}: The base width on which to calculate the columns
 * - padding (process.env.STDOUT_PADDING || 3) {Number}: The padding to apply on the sides
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


module.exports = function columns(content, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = __deepMerge({
    width: process.env.STDOUT_COLUMNS || process.stdout.columns,
    padding: process.env.STDOUT_PADDING || 3
  }, settings);
  var maxWidth = settings.width - settings.padding * 2;
  var maxColumnWidth = Math.round(maxWidth / content.length);
  var lines = [];
  var splitedContent = {};
  content.forEach((c, i) => {
    var columnsPadding = i === 0 ? settings.padding : i === content.length - 1 ? settings.padding : settings.padding * 2;

    var lines = __splitLineEvery(c, maxColumnWidth - columnsPadding);

    splitedContent['column_' + i] = {
      lines: lines,
      padding: columnsPadding
    };
  });
  var biggestColumnHeight = 0;
  Object.keys(splitedContent).forEach(columnName => {
    if (splitedContent[columnName].lines.length > biggestColumnHeight) {
      biggestColumnHeight = splitedContent[columnName].lines.length;
    }
  });

  var _loop = function _loop(i) {
    var currentLine = '';
    Object.keys(splitedContent).forEach((columnName, j) => {
      var hasColumnLeftAndRightPadding = j === 0 ? false : j === content.length - 1 ? false : true;
      var paddingSide = j === 0 ? 'right' : j === content.length - 1 ? 'left' : null;
      var currentColumn = splitedContent[columnName];
      var columnLinesArray = currentColumn.lines;

      if (i > columnLinesArray.length - 1) {
        currentLine += ' '.repeat(maxColumnWidth);
      } else {
        var columnContentString = columnLinesArray[i];
        var restOfLineCount = maxColumnWidth - __countLine(columnContentString || '') - (hasColumnLeftAndRightPadding ? settings.padding * 2 : settings.padding);

        if (hasColumnLeftAndRightPadding) {
          currentLine += ' '.repeat(settings.padding) + columnContentString + ' '.repeat(restOfLineCount) + ' '.repeat(settings.padding);
        } else {
          if (paddingSide === 'left') {
            currentLine += ' '.repeat(settings.padding) + columnContentString + ' '.repeat(restOfLineCount);
          } else if (paddingSide === 'right') {
            currentLine += columnContentString + ' '.repeat(restOfLineCount) + ' '.repeat(settings.padding);
          }
        }
      }
    });
    lines.push(currentLine);
    currentLine = '';
  };

  for (var i = 0; i < biggestColumnHeight; i++) {
    _loop(i);
  }

  return lines.join('\n');
};