const __existDeep = require('../../../dist/js/object/existDeep');


/**
 * @name                  getAppCwd
 * @namespace             sugar.node.app
 * @type                  Function
 *
 * Get the "current working directory" of the application setted by 'setAppCwd' function
 *
 * @return            {String}                              The "current working directory" of the application
 *
 * @example           js
 * const getAppCwd = require('@coffeekraken/sugar/node/app/getAppCwd');
 * getAppCwd(); // => /user/coco/myCoolApp
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getAppCwd() {
  if ( ! __existDeep('global.Sugar._app.cwd')) return process.cwd();
  return Sugar._app.cwd;
}
