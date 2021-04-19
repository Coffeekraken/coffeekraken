// @ts-nocheck

import __chalk from 'chalk';
__chalk.level = 3;

/**
 * @name        tagsMap
 * @namespace   sugar.js.console.html
 * @type        Object
 *
 * Store the tag->function map used in ```parseHtml``` function for example
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const tagsMap = {
  black: (tag, content) => __chalk.black(content),
  red: (tag, content) => __chalk.red(content),
  green: (tag, content) => __chalk.green(content),
  yellow: (tag, content) => __chalk.yellow(content),
  blue: (tag, content) => __chalk.blue(content),
  magenta: (tag, content) => __chalk.magenta(content),
  cyan: (tag, content) => __chalk.cyan(content),
  white: (tag, content) => __chalk.white(content),
  grey: (tag, content) => __chalk.grey(content),

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

  h1: (tag, content) => {
    return __chalk.underline(__chalk.bold(content)) + '\n\n';
  },

  h2: (tag, content) => {
    return __chalk.bold(content) + '\n';
  },

  // iWarn: (tag, content) => __parseHtml('<yellow>⚠</yellow>'),
  // iCheck: (tag, content) => __parseHtml(`<green>✓</green>`),
  // iSuccess: (tag, content) => __parseHtml(`<green>✓</green>`),
  // iError: (tag, content) => __parseHtml(`<red>✖</red>`),
  // iCross: (tag, content) => __parseHtml(`<red>✖</red>`),
  // iClose: (tag, content) => `✖`,
  // iStart: (tag, content) => __parseHtml(`<green>‣</green>`),

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
  month: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
  months: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
  year: (tag, content) => new Date().getFullYear().toString().padStart('0', 2),
  years: (tag, content) => new Date().getFullYear().toString().padStart('0', 2),
  hour: (tag, content) => new Date().getHours().toString().padStart('0', 2),
  hours: (tag, content) => new Date().getHours().toString().padStart('0', 2),
  minute: (tag, content) => new Date().getMinutes().toString().padStart('0', 2),
  minutes: (tag, content) =>
    new Date().getMinutes().toString().padStart('0', 2),
  second: (tag, content) => new Date().getSeconds().toString().padStart('0', 2),
  seconds: (tag, content) =>
    new Date().getSeconds().toString().padStart('0', 2),

  br: (tag, content) => '\n'
};
export default tagsMap;
