const __SApp = require('../../../../node/blessed/SApp');
const __SProcess = require('../../../../node/terminal/SProcess');
const __SProcessPanel = require('../../../../node/blessed/SProcessPanel');
const __SLogPanel = require('../../../../node/blessed/SLogPanel');
const __deepMerge = require('../../../../node/object/deepMerge');
const __packageJson = require('../../../../package.json');
const __sugarConfig = require('../../../../node/config/sugar');
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
  }

  /**
   * @name              exec
   * @type              Function
   *
   * This method takes one or more SCommand instances and execute them.
   * You can also pass as parameter a simple text command like "ls -la" or whatever
   *
   * @param         {String|SCommand|Array}         command         The command(s) to execute
   * @return        {SPromise}                                      An SPromise instance that will be resolved once all the commands are finished
   *
   * @example       js
   * myCoolApp.exec('ls -la');
   *
   * @TODO      Better example
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  exec(command) {
    if (!Array.isArray(command)) command = [command];
    const process = new __SProcess(command, {});
    const processPanel = new __SProcessPanel(process, {});
    this.append(processPanel);
  }

  /**
   * @name              process
   * @type              Function
   *
   * This method take as parameter an SProcess instance and display it properly
   *
   * @param         {SProcess}         process            The SProcess to display
   *
   * @example       js
   * myCoolApp.process(myCoolProcess);
   *
   * @TODO      Better example
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(process) {
    const processPanel = new __SProcessPanel(process, {});
    this.append(processPanel);
  }
};
