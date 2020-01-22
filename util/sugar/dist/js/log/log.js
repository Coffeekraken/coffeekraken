"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getRegisteredTransports = _interopRequireDefault(require("./getRegisteredTransports"));

var _isTransportRegistered = _interopRequireDefault(require("./isTransportRegistered"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      log
 * @namespace                 sugar.js.log
 * @type                      Function
 *
 * Log any message, errors, etc... using the Sugar log system. This let you register some "transports" that will handle your logs differently depending on your configuration and your log call params.
 *
 * @param                 {String}                      message                         The message to log
 * @param                 {String}                      [type=info]                     The log type. Can be "error", "warn", "info", "verbose", "debug", "silly"
 * @param                 {String|Array}                [transports=null]               Which transports you want to use for your message
 *
 * @example           js
 * import log from '@coffeekraken/sugar/js/log/log';
 * log('Hello world', 'error');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (message, type = 'info', transports = null) => {
  return new Promise((resolve, reject) => {
    const transp = transports ? transports : (0, _getRegisteredTransports.default)().keys();
    const logPromises = [];

    for (let i = 0; i < transp.length; i++) {
      const name = transp[i];

      if (!(0, _isTransportRegistered.default)(name)) {
        console.error(`The log transport "${name}" does not exist...`);
        continue;
      } // call the transport and add it to the promises stack


      logPromises.push(Sugar._logTransports[name](message, type));
    }

    Promise.all(logPromises).then(() => {
      resolve();
    });
  });
};

exports.default = _default;
module.exports = exports.default;