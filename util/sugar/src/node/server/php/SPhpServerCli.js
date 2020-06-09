const __SCli = require('../../cli/SCli');
const __packageRoot = require('../../path/packageRoot');
const __sugarConfig = require('../../config/sugar');

/**
 * @name            SPhpServerCli
 * @namespace       sugar.node.server.php
 * @type            Class
 * @extends         SCli
 *
 * This class represent the PHP cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPhpServerCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'php -S [hostname]:[port] -t [rootDir] [router] [arguments]';

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
    hostname: {
      type: 'String',
      alias: 'o',
      description: 'Server hostname',
      default: __sugarConfig('php.hostname') || 'localhost',
      level: 1
    },
    port: {
      type: 'Number',
      alias: 'p',
      description: 'Server port',
      default: __sugarConfig('php.port') || 8080,
      level: 1
    },
    rootDir: {
      type: 'String',
      description: 'Server root directory',
      default: __sugarConfig('php.rootDir') || __packageRoot(process.cwd()),
      level: 1
    },
    router: {
      type: 'String',
      description: 'Server router',
      default: '',
      level: 1
    },
    interactive: {
      type: 'Boolean',
      alias: 'a',
      description: 'Run as interactive shell',
      default: false,
      level: 2
    },
    config: {
      type: 'String',
      alias: 'c',
      description: 'Look for php.ini file in this directory',
      level: 2
    },
    noini: {
      type: 'Boolean',
      alias: 'n',
      description: 'No php.ini file will be used',
      default: false,
      level: 2
    },
    define: {
      type: 'String',
      alias: 'd',
      description: `Define INI entry foo with value 'bar'`,
      level: 2
    },
    extended: {
      type: 'Boolean',
      alias: 'e',
      description: 'Generate extended information for debugger/profiler',
      default: false,
      level: 2
    },
    file: {
      type: 'String',
      alias: 'f',
      description: 'Parse <file>',
      level: 2
    },
    help: {
      type: 'Boolean',
      alias: 'h',
      description: 'Help',
      default: false,
      level: 2
    },
    information: {
      type: 'Boolean',
      alias: 'i',
      description: 'PHP information',
      default: false,
      level: 2
    },
    lint: {
      type: 'Boolean',
      alias: 'l',
      description: 'Syntax check only (lint)',
      default: false,
      level: 2
    },
    modules: {
      type: 'Boolean',
      alias: 'm',
      description: 'Show compiled in modules',
      default: false,
      level: 2
    },
    run: {
      type: 'String',
      alias: 'r',
      description: 'Run PHP <code> without using script tags <?..?>',
      level: 2
    },
    begin: {
      type: 'String',
      alias: 'B',
      description: 'Run PHP <begin_code> before processing input lines',
      level: 2
    },
    runLine: {
      type: 'String',
      alias: 'R',
      description: 'Run PHP <code for every input line',
      level: 2
    },
    fileLine: {
      type: 'String',
      alias: 'F',
      description: 'Parse and execute <file> for every input line',
      level: 2
    },
    end: {
      type: 'String',
      alias: 'E',
      description: 'Run PHP <end_code> after processing all input lines',
      level: 2
    },
    hide: {
      type: 'Boolean',
      alias: 'H',
      description: 'Hide any passed arguments from external tools',
      default: false,
      level: 2
    },
    color: {
      type: 'Boolean',
      alias: 's',
      description: 'Display colour syntax highlighted source',
      default: false,
      level: 2
    },
    version: {
      type: 'Boolean',
      alias: 'v',
      description: 'Version number',
      default: false,
      level: 2
    },
    stripped: {
      type: 'Boolean',
      alias: 'w',
      description: 'Display source with stripped comments and whitespace',
      default: false,
      level: 2
    },
    zend: {
      type: 'String',
      alias: 'z',
      description: 'Load Zend extension <file>',
      level: 2
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
    includeAllArgs = this._settings.includeAllArgs,
    log = true
  ) {
    const pro = super.run(argsObj, includeAllArgs);
    if (!log) return pro;

    setTimeout(() => {
      this.log(`<green>Your PHP server is up and running</green>:

Hostname       : <yellow>${this.runningArgsObj.hostname}</yellow>
Port           : <yellow>${this.runningArgsObj.port}</yellow>
Root directory : <yellow>${this.runningArgsObj.rootDir}</yellow>
URL            : <cyan>http://${this.runningArgsObj.hostname}:${this.runningArgsObj.port}</cyan>`);
    });
    return pro;
  }
};
