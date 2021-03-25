// @ts-nocheck

import __sugarConfig from '../../../../shared/config/sugar';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontendServerInterface
 * @namespace           sugar.node.server.express.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a frontend server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFrontendServerInterface extends __SInterface {
  static definition = {
    hostname: {
      type: 'String',
      alias: 'o',
      description: 'Server hostname',
      required: true,
      // default: __sugarConfig('frontend.hostname') || '127.0.0.1',
      level: 1
    },
    port: {
      type: 'Number',
      alias: 'p',
      description: 'Server port',
      default: __sugarConfig('frontend.port') || 3000,
      level: 1
    },
    rootDir: {
      type: 'String',
      description: 'Server root directory',
      default:
        __sugarConfig('frontend.rootDir') || __packageRoot(process.cwd()),
      level: 1
    },
    viewsDir: {
      type: 'String',
      description: 'Server views directory',
      default:
        __sugarConfig('frontend.viewsDir') ||
        __packageRoot(process.cwd()) + '/views'
    }
  };
}
