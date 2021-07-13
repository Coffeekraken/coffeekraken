// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDocMapReadParamsInterface
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
class SDocMapReadParamsInterface extends __SInterface {
  static definition = {
    input: {
      type: 'String',
      default: __SSugarConfig.get('docmap.read.input')
    },
    inline: {
      type: 'Boolean',
      default: false
    }
    // cache: {
    //   type: 'Boolean',
    //   default: __SSugarConfig.get('docmap.cache')
    // },
    // clearCache: {
    //   type: 'Boolean',
    //   default: false
    // }
  };
}
export default SDocMapReadParamsInterface;
