// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SDocmapReadParamsInterface from './SDocmapReadParamsInterface';

/**
 * @name                SDocmapReadParamsInterface
 * @namespace           node.interface
 * @type                      Class
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
            ...__SDocmapReadParamsInterface.definition,
            slug: {
                description:
                    'Specify a slug to search for. Can be a micromatch glob as well',
                type: 'String',
                alias: 's',
            },
            namespace: {
                description:
                    'Specify a namespace to search for. Can be a micromatch glob as well',
                type: 'String',
                alias: 'n',
            },
            excludePackages: {
                type: {
                    type: 'String[]',
                    splitChars: [' ', ','],
                },
                description:
                    'Specify some package(s) name(s) (glob) to exclude',
                default: __SSugarConfig.get('docmap.excludePackages'),
            },
        };
    }
}
export default SDocmapReadParamsInterface;
