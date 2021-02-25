import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';

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
    }
  };
}
export default ResolveSettingsInterface;
