const __ensureExist = require('../../../js/object/ensureExist');

/**
 * @name                  setAppMetas
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
 * const setAppMetas = require('@coffeekraken/sugar/node/app/setAppMetas');
 * setAppMetas({ name: 'My Cool App', version: '1.0.0' });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setAppMetas(meta, override = false) {

  __ensureExist('global.Sugar._app.metas');
  if (override) {
    Sugar._app.metas = meta
  } else {
    Sugar._app.metas = {
      ...Sugar._app.metas,
      ...meta
    };
  }

  // check if a "domain" meta exist
  if (!Sugar._app.metas.domain) {
    if (Sugar._app.metas.homepage) {
      const domain = Sugar._app.metas.homepage.replace('https://', '').replace('http://', '').split('/')[0];
      Sugar._app.metas.domain = domain;
    } else if (process.env.DOMAIN) {
      Sugar._app.metas.domain = process.env.DOMAIN;
    } else {
      Sugar._app.metas.domain = 'coffeekraken.io';
    }
  }

  return Sugar._app.metas;
}
