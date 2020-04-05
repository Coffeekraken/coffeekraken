const __ensureExist = require('../../../js/object/ensureExist');
/**
 * @name                              getRegisteredTransports
 * @namespace                         sugar.node.log
 * @type                              Function
 *
 * Return an object with all the registered transports functions stored by transport name
 *
 * @return                      {Object}                                    An object in which keys are transports names and values transports functions
 *
 * @example                   js
 * const getRegisteredTransports = require('@coffeekraken/sugar/node/log/getRegisteredTransports');
 * getRegisteredTransports(); // => { console: ... }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = () => {
  __ensureExist('global.Sugar._log.transports');
  return Sugar._log.transports ? Sugar._log.transports : {};
}
