/**
 * @name                  setMeta
 * @namespace             sugar.node.app
 * @type                  Function
 *
 * Set some application meta data that will be reused in some others functions/utilities, etc...
 *
 * @param             {Object}                meta          The meta data to set
 * @param             (Boolean}               [override=false]      If false, the passed meta data will be merged with the current one. If true, all the current meta will be overrided
 * @return            {Object}                              The meta data object setted
 *
 * @example           js
 * const setMeta = require('@coffeekraken/sugar/node/app/setMeta');
 * setMeta({ name: 'My Cool App', version: '1.0.0' });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setMeta(meta, override = false) {
  if ( ! global._sAppMeta) global._sAppMeta = {};
  if (override) {
    global._sAppMeta = meta;
  } else {
    global._sAppMeta = {
      ...global._sAppMeta,
      ...meta
    };
  }
  return global._sAppMeta;
}
