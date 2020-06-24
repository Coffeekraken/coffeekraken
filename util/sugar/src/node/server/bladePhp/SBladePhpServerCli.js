const __SPhpServerCli = require('../php/SPhpServerCli');
const __packageRoot = require('../../path/packageRoot');
const __deepMerge = require('../../object/deepMerge');
const __argsToObject = require('../../cli/argsToObject');
const __sugarConfig = require('../../config/sugar');

/**
 * @name            SBladePhpServerCli
 * @namespace           node.server.bladePhp
 * @type            Class
 * @extends         SPhpServerCli
 *
 * This class represent the Blade PHP cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBladePhpServerCli extends __SPhpServerCli {
  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    server: {
      type: 'Object',
      description: 'PHP server options',
      children: {
        ...__SPhpServerCli.definitionObj
      }
    },
    rootDir: {
      type: 'String',
      description: 'Blade views root directory',
      default:
        __sugarConfig('views.rootDir') ||
        `${__packageRoot(process.cwd())}/dist/views`
    },
    cacheDir: {
      type: 'String',
      description: 'Blade views cache directory',
      default:
        __sugarConfig('views.cacheDir') ||
        `${__packageRoot(process.cwd())}/dist/views/.cache`
    }
  };

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(settings);
  }

  /**
   * @name            run
   * @type            Function
   * @override
   *
   * This method simply override the default one.
   * For arguments documentation, check the SCli class.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(
    argsObj = this._settings.argsObj,
    includeAllArgs = this._settings.includeAllArgs
  ) {
    const args = __argsToObject(argsObj, this.definitionObj);
    const serverArgs = __deepMerge(args.server, {
      ...__sugarConfig('blade.server')
    });
    serverArgs.router = `${__packageRoot(
      __dirname
    )}/src/php/blade/sBladePhpServerRouter.php`;
    const pro = super.run(serverArgs, includeAllArgs, false);
    setTimeout(() => {
      this.log(`<green>Your Blade PHP server is up and running</green>:

Hostname              : <yellow>${this.runningArgsObj.hostname}</yellow>
Port                  : <yellow>${this.runningArgsObj.port}</yellow>
Root directory        : <yellow>${this.runningArgsObj.rootDir}</yellow>
Views root directory  : <yellow>${args.rootDir}</yellow>
Views cache directory : <yellow>${args.cacheDir}</yellow>
API Url               : <cyan>http://${this.runningArgsObj.hostname}:${this.runningArgsObj.port}</cyan>`);
    });
    return pro;
  }
};
