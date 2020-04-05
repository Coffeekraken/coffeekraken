"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureExist = _interopRequireDefault(require("../object/ensureExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                            registerTransport
 * @namespace                       sugar.js.log
 * @type                            Function
 *
 * Register a transport for the log system. A transport is a function that take care the log message passed and the type of the message then return a Promise that will be resolved once the message has been correctly managed.
 *
 * @param                 {String}                  name                        The name of the transport
 * @param                 {Function}                transportFn                 The actual transport function
 *
 * The transport function will take these parameters:
 *
 * @param                 {String}                  message                     The message to log
 * @param                 {String}                  [type = 'info']             The type of the message
 * @return                {Promise}                                             A promise that will be resolved once the message has been handled correctly
 *
 * @example             js
 * import registerTransport from '@coffeekraken/sugar/js/log/registerTransport';
 * registerTransport('myCoolLogTransport', (message, type = 'info') => {
 *    return new Promise((resolve, reject) => {
 *      // handle the message here...
 *      resolve();
 *    });
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (name, transportFn) => {
  // check params
  if (typeof name !== 'string') throw new Error(`The parameter "name" of the function "registerTransport" has to be a String...`);
  if (typeof transportFn !== 'function') throw new Error('The parameter "transportFn" of the function "registerTransport" has to be a Function...');
  (0, _ensureExist.default)('window.Sugar._logTransports'); // check that the transport passed does not exist already

  if (Sugar._logTransports[name]) {
    console.error(`You try to register the "${name}" log transport function but it already exist...`);
    return false;
  } // save the new transport in the Sugar._logTransports stack


  Sugar._logTransports[name] = transportFn;
};

exports.default = _default;
module.exports = exports.default;