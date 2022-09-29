// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDocmapSnapshotParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to make a docmap snapshot
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapSnapshotParamsInterface extends __SInterface {
    static get _definition() {
        return {
            outDir: {
                description:
                    'Specify the directory path where to store your snapshots',
                type: 'String',
                path: {
                    absolute: true,
                    tokens: true,
                },
                default: __SSugarConfig.get('docmap.snapshot.outDir'),
            },
        };
    }
}
export default SDocmapSnapshotParamsInterface;
