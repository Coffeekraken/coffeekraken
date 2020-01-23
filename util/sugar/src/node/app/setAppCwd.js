const __ensureExist = require('../../../dist/js/object/ensureExist');

/**
 * @name                  setAppCwd
 * @namespace             sugar.node.app
 * @type                  Function
 *
 * Set the application "current working directory". This can be different of the 'process.cwd()' value
 *
 * @param             {String}                cwd         The current working directory to set
 * @return            {String}                              The current working directory setted
 *
 * @example           js
 * const setAppCwd = require('@coffeekraken/sugar/node/app/setAppCwd');
 * setAppCwd('/users/coco/myCoolApplication');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setAppCwd(cwd) {
  __ensureExist('global.Sugar._app');
  Sugar._app.cwd = cwd;
  return Sugar._app.cwd;
}
