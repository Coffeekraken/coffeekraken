const __consoleHtmlPreset = require('../htmlPresets/console');
const __breakLineDependingOnSidesPadding = require('../../terminal/breakLineDependingOnSidesPadding');
const __getDevEnv = require('../../dev/getDevEnv');
const __terminalOverwrite = require('terminal-overwrite');
const __readline = require('readline');

let _lastLog = null;

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

    if (settings.override) {
      if (_lastLog) {
        const linesCount = _lastLog.split('\n').length;
        for (let i=0; i<linesCount; i++) {
          __readline.clearLine(process.stdout, 0);
          __readline.moveCursor(process.stdout, 0, -1);
        }
        __readline.clearLine(process.stdout, 0);
      }
      _lastLog = `${lines}\n`;
      process.stdout.write(`${lines}\n\n`);
    } else {
      console.log(`${lines}\n`);
    }

    resolve();

  });
}
