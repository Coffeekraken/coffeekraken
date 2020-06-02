const __SApp = require('../blessed/app/SApp');
const __deepMerge = require('../object/deepMerge');
const __SConfig = require('../config/SConfig');
const __SConfigFsAdapter = require('../config/adapters/SConfigFsAdapter');
const __packageRoot = require('../path/packageRoot');

/**
 * @name            STermApp
 * @namespace       sugar.node.termapp
 * @type            Class
 * @extends         SApp
 *
 * This represent the main class of the Sugar terminal application.
 *
 * @example         js
 * const STermApp = require('@coffeekraken/sugar/node/termapp/STermApp');
 * const myApp = new STermApp();
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STermApp extends __SApp {
  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    settings = __deepMerge(
      {
        name: 'sugar',
        configFolderPath: `${__packageRoot(process.cwd())}`
      },
      settings
    );

    const adapter = new __SConfigFsAdapter({
      name: settings.name,
      filename: '[name].config.js',
      defaultConfigPath: `${__packageRoot(__dirname)}/.sugar/[filename]`,
      appConfigPath: `${settings.configFolderPath}/[filename]`,
      userConfigPath: null
    });
    const sConfigInstance = new __SConfig(settings.name, {
      adapters: [adapter],
      allowSave: false,
      allowSet: false,
      allowReset: false,
      allowNew: false,
      autoLoad: true,
      autoSave: false
    });

    super(
      __deepMerge(
        {
          ...sConfigInstance.get(''),
          sConfigInstance
        },
        settings
      )
    );
  }
};
