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
            packagesGlobs: {
                description:
                    'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'Array<String>',
                default: __SSugarConfig.get('monorepo.packagesGlobs'),
                alias: 'p',
            },
            buildInitial: {
                description:
                    'Specify if you want to build the files at launch before the watch process take care of the rest',
                type: 'Boolean',
                default: false,
                alias: 'b',
            },
        };
    }
}
