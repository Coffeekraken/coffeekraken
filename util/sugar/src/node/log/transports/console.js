const __consoleHtmlPreset = require('../htmlPresets/console');
const __breakLineDependingOnSidesPadding = require('../../terminal/breakLineDependingOnSidesPadding');
const __getDevEnv = require('../../dev/getDevEnv');

/**
 * @name                                    console
 * @namespace                               sugar.node.log.transports
 * @type                                    Function
 *
 * Print out your logs in the console
 *
 * @param                   {String}                  message                     The message to log
 * @param                   {String}                  [type="info"]               The type of log. Can be 'error','warn','info','verbose','debug' or 'silly'
 * @param                   {Object}                  [settings={}]               The transport settings object
 * @return                  {Promise}                                             A promise that will be resolved once the log process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (message, type, settings = {}) => {
  return new Promise((resolve, reject) => {

    // replace the tags
    message = __consoleHtmlPreset(message);

    const symbols = {
      default: '-',
      error: '✘',
      warn: '⚠',
      info: 'ⓘ',
      verbose: '＠',
      debug: '¶',
      silly: '★',
      success: '✔'
    };
    const symbol = symbols[type] || '-';

    // message = `${symbol}  ${message}`;

    const originalLines = message.split('\n');

    let lines = [];

    for (let i = 0; i<originalLines.length; i++) {

      const l = originalLines[i];

      lines.push(__breakLineDependingOnSidesPadding(l, __getDevEnv('terminal.padding') || 6));

    }

    lines = lines.join('\n');

    console.log(`${lines}\n`);

    resolve();

  });
}
