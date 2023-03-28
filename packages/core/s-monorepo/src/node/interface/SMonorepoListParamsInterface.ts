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
            asJson: {
                description: 'Specify if you want the list into a json object',
                type: 'Boolean',
                default: false,
                alias: 'j',
            },
            private: {
                description:
                    'Specify if you want the packages that are flagged as "private" or not',
                type: 'Boolean',
                default: false,
                alias: 'p',
            },
            independent: {
                description:
                    'Specify if you want in the result the packages flagged as "indenpendent" or not',
                type: 'Boolean',
                default: false,
                alias: 'i',
            },
        };
    }
}
