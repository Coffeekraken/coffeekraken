const __replaceTags = require('../../../dist/js/html/replaceTags');
const __chalk = require('chalk');
__chalk.level = 3;

/**
 * @name                                parseHtml
 * @namespace                           sugar.node.terminal
 * @type                                Function
 *
 * Parse the simple html tags to format the terminal message
 *
 * @param           {String}                  message                 The message to format
 * @return          {String}                                          The formated message
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function parseHtml(message) {

  return __replaceTags(message, {

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

    br: (tag, content) => '\n'

  });
}
