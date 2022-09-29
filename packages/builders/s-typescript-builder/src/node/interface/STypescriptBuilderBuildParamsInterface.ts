// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                STypescriptBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type                      Class
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
export default class STypescriptBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description:
                    'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.glob');
                },
                alias: 'g',
            },
            inDir: {
                description:
                    'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.inDir');
                },
                alias: 'i',
            },
            outDir: {
                description:
                    'Specify a directory where you want to put the builded files. Support the %moduleSystem and %platform token.',
                type: 'String',
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.outDir');
                },
                alias: 'o',
            },
            packageRoot: {
                description: 'Specify in which package the build is happening',
                type: 'String',
                default: process.cwd(),
            },
            formats: {
                description:
                    'Specify the formats you want to generate. Can be "esm" or/and "cjs"',
                type: 'Array<String>',
                values: ['esm', 'cjs'],
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.formats');
                },
                alias: 'f',
            },
            platform: {
                description:
                    'Specify for which platform you want to generate the typescript files. Can be "browser" or "node"',
                type: 'String',
                values: ['esm', 'cjs'],
                get default() {
                    return __SSugarConfig.getSafe('typescriptBuilder.platform');
                },
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
            customSettings: {
                description:
                    'Specify some custom settings for the typescript builder by passing a glob pattern relative to the inDir, and some custom settings to use for these files',
                type: 'Object',
                get default() {
                    __SSugarConfig.getSafe('typescriptBuilder.customSettings');
                },
                alias: 'c',
            },
            exclude: {
                description:
                    'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                get default() {
                    __SSugarConfig.getSafe('typescriptBuilder.exclude');
                },
                alias: 'e',
            },
            save: {
                description:
                    'Specify if you want to save the result of the build in a file or not',
                type: 'Boolean',
                default: true,
                alias: 's',
            },
        };
    }
}
