const __SInterface = require('../../../class/SInterface');
const __sugarConfig = require('../../../config/sugar');

/**
 * @name                SExpressServerInterface
 * @namespace           node.server.express.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an express server process.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SExpressServerInterface extends __SInterface {
  static definitionObj = {
    hostname: {
      type: 'String',
      alias: 'o',
      description: 'Server hostname',
      default: __sugarConfig('express.hostname') || '127.0.0.1',
      level: 1
    },
    port: {
      type: 'Number',
      alias: 'p',
      description: 'Server port',
      default: __sugarConfig('express.port') || 3000,
      level: 1
    },
    rootDir: {
      type: 'String',
      description: 'Server root directory',
      default: __sugarConfig('express.rootDir') || __packageRoot(process.cwd()),
      level: 1
    },
    viewsDir: {
      type: 'String',
      description: 'Server views directory',
      default:
        __sugarConfig('express.viewsDir') ||
        __packageRoot(process.cwd()) + '/views'
    },
    viewEngine: {
      type: 'String',
      description: 'Server views rendering engine',
      default: __sugarConfig('express.viewEngine') || 'bladePhp'
    }
  };
};
