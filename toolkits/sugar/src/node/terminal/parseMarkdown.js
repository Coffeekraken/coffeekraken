const __parseHtml = require('./parseHtml');

// TODO tests

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

  message = message.map((m) => {
    if (m.match(/^#\s/)) {
      m = `<h1>${m.replace(/^#\s/, '')}</h1>`;
    }
    if (m.match(/^##\s/)) {
      m = `<h2>${m.replace(/^##\s/, '')}</h2>`;
    }
    if (m.match(/^###\s/)) {
      m = `<h3>${m.replace(/^###\s/, '')}</h3>`;
    }
    if (m.match(/^####\s/)) {
      m = `<h4>${m.replace(/^####\s/, '')}</h4>`;
    }
    if (m.match(/^#####\s/)) {
      m = `<h5>${m.replace(/^#####\s/, '')}</h5>`;
    }
    if (m.match(/^######\s/)) {
      m = `<h6>${m.replace(/^######\s/, '')}</h6>`;
    }

    if (m.match(/^#success\s/)) {
      m = `<green><iCheck/></green> ${m.replace(/^#success\s/, '')}`;
    }
    if (m.match(/^#error\s/)) {
      m = `<red><iCross/></red> ${m.replace(/^#error\s/, '')}`;
    }
    if (m.match(/^#warning\s/)) {
      m = `<yellow><iWarn/></yellow> ${m.replace(/^#warning\s/, '')}`;
    }
    if (m.match(/^#warn\s/)) {
      m = `<yellow><iWarn/></yellow> ${m.replace(/^#warn\s/, '')}`;
    }

    return __parseHtml(m.trim());
  });

  if (isArray) return message;
  return message[0];
};
