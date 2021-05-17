import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontstackStartInterface
 * @namespace           s-frontstack
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe parameters of the SFrontstackStartProcess
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontstackStartInterface extends __SInterface {
  static definition = {
    stack: {
      type: 'String',
      alias: 's'
    },
    receipe: {
      type: 'String',
      alias: 'r',
      values: Object.keys(__sugarConfig('frontstack.receipes')),
      default: __sugarConfig('frontstack.receipe')
    },
    exclude: {
      type: 'Array<String>',
      alias: 'e',
      values: Object.keys(__sugarConfig('frontstack.actions')),
      default: __sugarConfig('frontstack.exclude')
    }
  };
}

export default SFrontstackStartInterface;
