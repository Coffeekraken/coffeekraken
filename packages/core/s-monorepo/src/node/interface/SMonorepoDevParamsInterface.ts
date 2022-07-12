// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SMonorepoDevParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.dev` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoDevParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlob: {
                description:
                    'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlob'),
                alias: 'p',
            },
            build: {
                description: 'Specify if you want to build your files like the .ts ones or not',
                type: 'Boolean',
                default: false,
                alias: 'b'
            },
            buildInitial: {
                description:
                    'Specify if you want to build the files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false
            },
            test: {
                description:
                    'Specify if you want to run the tests on saved files or not',
                type: 'Boolean',
                default: false,
                alias: 't',
            },
            testInitial: {
                description:
                    'Specify if you want to test the files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
            },
            format: {
                description: 'Specify if you want to run the code formatter (SCodeFormatter) on your packages or not',
                type: 'Boolean',
                default: false,
                alias: 'f',
            },
            formatInitial: {
                description: 'Specify if you want to format your files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false
            }
        };
    }
}
