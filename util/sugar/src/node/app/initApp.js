const __setAppMetas = require('./setAppMetas');
const __getAppMetas = require('./getAppMetas');
const __getAppCwd = require('./getAppCwd');
const __setAppCwd = require('./setAppCwd');
const __fs = require('fs');
const __logHeader = require('../log/logHeader');
const __beautifyErrors = require('../dev/beautifyErrors');
const __initEnv = require('./initEnv');
const __setupDevEnv = require('../dev/setupDevEnv');

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
 *    env: { }, // object that will be setted in the 'process.env' stack
 *    cwd: getAppCwd() // the "current working directory" where the application lives. Can be different that the `process.cwd()`
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

  if (settings.cwd) __setAppCwd(settings.cwd);
  const cwd = settings.cwd || __getAppCwd();

  let packageJson = null;
  try {
    if (__fs.existsSync(cwd + '/package.json')) {
      packageJson = require(cwd + '/package.json');
    }
  } catch(e) {}

  // beautify the errors
  __beautifyErrors();

  // setup dev env
  __setupDevEnv({
    stdout: {
      padding: 3
    }
  });

  // init env stack
  __initEnv();
  process.env = {
    ...process.env,
    ...settings.env || {}
  };

  // set app meta
  __setAppMetas(packageJson || {});
  __setAppMetas(settings.meta || {});
  __setAppMetas({
    cwd: cwd
  });

  // get the current app meta
  const appMetas = __getAppMetas();

  // log the app header
  const metas = {};
  if (appMetas.author) metas.author = appMetas.author;
  if (appMetas.homepage) metas.homepage = appMetas.homepage;
  if (appMetas.version) metas.version = appMetas.version;
  if (appMetas.license) metas.license = appMetas.license;
  if (appMetas.keywords) metas.keywords = appMetas.keywords.join(',');
  if (appMetas.contributors) {
    let contributorsArray = [];
    appMetas.contributors.forEach((cont) => {
      contributorsArray.push(`${cont.name} <${cont.email}>`);
    });
    metas.contributors = contributorsArray.join(', ');
  }
  __logHeader(appMetas.name || 'Coffeekraken', appMetas.description || 'Coffeekraken sugar based application', metas);

}
