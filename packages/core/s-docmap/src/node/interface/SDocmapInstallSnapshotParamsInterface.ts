// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDocmapInstallSnapshotParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to install snapshots
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapInstallSnapshotParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description:
                    'Specify a glob pattern where to find the snapshots to install',
                type: 'String',
                default: __SSugarConfig.get('docmap.installSnapshot.glob'),
            },
        };
    }
}
export default SDocmapInstallSnapshotParamsInterface;
