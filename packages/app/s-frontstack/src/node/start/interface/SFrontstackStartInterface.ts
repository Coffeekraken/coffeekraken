import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
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
    receipe: {
      type: 'String',
      values: Object.keys(__sugarConfig('frontstack.receipes')),
      default: 'default'
    }
  };
}

export default SFrontstackStartInterface;
