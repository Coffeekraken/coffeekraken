import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';

/**
 * @name            SGenerateImportmapInterface
 * @namespace       sugar.node.importmap.interface
 * @type            Class
 * @extends         SInterface
 *
 * Represent the generate importmap interface settings
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
export default class SGenerateImportmapInterface extends __SInterface {
  static definition = {
    SFile: {
      type: 'Boolean',
      alias: 'f',
      description:
        'Specify if you want to have back some SFile instances, or just some file pathes',
      default: false
    }
  };
}
