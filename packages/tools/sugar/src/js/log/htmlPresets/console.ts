import __replaceTags from '../../html/replaceTags';
import __chalk from 'chalk';
__chalk.level = 3;

/**
 * @name                              console
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the terminal
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function console(text) {
  return __replaceTags(text, {
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
