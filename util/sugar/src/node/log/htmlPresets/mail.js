const __replaceTags = require('../../../../dist/js/html/replaceTags');
const __term = require( 'terminal-kit' ).terminal;

/**
 * @name                              mail
 * @namespace                         sugar.node.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for mail formating
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function mail(text) {

  return __replaceTags(text, {

    black: (tag, content) => __term.styleReset().str.black(content),
    red: (tag, content) => __term.styleReset().str.red(content),
    green: (tag, content) => __term.styleReset().str.green(content),
    yellow: (tag, content) => __term.styleReset().str.yellow(content),
    blue: (tag, content) => __term.styleReset().str.blue(content),
    magenta: (tag, content) => __term.styleReset().str.magenta(content),
    cyan: (tag, content) => __term.styleReset().str.cyan(content),
    white: (tag, content) => __term.styleReset().str.white(content),

    bgBlack: (tag, content) => __term.styleReset().str.bgBlack(content),
    bgRed: (tag, content) => __term.styleReset().str.bgRed(content),
    bgGreen: (tag, content) => __term.styleReset().str.bgGreen(content),
    bgYellow: (tag, content) => __term.styleReset().str.bgYellow(content),
    bgBlue: (tag, content) => __term.styleReset().str.bgBlue(content),
    bgMagenta: (tag, content) => __term.styleReset().str.bgMagenta(content),
    bgCyan: (tag, content) => __term.styleReset().str.bgCyan(content),
    bgWhite: (tag, content) => __term.styleReset().str.bgWhite(content),

    bold: (tag, content) => __term.styleReset().str.bold(content),
    dim: (tag, content) => __term.styleReset().str.dim(content),
    italic: (tag, content) => __term.styleReset().str.italic(content),
    underline: (tag, content) => __term.styleReset().str.underline(content),
    strike: (tag, content) => __term.styleReset().str.strike(content)

  });

}
