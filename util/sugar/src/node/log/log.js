const __getRegisteredTransports = require('./getRegisteredTransports');
const __isTransportRegistered = require('./isTransportRegistered');
const __registerTransport = require('./registerTransport');
const __getSettings = require('./getSettings');
const __fs = require('fs');

/**
 * @name              log
 * @namespace         sugar.node.log
 * @type              Function
 *
 * Simply log your messages with different levels as 'error','warn','info','verbose','debug', 'success' or 'silly'.
 * Your messages will be saved in some separed files under the '.logs' directory.
 *
 * @param         {String}            message             Your message to log
 * @param         {String}            [level='info']      The level of your log
 * @param         {Array}             [transports=null]   The transports wanted for this particular log process. If not specified, will determine the transports to use depending on the type of log
 *
 * @example         js
 * const log = require('@coffeekraken/sugar/node/log/log');
 * log('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function log(message, level = 'default', transports = null) {
  return new Promise((resolve, reject) => {

    const settings = __getSettings();

    let transp = transports || settings.transportsByType[level] || Object.keys(__getRegisteredTransports());
    if (typeof transp === 'string') transp = transp.split(' ');
    const logPromises = [];

    for (let i = 0; i < transp.length; i++) {

      const name = transp[i];

      if ( ! __isTransportRegistered(name)) {
        if ( ! __fs.existsSync(`${__dirname}/transports/${name}.js`)) {
          console.error(`The log transport "${name}" does not exist...`);
          continue;
        }
        __registerTransport(name, require(`./transports/${name}`));
      }

      // get the transport settings
      const transportSettings = (settings.transports && settings.transports[name]) ? settings.transports[name] : {};

      if (message.slice(0,9) === 'override:') {
        message = message.slice(9);
        transportSettings.override = true;
      }

      // call the transport and add it to the promises stack
      logPromises.push(Sugar._log.transports[name].function(message, level, transportSettings));

    }

    Promise.all(logPromises).then(() => {
      resolve();
    });

    // // get the logger instance
    // const logger = __initLogger();
    //
    // const symbols = {
    //   error: '✘',
    //   warn: '⚠',
    //   info: 'ⓘ',
    //   verbose: '＠',
    //   debug: '¶',
    //   silly: '★',
    //   header: null,
    //   success: '✔'
    // };
    //
    // if (symbols[level]) {
    //   message = symbols[level] + ' ' + message;
    // }
    //
    // // logging
    // logger[level](message);
  });
}
