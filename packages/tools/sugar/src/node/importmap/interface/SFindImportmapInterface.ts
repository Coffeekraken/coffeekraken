import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';

/**
 * @name            SFindImportmapInterface
 * @namespace       sugar.node.importmap.interface
 * @type            Class
 * @extends         SInterface
 *
 * Represent the importmap interface settings like directories where to search for, file names, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
export default class SFindImportmapInterface extends __SInterface {
  static definition = {
    SFile: {
      type: 'Boolean',
      alias: 'f',
      description:
        'Specify if you want to have back some SFile instances, or just some file pathes',
      default: false
    },
    names: {
      type: 'Array<String>',
      alias: 'n',
      description: 'Specify some file names to search',
      default: __sugarConfig('importmap.file.names')
    },
    dirs: {
      type: 'Array<String>',
      alias: 'd',
      description:
        'SPecify some directories in which to search for specified files',
      default: __sugarConfig('importmap.file.dirs')
    }
  };
}
