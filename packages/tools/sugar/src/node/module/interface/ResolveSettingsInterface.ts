import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
import __packageRoot from '../../path/packageRoot';

/**
 * @name            ResolveSettingsInterface
 * @namespace            node.module.interface
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
      default: __SugarConfig.get('module.resolve.dirs')
    },
    extensions: {
      type: 'Array<String>',
      default: __SugarConfig.get('module.resolve.extensions')
    },
    fields: {
      type: 'Array<String>',
      default: __SugarConfig.get('module.resolve.fields')
    },
    buildInModules: {
      type: 'Boolean',
      default: __SugarConfig.get('module.resolve.builtInModules')
    },
    preferExports: {
      type: 'Boolean',
      default: __SugarConfig.get('module.resolve.preferExports')
    },
    method: {
      type: 'String',
      values: ['import', 'require'],
      default: __SugarConfig.get('module.resolve.method')
    },
    target: {
      type: 'String',
      values: ['node', 'default'],
      default: __SugarConfig.get('module.resolve.target')
    },
    rootDir: {
      type: 'String',
      default: __packageRoot()
    }
  };
}
export default ResolveSettingsInterface;
