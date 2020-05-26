const __SApp = require('../../../../node/blessed/SApp');
const __deepMerge = require('../../../../node/object/deepMerge');
const __packageJson = require('../../../../package.json');
const __sugarConfig = require('../../../../node/config/sugar');
const __SConfig = require('../../../../node/config/SConfig');
const __SConfigFsAdapter = require('../../../../node/config/adapters/SConfigFsAdapter');
const __packageRoot = require('../../../../node/path/packageRoot');

const __SPhpServerCommand = require('../../../../node/server/SPhpServerCommand');
const __SCommandPanel = require('../../../../node/blessed/SCommandPanel');
const __SBuildScssCommand = require('../../../../node/build/commands/SBuildScssCommand');

/**
 * @name            SugarTermApp
 * @namespace       termapp.node.class
 * @type            Class
 * @extends         SApp
 *
 * This represent the main class of the Sugar terminal application.
 *
 * @example         js
 * const SugarTermApp = require('@coffeekraken/sugar/termapp/src/node/class/SugarTermApp');
 * const myApp = new SugarTermApp();
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SugarTermApp extends __SApp {
  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    const adapter = new __SConfigFsAdapter({
      name: 'termapp',
      filename: '[name].config.js',
      defaultConfigPath: `${__packageRoot(__dirname)}/.sugar/[filename]`,
      appConfigPath: `${__packageRoot(process.cwd())}/.sugar/[filename]`,
      userConfigPath: null
    });
    const sConfigInstance = new __SConfig('termapp', {
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
          sConfigInstance
        },
        settings
      )
    );

    new __SBuildScssCommand();
    new __SBuildScssCommand();
    new __SBuildScssCommand();
    new __SBuildScssCommand();
    new __SBuildScssCommand();
    new __SBuildScssCommand();
    // new __SBuildScssCommand();
    new __SPhpServerCommand();

    // const scssCommand = ;
    const panel = new __SCommandPanel('+(build|server)');
    this.append(panel);
  }
};
