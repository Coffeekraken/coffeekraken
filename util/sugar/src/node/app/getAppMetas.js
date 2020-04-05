const __existDeep = require('../../../js/object/existDeep');


/**
 * @name                  getAppMetas
 * @namespace             sugar.node.app
 * @type                  Function
 *
 * Get the meta data defined using the 'setMeta' function
 *
 * @return            {Object}                              The meta data object setted
 *
 * @example           js
 * const getAppMetas = require('@coffeekraken/sugar/node/app/getAppMetas');
 * getAppMetas(); // => { name: 'My Cool App', version: '1.0.0' }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getAppMetas() {
  if (!__existDeep('global.Sugar._app.metas')) return {};
  return Sugar._app.metas;
}
