// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDocmapInstallSnapshotParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to install snapshots 
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocmapInstallSnapshotParamsInterface extends __SInterface {
  static definition = {
    glob: {
        type: 'String',
        default: __SSugarConfig.get('docmap.installSnapshot.glob')
    }
  };
}
export default SDocmapInstallSnapshotParamsInterface;
