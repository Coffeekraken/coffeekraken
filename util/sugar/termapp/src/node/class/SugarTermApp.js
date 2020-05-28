const __SApp = require('../../../../node/blessed/app/SApp');
const __deepMerge = require('../../../../node/object/deepMerge');
const __SConfig = require('../../../../node/config/SConfig');
const __SConfigFsAdapter = require('../../../../node/config/adapters/SConfigFsAdapter');
const __packageRoot = require('../../../../node/path/packageRoot');

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
      appConfigPath: `${__dirname}/../../../[filename]`,
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
          ...sConfigInstance.get(''),
          sConfigInstance
        },
        settings
      )
    );

    // setTimeout(() => {
    //   this.goTo('/about?coco=efdwef');
    // }, 2000);
    // setTimeout(() => {
    //   this.goTo('/commands/build');
    // }, 2000);

    // new __SBuildScssCommand();
    // new __SBuildScssCommand();
    // new __SBuildScssCommand();
    // new __SBuildScssCommand();
    // new __SBuildScssCommand();
    // new __SBuildScssCommand();
    // // new __SBuildScssCommand();
    // new __SPhpServerCommand();

    // // const scssCommand = ;
    // const panel = new __SCommandPanel('+(build|server)');
    // this.append(panel);
  }
};
