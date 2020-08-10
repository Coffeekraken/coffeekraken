"use strict";

const __parseHtml = require('./parseHtml'); // TODO tests

/**
 * @name                                parseMarkdown
 * @namespace           node.terminal
 * @type                                Function
 *
 * Parse the simple markdown tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function parseMarkdown(message) {
  let isArray = false;

  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  message = message.map(m => {
    const h1Reg = /#\s(.*\n?)/g;
    const h1Matches = m.match(h1Reg);

    if (h1Matches) {
      m = m.replace(h1Matches[0], `<h1>${h1Matches[0].replace(/^#\s/, '').trim()}</h1>`);
    }

    const h2Reg = /##\s(.*\n?)/g;
    const h2Matches = m.match(h2Reg);

    if (h2Matches) {
      m = m.replace(h2Matches[0], `<h2>${h2Matches[0].replace(/^##\s/, '').trim()}</h2>`);
    }

    if (m.match(/^#success\s/)) {
      m = `<iCheck/> ${m.replace(/^#success\s/, '')}`;
    }

    if (m.match(/^#start\s/)) {
      m = `<iStart/> ${m.replace(/^#start\s/, '')}`;
    }

    if (m.match(/^#error\s/)) {
      m = `<iCross/> ${m.replace(/^#error\s/, '')}`;
    }

    if (m.match(/^#warning\s/)) {
      m = `<iWarn/> ${m.replace(/^#warning\s/, '')}`;
    }

    if (m.match(/^#warn\s/)) {
      m = `<iWarn/> ${m.replace(/^#warn\s/, '')}`;
    }

    return __parseHtml(m.trim());
  });
  if (isArray) return message;
  return message[0];
};