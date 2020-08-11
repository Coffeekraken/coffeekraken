"use strict";

var __replaceTags = require('../html/replaceTags');

var __sugarConfig = require('../config/sugar');

var __upperFirst = require('../string/upperFirst');

var __chalk = require('chalk');

var __tagsMap = require('../../../js/console/parseHtml').tagsMap;

__chalk.level = 3; // TODO tests

/**
 * @name                                parseHtml
 * @namespace           node.terminal
 * @type                                Function
 *
 * Parse the simple html tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

module.exports = function parseHtml(message) {
  var isArray = false;

  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  var tagsMap = Object.assign({}, __tagsMap);
  var sugarColors = Object.keys(__sugarConfig('colors')).filter(c => c !== 'terminal');
  var terminalColors = Object.keys(__sugarConfig('terminal.colors'));
  var colorsObj = {};
  sugarColors.forEach(name => {
    colorsObj[name] = __sugarConfig("colors.".concat(name, ".color"));
  });
  terminalColors.forEach(name => {
    colorsObj[name] = __sugarConfig("terminal.colors.".concat(name, ".color"));
  });
  message = message.map(m => {
    Object.keys(colorsObj).forEach(c => {
      var cValue = colorsObj[c];

      tagsMap[c] = (tag, content) => __chalk.hex(cValue)(content);

      tagsMap["bg".concat(__upperFirst(c))] = (tag, content) => __chalk.bgHex(cValue)(content);
    });
    return __replaceTags(m, tagsMap);
  });
  if (isArray) return message;
  return message[0];
};