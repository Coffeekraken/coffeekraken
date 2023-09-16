// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SPackageCheckDependenciesParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.checkDependencies` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageCheckDependenciesParamsInterface extends __SInterface {
    static get _definition() {
        return {
            dirs: {
                description:
                    'Specify the directories in which to check for dependencies issues, etc...',
                type: 'String[]',
                default: __SSugarConfig.get('package.checkDependencies.dirs'),
                alias: 'd',
            },
            missing: {
                description:
                    'Specify if you want to check for missing packages',
                type: 'Boolean',
                default: true,
                alias: 'm',
            },
            unused: {
                description: 'Specify if you want to check for unused packages',
                type: 'Boolean',
                default: false,
                alias: 'u',
            },
            installMissing: {
                description:
                    'Specify if you would like to install missing dependencies.',
                type: 'Boolean',
                default: undefined,
                alias: 'i',
            },
            removeUnused: {
                description:
                    'Specigy if you want to remove unused dependencies',
                type: 'Boolean',
                default: undefined,
                alias: 'r',
            },
            allYes: {
                description:
                    'Specify if you want to answer yes to all questions',
                type: 'Boolean',
                default: false,
                alias: 'y',
            },
            packagesMap: {
                description:
                    'Specify some package name patterns to add in package.json without installin them. Usefull for monorepo with packages that are not published yet.',
                type: 'Object',
                default: __SSugarConfig.get(
                    'package.checkDependencies.packagesMap',
                ),
            },
        };
    }
}
