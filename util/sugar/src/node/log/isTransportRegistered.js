const __ensureExist = require('../../../dist/js/object/ensureExist');
/**
 * @name                                  isTransportRegistered
 * @namespace                             sugar.node.log
 * @type                                  Function
 *
 * Check if the passed transport is already registered
 *
 * @param             {String}                name                    The transport name to check
 * @return            {Boolean}                                       true if already registered, false if not
 *
 * @example           js
 * const isTransportRegistered = require('@coffeekraken/sugar/node/log/isTransportRegistered');
 * isTransportRegistered('console'); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (name) => {
  __ensureExist('global.Sugar._log.transports');
  return Sugar._log.transports[name] && typeof Sugar._log.transports[name].function === 'function' ? true : false;
}
