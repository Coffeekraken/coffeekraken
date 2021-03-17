import __path from 'path';
import __SInterface from '../../../../shared/interface/_SInterface';
import __sugarConfig from '../../../config/sugar';

/**
 * @name            SDocblockRendererSettingsInterface
 * @namespace       sugar.node.docblock.renderers.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Represent the SDocblockRenderer settings
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SDocblockRendererSettingsInterface extends __SInterface {
  static definition = {
    scope: {
      type: 'String',
      default: __sugarConfig('docblock.scope')
    },
    rootDir: {
      type: 'String',
      default: `${__path.resolve(__dirname, '..')}`
    }
  };
}
