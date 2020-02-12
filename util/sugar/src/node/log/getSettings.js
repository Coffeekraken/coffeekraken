const __existDeep = require('../../../dist/js/object/existDeep');
const __ensureExist = require('../../../dist/js/object/ensureExist');


/**
 * @name                                      getSettings
 * @namespace                                 sugar.node.log
 * @type                                      Function
 *
 * Retreive the settings of the log system, or the settings of a specific transport if a name is passed
 *
 * @param                 {String}                  [transportName=null]                    The transport name to get the settings from
 * @return                {Object}                                                          The settings object
 *
 * @example             js
 * const getSettings = require('@coffeekraken/sugar/node/log/getSettings');
 * getSettings(); // => the global settings
 * getSettings('console'); // => the console transport settings
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (transportName = null) => {

  __ensureExist('global.Sugar._log');

  if (transportName) {
    if ( ! __existDeep(`Sugar._log.transports.${transportName}.settings`)) {
      console.error(`You try to get the log settings for the transport "${transportName}" but this transport has not been registered...`);
      return false;
    }
    return Sugar._log.transports[transportName].settings || {};
  }

  if ( ! Sugar._log.settings) {
    Sugar._log.settings = {
      transportsByType: {
        default: process.env.NODE_ENV === 'production' ? '' : 'console files',
        error: process.env.NODE_ENV === 'production' ? 'mail' : 'console files',
        warn: process.env.NODE_ENV === 'production' ? 'mail' : 'console files',
        info: process.env.NODE_ENV === 'production' ? '' : 'console files',
        verbose: process.env.NODE_ENV === 'production' ? '' : 'console files',
        debug: process.env.NODE_ENV === 'production' ? '' : 'console files',
        silly: process.env.NODE_ENV === 'production' ? '' : 'console files',
        success: process.env.NODE_ENV === 'production' ? '' : 'console files'
      }
    }
  }

  return Sugar._log.settings;

}
