// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SMonorepoListParamsInterface
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
export default class SMonorepoListParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlob: {
                description:
                    'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlob'),
                alias: 'g',
            },
            json: {
                description: 'Specify if you want the list into a json object',
                type: 'Boolean',
                default: false,
                alias: 'j',
            },
            publish: {
                description:
                    'Specigy if you want the packages that will be published, not published or both by letting this undefined',
                type: 'Boolean',
                alias: 'p',
            },
        };
    }
}
