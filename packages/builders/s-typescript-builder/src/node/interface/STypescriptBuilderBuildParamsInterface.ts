// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SCliMonoListParamsInterface
 * @namespace           node.mono.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar mono.list` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliMonoListParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description:
                    'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                default: __SSugarConfig.get('typescriptBuilder.glob'),
                alias: 'g',
            },
            inDir: {
                description:
                    'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                default: __SSugarConfig.get('typescriptBuilder.inDir'),
                alias: 'i',
            },
            outDir: {
                description:
                    'Specify a directory where you want to put the builded files',
                type: 'String',
                default: __SSugarConfig.get('typescriptBuilder.outDir'),
                alias: 'o',
            },
            formats: {
                description:
                    'Specify the formats you want to generate. Can be "esm" or/and "cjs"',
                type: 'Array<String>',
                values: ['esm', 'cjs'],
                default: __SSugarConfig.get('typescriptBuilder.formats'),
                alias: 'f',
            },
            platform: {
                description:
                    'Specify for which platform you want to generate the typescript files. Can be "browser" or "node"',
                type: 'String',
                values: ['esm', 'cjs'],
                default: __SSugarConfig.get('typescriptBuilder.platform'),
                alias: 'p',
            },
            watch: {
                description:
                    'Specify if the files have to be build again at each update',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
            buildInitial: {
                description:
                    'Specify if you want to build the files at start when using the "watch" flag',
                type: 'Boolean',
                default: false,
                alias: 'b',
            },
            exclude: {
                description:
                    'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                default: __SSugarConfig.get('typescriptBuilder.exclude'),
                alias: 'e',
            },
        };
    }
}
