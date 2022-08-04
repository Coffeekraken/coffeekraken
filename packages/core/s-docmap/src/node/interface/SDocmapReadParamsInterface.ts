// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDocmapReadParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocmapReadParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description:
                    'Specify the input path to the docmap.json file to read',
                type: 'String',
                default: __SSugarConfig.get('docmap.read.input'),
                alias: 'i',
            },
            sort: {
                description:
                    'Specify which of the docmap entries has to be sorted alphabetically.',
                type: 'String[]',
                default: __SSugarConfig.get('docmap.read.sort'),
            },
            sortDeep: {
                description:
                    'Specify which of the docmap entries has to be sorted alphabetically AND deeply.',
                type: 'String[]',
                default: __SSugarConfig.get('docmap.read.sortDeep'),
            },
            // snapshot: {
            //     type: 'String',
            //     alias: 's',
            // },
            // snapshotDir: {
            //     type: 'String',
            //     path: {
            //         absolute: true,
            //         tokens: true,
            //     },
            //     default: __SSugarConfig.get('docmap.snapshot.outDir'),
            // },
        };
    }
}
export default SDocmapReadParamsInterface;
