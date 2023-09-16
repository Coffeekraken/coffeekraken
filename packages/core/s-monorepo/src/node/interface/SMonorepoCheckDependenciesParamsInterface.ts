// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import { __SPackageCheckDependenciesParamsInterface } from '@coffeekraken/s-package';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SMonorepoCheckDependenciesParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.checkDependencies` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoCheckDependenciesParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlob: {
                description:
                    'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlob'),
            },
            ...__SPackageCheckDependenciesParamsInterface.definition,
        };
    }
}
