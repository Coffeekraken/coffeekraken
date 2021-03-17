// @ts-nocheck

import __SInterface from '../../../../shared/interface/_SInterface';
import __sugarConfig from '../../../config/sugar';

/**
 * @name                SSugarAppInterface
 * @namespace           sugar.node.ui.sugar.interface
 * @type                Class
 * @extends             SInterface
 * @status              wip
 *
 * This class represent the interface that describe de arguments supported
 * when using the SSugarCli class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppInterface extends __SInterface {
  static definition = {
    modules: {
      type: 'Object',
      required: true,
      default: __sugarConfig('sugar-app.modules')
    }
  };
}

export default SSugarAppInterface;
