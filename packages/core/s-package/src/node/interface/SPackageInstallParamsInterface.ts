// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SPackageInstallParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.install` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageInstallParamsInterface extends __SInterface {
    static get _definition() {
        return {
            manager: {
                description:
                    'Specify which package manager you want to use to install the dependencies. Can be "npm" or "yarn"',
                type: 'String',
                values: ['npm', 'yarn'],
                default: __SSugarConfig.get('package.manager'),
            },
        };
    }
}
