const __replaceTags = require('../html/replaceTags');
const __sugarConfig = require('../config/sugar');
const __upperFirst = require('../string/upperFirst');
const __chalk = require('chalk');
__chalk.level = 3;

// TODO tests

/**
 * @name                                parseHtml
 * @namespace                           sugar.node.terminal
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
  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  const sugarColors = Object.keys(__sugarConfig('colors')).filter(
    (c) => c !== 'terminal'
  );
  const terminalColors = Object.keys(__sugarConfig('terminal.colors'));
  const colorsObj = {};
  sugarColors.forEach((name) => {
    colorsObj[name] = __sugarConfig(`colors.${name}`);
  });
  terminalColors.forEach((name) => {
    colorsObj[name] = __sugarConfig(`terminal.colors.${name}`);
  });

  message = message.map((m) => {
    const tagsMap = {
      black: (tag, content) => __chalk.black(content),
      red: (tag, content) => __chalk.red(content),
      green: (tag, content) => __chalk.green(content),
      yellow: (tag, content) => __chalk.yellow(content),
      blue: (tag, content) => __chalk.blue(content),
      magenta: (tag, content) => __chalk.magenta(content),
      cyan: (tag, content) => __chalk.cyan(content),
      white: (tag, content) => __chalk.white(content),

      bgBlack: (tag, content) => __chalk.bgBlack(content),
      bgRed: (tag, content) => __chalk.bgRed(content),
      bgGreen: (tag, content) => __chalk.bgGreen(content),
      bgYellow: (tag, content) => __chalk.bgYellow(content),
      bgBlue: (tag, content) => __chalk.bgBlue(content),
      bgMagenta: (tag, content) => __chalk.bgMagenta(content),
      bgCyan: (tag, content) => __chalk.bgCyan(content),
      bgWhite: (tag, content) => __chalk.bgWhite(content),

      bold: (tag, content) => __chalk.bold(content),
      dim: (tag, content) => __chalk.dim(content),
      italic: (tag, content) => __chalk.italic(content),
      underline: (tag, content) => __chalk.underline(content),
      strike: (tag, content) => __chalk.strike(content),

      iCheck: (tag, content) => parseHtml(`<green>✓</green>`),
      iClose: (tag, content) => parseHtml(`<red>✓</red>`),
      iStart: (tag, content) => parseHtml(`<green>‣</green>`),

      date: (tag, content) =>
        new Date().getDate().toString().padStart('0', 2) +
        '-' +
        (new Date().getMonth() + 1).toString().padStart('0', 2) +
        '-' +
        new Date().getFullYear().toString().padStart('0', 2),
      time: (tag, content) =>
        new Date().getHours().toString().padStart('0', 2) +
        ':' +
        new Date().getMinutes().toString().padStart('0', 2) +
        ':' +
        new Date().getMinutes().toString().padStart('0', 2),
      day: (tag, content) => new Date().getDate().toString().padStart('0', 2),
      days: (tag, content) => new Date().getDate().toString().padStart('0', 2),
      month: (tag, content) =>
        new Date().getMonth().toString().padStart('0', 2),
      months: (tag, content) =>
        new Date().getMonth().toString().padStart('0', 2),
      year: (tag, content) =>
        new Date().getFullYear().toString().padStart('0', 2),
      years: (tag, content) =>
        new Date().getFullYear().toString().padStart('0', 2),
      hour: (tag, content) => new Date().getHours().toString().padStart('0', 2),
      hours: (tag, content) =>
        new Date().getHours().toString().padStart('0', 2),
      minute: (tag, content) =>
        new Date().getMinutes().toString().padStart('0', 2),
      minutes: (tag, content) =>
        new Date().getMinutes().toString().padStart('0', 2),
      second: (tag, content) =>
        new Date().getSeconds().toString().padStart('0', 2),
      seconds: (tag, content) =>
        new Date().getSeconds().toString().padStart('0', 2),

      br: (tag, content) => '\n'
    };

    Object.keys(colorsObj).forEach((c) => {
      const cValue = colorsObj[c];
      tagsMap[c] = (tag, content) => __chalk.hex(cValue)(content);
      tagsMap[`bg${__upperFirst(c)}`] = (tag, content) =>
        __chalk.bgHex(cValue)(content);
    });

    return __replaceTags(m, tagsMap);
  });

  if (isArray) return message;
  return message[0];
};
