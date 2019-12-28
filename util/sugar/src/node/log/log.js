const __winston = require('winston');

/**
 * @name              log
 * @namespace         sugar.node.log
 * @type              Function
 *
 * Simply log your messages with different levels as 'error','warning','info','verbose','debug' or 'silly'.
 * Your messages will be saved in some separed files under the '.logs' directory.
 *
 * @param         {String}            message             Your message to log
 * @param         {String}            [level='info']      The level of your log
 *
 * @example         js
 * const log = require('@coffeekraken/sugar/node/log/log');
 * log('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function log(message, level = 'info') {

  // check if a logger already exist
  if ( ! global._sLogger) {

    const myCustomLevels = {
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5,
        header: 6
      },
      colors: {
        header: 'green'
      }
    };

    __winston.addColors(myCustomLevels.colors);

    const myFormat = __winston.format.printf(({ level, message, label, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });

    global._sLogger = __winston.createLogger({
      // level: 'info',
      levels: myCustomLevels.levels,
      exitOnError: false,
      format: __winston.format.combine(
        __winston.format.label({ label: 'right meow!' }),
        __winston.format.timestamp(),
        myFormat
      ),
      exceptionHandlers: [
        new __winston.transports.Console(),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/exceptions.log'
        })
      ],
      transports: [
        new __winston.transports.Console(),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/errors.log',
          level: 'error'
        }),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/warnings.log',
          level: 'warn'
        }),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/infos.log',
          level: 'info'
        }),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/verboses.log',
          level: 'verbose'
        }),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/debugs.log',
          level: 'debug'
        }),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/silly.log',
          level: 'silly'
        }),
        new __winston.transports.File({
          filename: process.cwd() + '/.logs/combined.log'
        })
      ]
    });
  }

  // logging
  global._sLogger.log({
    level: level,
    message: message
  });

}
