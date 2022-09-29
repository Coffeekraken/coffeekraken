// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SMonorepoPublishParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar mono.publish` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoPublishParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlob: {
                description:
                    'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlob'),
                alias: 'g',
            },
            yes: {
                description:
                    'Specify if you want to answer yes to all the questions of the process',
                type: 'Boolean',
                default: false,
                alias: 'y',
            },
        };
    }
}
