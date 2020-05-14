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
          command: `php -S [hostname]:[port] -t [rootDir]`,
          color: 'red',
          ask: {
            type: 'questions',
            items: [
              {
                id: 'port',
                type: 'input',
                default: port,
                question: `Is that the port "${port}" ok for you?`
              },
              {
                id: 'hostname',
                type: 'input',
                default: hostname,
                question: `Is that the hostname "${hostname}" ok for you?`
              },
              {
                id: 'rootDir',
                type: 'input',
                default: rootDir,
                question:
                  'Specify the root directory you want for your PHP server'
              }
            ]
          }
        },
        plop: {
          command: 'ls -la',
          color: 'cyan',
          ask: {
            type: 'summary',
            items: [
              {
                id: 'port',
                text: 'Port',
                default: port
              },
              {
                id: 'hostname',
                text: 'Hostname',
                default: hostname
              },
              {
                id: 'rootDir',
                text: 'Root directory',
                default: rootDir
              }
            ]
          }
        },
        start1: {
          command: `php -S ${hostname}:8181 -t ${rootDir}`,
          color: 'yellow'
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
          plop: {
            key: 'p',
            type: 'run',
            menu: 'Plop',
            command: 'plop'
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
