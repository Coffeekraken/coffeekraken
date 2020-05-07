const __SProcess = require('../terminal/SProcess');
const __sugarConfig = require('../config/sugar');
const __packageRoot = require('../path/packageRoot');

/**
 * @name                SPhpServerProcess
 * @type                Class
 *
 * This is a simple class that allows you to start the built-in
 * php server on your machine and to subscribe to events like "data", "error", etc...
 *
 * @param         {Object}        [settings={}]       A settings object to configure your PHP server
 *
 * @example       js
 * const SPhpServerProcess = require('@coffeekraken/sugar/node/server/SPhpServerProcess');
 * const myServer = new SPhpServerProcess({
 *    port: 8080
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPhpServerProcess extends __SProcess {
  /**
   * @name           constructor
   * @type           Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    const rootDir = (
      settings.rootDir ||
      __sugarConfig('server.php.rootDir') ||
      __packageRoot(process.cwd())
    ).replace('[appRoot]', __packageRoot(process.cwd()));
    const hostname =
      settings.hostname || __sugarConfig('server.php.hostname') || 'localhost';
    const port = settings.port || __sugarConfig('server.php.port') || 8080;

    // init SProcess instance
    super(
      {
        start: {
          command: `php -S [hostname]:[port] -t ${rootDir}`,
          concurrent: false,
          color: 'red',
          ask: [
            {
              type: 'input',
              default: 8181,
              question: 'Is that the port "8181" ok for you?',
              token: 'port'
            },
            {
              type: 'input',
              default: 'localhost',
              question: 'Is that the hostname "localhost" ok for you?',
              token: 'hostname'
            }
          ]
        },
        start1: {
          command: `php -S ${hostname}:8181 -t ${rootDir}`,
          concurrent: false,
          color: 'yellow',
          run: true
        }
      },
      {
        ...(settings.process || {}),
        type: 'steps',
        keys: {
          start: {
            key: 's',
            type: 'run',
            menu: 'Start',
            command: 'start'
          },
          start1: {
            key: 'd',
            type: 'run',
            menu: 'Start 1',
            command: 'start1'
          }
        }
      }
    );
  }
};
