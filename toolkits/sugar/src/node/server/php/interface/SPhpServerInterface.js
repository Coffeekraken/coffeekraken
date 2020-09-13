const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');

/**
 * @name                SPhpServerInterface
 * @namespace           node.server.php.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a php server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPhpServerInterface extends __SInterface {
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
};
