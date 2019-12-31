const __env = require('./env');
const __setAppMeta = require('./setAppMeta');
const __getAppMeta = require('./getAppMeta');
const __fs = require('fs');
const __logHeader = require('../log/logHeader');

/**
 * @name                  initApp
 * @namespace             sugar.node.app
 * @type                  Function
 *
 * Initialize the app by doing:
 * - Setting the app meta using the 'setAppMeta' function and trying to read the 'package.json' file
 * - Initializing the 'process.env' stack using the 'dotenv' package
 * - Setting the 'package.json' content inside the 'process.env.PACKAGE' variable
 * - Printing in the console the application header with the infos like 'name', 'description', 'version', etc...
 *
 * The 'settings' object must have this structure:
 * '''js
 * {
 *    meta: { }, // object passed to the 'setAppMeta' function
 *    env: { } // object that will be setted in the 'process.env' stack
 * }
 * '''
 *
 * @param               {Object}                    [settings={}]                   The settings object to init the app
 *
 * @example             js
 * const initApp = require('@coffeekraken/sugar/node/app/initApp');
 * initApp();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function initApp(settings = {}) {

  let packageJson = null;
  try {
    if (__fs.existsSync(process.cwd() + '/package.json')) {
      packageJson = require(process.cwd() + '/package.json');
    }
  } catch(e) {}

  // init env stack
  __env();
  process.env = {
    ...process.env,
    ...settings.env || {}
  };

  // set app meta
  __setAppMeta(packageJson || {});
  __setAppMeta(settings.meta || {});

  // get the current app meta
  const appMeta = __getAppMeta();

  // log the app header
  const metas = {};
  if (appMeta.author) metas.author = appMeta.author;
  if (appMeta.homepage) metas.homepage = appMeta.homepage;
  if (appMeta.version) metas.version = appMeta.version;
  if (appMeta.license) metas.license = appMeta.license;
  if (appMeta.keywords) metas.keywords = appMeta.keywords.join(',');
  if (appMeta.contributors) {
    let contributorsArray = [];
    appMeta.contributors.forEach((cont) => {
      contributorsArray.push(`${cont.name} <${cont.email}>`);
    });
    metas.contributors = contributorsArray.join(', ');
  }
  __logHeader(appMeta.name || 'Coffeekraken', appMeta.description || 'Coffeekraken sugar based application', metas);


}
