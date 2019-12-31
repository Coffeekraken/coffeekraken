"use strict";

const __winston = require('winston');

const __deepMerge = require('../../js/object/deepMerge');
/**
 * @name                    initLogger
 * @namespace               sugar.node.log
 * @type                    Function
 *
 * Init a winston logger object with the passed settings or with default onces...
 *
 * @param           {Object}              [winstonSettings={}]            Pass some winston settings to override the defaults settings
 * @param           {String}              [logsPath=process.cwd() + '/.logs]        Define the folder where to save the logs files
 *
 * @example         js
 * const initLogger = require('@coffeekraken/sugar/node/log/initLogger');
 * const myLogger = initLogger({ exitOnError: true });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function initLogger(winstonSettings = {}, logsPath = process.cwd() + '/.logs') {
  // check if a logger already exist
  if (!global._sLogger) {
    // process.on('uncaughtException', function(err) {
    //   console.log('Caught exception: ' + err);
    // });
    const myCustomLevels = {
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5,
        header: 6,
        success: 7,
        ...(winstonSettings.levels || {})
      },
      colors: {
        error: 'red',
        warn: 'magenta',
        info: 'yellow',
        verbose: 'blue',
        header: 'bold green',
        success: 'green',
        ...(winstonSettings.colors || {})
      }
    };

    __winston.addColors(myCustomLevels.colors);

    const myFormat = __winston.format.printf(({
      level,
      message,
      label,
      timestamp
    }) => {
      return message;
    }); // init and merge the settings


    const finalSettings = __deepMerge({
      levels: myCustomLevels.levels,
      exitOnError: false,
      format: __winston.format.combine(process.env.ENV !== 'production' ? __winston.format.colorize({
        all: true
      }) : __winston.format.timestamp(), myFormat),
      exceptionHandlers: [new __winston.transports.Console(), new __winston.transports.File({
        filename: logsPath + '/exceptions.log'
      })],
      transports: [new __winston.transports.Console({
        timestamp: false,
        json: false,
        level: 'header'
      }), new __winston.transports.File({
        filename: logsPath + '/errors.log',
        level: 'error'
      }), new __winston.transports.File({
        filename: logsPath + '/warnings.log',
        level: 'warn'
      }), new __winston.transports.File({
        filename: logsPath + '/infos.log',
        level: 'info'
      }), new __winston.transports.File({
        filename: logsPath + '/verboses.log',
        level: 'verbose'
      }), new __winston.transports.File({
        filename: logsPath + '/debugs.log',
        level: 'debug'
      }), new __winston.transports.File({
        filename: logsPath + '/silly.log',
        level: 'silly'
      }), new __winston.transports.File({
        filename: logsPath + '/combined.log'
      })]
    }, winstonSettings); // init and save globally the logger instance


    global._sLogger = __winston.createLogger(finalSettings);
  } // return the logger instance


  return global._sLogger;
};