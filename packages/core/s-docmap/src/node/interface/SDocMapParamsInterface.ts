// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDocMapParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapParamsInterface extends __SInterface {
  static definition = {
    cache: {
      type: 'Boolean',
      default: __SugarConfig.get('docmap.cache')
    },
    clearCache: {
      type: 'Boolean',
      default: false
    }
  };
}
export default SDocMapParamsInterface;
