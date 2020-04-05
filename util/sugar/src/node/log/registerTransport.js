const __ensureExist = require('../../../js/object/ensureExist');
const __setup = require('./setup');

/**
 * @name                                    registerTransport
 * @namespace                               sugar.node.log
 * @type                                    Function
 *
 * Register a transport for the log system. A transport is a function that take care the log message passed and the type of the message then return a Promise that will be resolved once the message has been correctly managed.
 *
 * @param                 {String}                  name                        The name of the transport
 * @param                 {Function}                transportFn                 The actual transport function
 * @param                 {Object}                  [settings={}]               The transport settings
 *
 * The transport function will take these parameters:
 *
 * @param                 {String}                  message                     The message to log
 * @param                 {String}                  [type = 'info']             The type of the message
 * @return                {Promise}                                             A promise that will be resolved once the message has been handled correctly
 *
 * @example             js
 * const registerTransport = require('@coffeekraken/sugar/node/log/registerTransport');
 * registerTransport('myCoolLogTransport', (message, type = 'info') => {
 *    return new Promise((resolve, reject) => {
 *      // handle the message here...
 *      resolve();
 *    });
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (name, transportFn, settings = {}) => {

  // check params
  if (typeof name !== 'string') throw new Error(`The parameter "name" of the function "registerTransport" has to be a String...`);
  if (typeof transportFn !== 'function') throw new Error('The parameter "transportFn" of the function "registerTransport" has to be a Function...');
  if (typeof settings !== 'object') throw new Error('The parameter "settings" of the function "registerTransport" has to be an object...');

  __ensureExist('global.Sugar._log.transports');

  // check that the transport passed does not exist already
  if (Sugar._log.transports[name]) {
    console.error(`You try to register the "${name}" log transport function but it already exist...`);
    return false;
  }

  __setup(settings, name);

  // save the new transport in the Sugar._log.transports stack
  Sugar._log.transports[name] = {
    function: transportFn,
    settings: settings
  };

}
