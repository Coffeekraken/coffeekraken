const __SApp = require('../../../../node/blessed/SApp');
const __SProcess = require('../../../../node/terminal/SProcess');
const __SProcessPanel = require('../../../../node/blessed/SProcessPanel');
const __SLogPanel = require('../../../../node/blessed/SLogPanel');
const __deepMerge = require('../../../../node/object/deepMerge');
const __packageJson = require('../../../../package.json');

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
    super(
      __deepMerge(
        {
          header: {
            title: `<bold>Coffeekraken</bold> <bgBlack><yellow> Sugar </yellow></bgBlack> <black>v${__packageJson.version}</black>`
          },
          footer: {
            authors: [
              {
                name: 'Olivier Bossel',
                email: 'olivier.bossel@gmail.com',
                website: 'https://olivierbossel.com'
              }
            ]
          }
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
};
