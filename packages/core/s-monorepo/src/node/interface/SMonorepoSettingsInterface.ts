// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SMonorepoSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the SMonorepo class settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SMonorepoSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            rootDir: {
                description: 'Specify the monorepo root directory',
                type: 'string',
            },
            packagesGlobs: {
                description:
                    'Specify a glob relative to the rootDir to search for packages',
                type: 'String',
                default: __SSugarConfig.get('monorepo.packagesGlobs'),
            },
        };
    }
}
