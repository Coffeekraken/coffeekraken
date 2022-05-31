// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SMonorepoUpgradeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.upgrade` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoUpgradeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            packagesGlobs: {
                description:
                    'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'Array<String>',
                default: __SSugarConfig.get('monorepo.packagesGlobs'),
            },
            files: {
                description:
                    'Specify the files to upgrade when doing a monorepo.upgrade call.',
                type: 'String[]',
                default: __SSugarConfig.get('monorepo.upgrade.files'),
            },
            fields: {
                description:
                    'Specify the fields to upgrade when doing a monorepo.upgrade call.',
                type: 'String[]',
                default: __SSugarConfig.get('monorepo.upgrade.fields'),
            },
        };
    }
}
