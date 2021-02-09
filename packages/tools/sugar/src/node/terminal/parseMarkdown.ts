// @ts-nocheck

import __parseHtml from './parseHtml';

/**
 * @name                                parseMarkdown
 * @namespace           sugar.node.terminal
 * @type                                Function
 * @status              wip
 *
 * Parse the simple markdown tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseMarkdown(message) {
  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  message = message.map((m) => {
    const h1Reg = /#\s(.*\n?)/g;
    const h1Matches = m.match(h1Reg);
    if (h1Matches) {
      m = m.replace(
        h1Matches[0],
        `<h1>${h1Matches[0].replace(/^#\s/, '').trim()}</h1>`
      );
    }
    const h2Reg = /##\s(.*\n?)/g;
    const h2Matches = m.match(h2Reg);
    if (h2Matches) {
      m = m.replace(
        h2Matches[0],
        `<h2>${h2Matches[0].replace(/^##\s/, '').trim()}</h2>`
      );
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
}
export default parseMarkdown;
