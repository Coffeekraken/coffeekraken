import __ensureExist from '../object/ensureExist';
/**
 * @name                              getRegisteredTransports
 * @namespace                         sugar.js.log
 * @type                              Function
 *
 * Return an object with all the registered transports functions stored by transport name
 *
 * @return                      {Object}                                    An object in which keys are transports names and values transports functions
 *
 * @example                   js
 * import getRegisteredTransports from '@coffeekraken/sugar/js/log/getRegisteredTransports';
 * getRegisteredTransports(); // => { console: ... }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default () => {
  __ensureExist('window.Sugar._logTransports');
  return Sugar._logTransports ? Sugar._logTransports : {};
}
