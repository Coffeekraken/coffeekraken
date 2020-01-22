import __ensureExist from '../object/ensureExist';
/**
 * @name                                  isTransportRegistered
 * @namespace                             sugar.js.log
 * @type                                  Function
 *
 * Check if the passed transport is already registered
 *
 * @param             {String}                name                    The transport name to check
 * @return            {Boolean}                                       true if already registered, false if not
 *
 * @example           js
 * import isTransportRegistered from '@coffeekraken/sugar/js/log/isTransportRegistered';
 * isTransportRegistered('console'); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (name) => {
  __ensureExist('window.Sugar._logTransports');
  return Sugar._logTransports[name] ? true : false;
}
