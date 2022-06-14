// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                STestinatorStartParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar testinator.start` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STestinatorStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            glob: {
                description:
                    'Sppecify some globs relative to the inDir to find the files you want to build',
                type: 'Array<String>',
                default: __SSugarConfig.get('testinator.glob'),
                alias: 'g',
            },
            inDir: {
                description:
                    'Specify a directory from where to search for ts and js files to build',
                type: 'String',
                default: __SSugarConfig.get('testinator.inDir'),
                alias: 'i',
            },
            packageRoot: {
                description: 'Specify in which package the build is happening',
                type: 'String',
            },
            watch: {
                description:
                    'Specify if the files have to be build again at each update',
                type: 'Boolean',
                default: false,
                alias: 'w',
            },
            testInitial: {
                description:
                    'Specify if you want to build the files at start when using the "watch" flag',
                type: 'Boolean',
                default: false,
                alias: 't',
            },
            exclude: {
                description:
                    'Specify some glob patterns for files/folders you want to exclude of the build process',
                type: 'Array<String>',
                default: __SSugarConfig.get('testinator.exclude'),
                alias: 'e',
            },
        };
    }
}
