import __sugarConfig from '../../../shared/config/sugar';
import __SInterface from '../../interface/SInterface';
import __packageRoot from '../../path/packageRoot';

/**
 * @name            ResolveSettingsInterface
 * @namespace       sugar.node.module.interface
 * @type            Class
 * @extends         SInterface
 *
 * This represent the resolve settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class ResolveSettingsInterface extends __SInterface {
  static definition = {
    dirs: {
      type: 'Array<String>',
      default: __sugarConfig('module.resolve.dirs')
    },
    extensions: {
      type: 'Array<String>',
      default: __sugarConfig('module.resolve.extensions')
    },
    fields: {
      type: 'Array<String>',
      default: __sugarConfig('module.resolve.fields')
    },
    buildInModules: {
      type: 'Boolean',
      default: __sugarConfig('module.resolve.builtInModules')
    },
    preferExports: {
      type: 'Boolean',
      default: __sugarConfig('module.resolve.preferExports')
    },
    method: {
      type: 'String',
      values: ['import', 'require'],
      default: __sugarConfig('module.resolve.method')
    },
    target: {
      type: 'String',
      values: ['node', 'default'],
      default: __sugarConfig('module.resolve.target')
    },
    rootDir: {
      type: 'String',
      default: __packageRoot()
    }
  };
}
export default ResolveSettingsInterface;
