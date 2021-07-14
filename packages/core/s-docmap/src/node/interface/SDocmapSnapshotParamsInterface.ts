// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDocMapSnapshotParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to make a docmap snapshot 
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapSnapshotParamsInterface extends __SInterface {
  static definition = {
    outDir: {
        type: 'String',
        path: {
          absolute: true,
          tokens: true
        },
        default: __SSugarConfig.get('docmap.snapshot.outDir')
    }
  };
}
export default SDocMapSnapshotParamsInterface;
