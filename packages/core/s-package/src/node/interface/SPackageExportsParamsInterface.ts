// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SPackageExportsParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.exports` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageExportsParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description:
                    'Sppecify some globs relative to the inDir to find the files you want to exports',
                type: 'Array<String>',
                default: __SSugarConfig.get('package.exports.glob'),
                alias: 'g',
            },
            inDir: {
                description:
                    'Specify a directory from where to search for files to exports',
                type: 'String',
                default: __SSugarConfig.get('package.exports.inDir'),
                alias: 'i',
            },
            folderModuleMap: {
                description:
                    'Specify some folders you want to map to a specific package type like "module" or "commonjs"',
                type: 'Object',
                default: __SSugarConfig.get('package.exports.folderModuleMap'),
                alias: 'f',
            },
            folderPlatformMap: {
                description:
                    'Specify some folders you want to map to a specific platform like "node" or "browser", etc...',
                type: 'Object',
                default: __SSugarConfig.get(
                    'package.exports.folderPlatformMap',
                ),
                alias: 'p',
            },
        };
    }
}
