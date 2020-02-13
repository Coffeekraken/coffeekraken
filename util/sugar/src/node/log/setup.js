const __ensureExist = require('../../../dist/js/object/ensureExist');
const __deepMerge = require('../../../dist/js/object/deepMerge');

/**
 * @name                                                  setup
 * @namespace                                             sugar.node.log
 * @type                                                  Function
 *
 * Setup the log system, transports, etc...
 *
 * The settings that you can set are:
 *
 * - ```transportsByType```: Specify the transports to use for each types. The format is an object with the transports name as key and a space separated string for the transports value
 *
 * @param                 {Object}                  settings                          The settings to set
 * @param                 {String}                  [transport=null]                  Specify a transport name if you want to setup it
 * @return                {Object}                                                    The current log settings or transport settings
 *
 * @example               js
 * const setup = require('@coffeekraken/node/log/setup');
 * setup({
 *    transportsByType: {
 *      error: 'console mail',
 *      warn: 'console',
 *      // etc...
 *    }
 * });
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (settings, transport = null) => {

  if (transport) {
    __ensureExist(`global.Sugar._log.transports.${transport}.settings`);
    __ensureExist(`global.Sugar._log.settings.transports.${transport}`);
    Sugar._log.transports[transport].settings = __deepMerge(Sugar._log.transports[transport].settings, settings);
    Sugar._log.settings.transports[transport] = __deepMerge(Sugar._log.settings.transports[transport], settings);
    return Sugar._log.transports[transport].settings;
  }

  __ensureExist('global.Sugar._log.settings');
  Sugar._log.settings = __deepMerge(Sugar._log.settings, settings);
  return Sugar._log.settings;

}
