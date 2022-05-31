// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SPackageSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the SPackage settings
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            rootDir: {
                description: 'Specify the root directory of your package',
                type: 'string',
                default: __SSugarConfig.get('package.rootDir'),
            },
            manager: {
                description: 'Specify th package manager to use',
                type: 'String',
                values: ['yarn', 'npm'],
                default: __SSugarConfig.get('package.manager'),
            },
        };
    }
}
