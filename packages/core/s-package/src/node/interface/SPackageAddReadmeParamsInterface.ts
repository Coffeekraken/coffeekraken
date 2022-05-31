// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SPackageAddReadmeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.addReadme` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageAddReadmeParamsInterface extends __SInterface {
    static get _definition() {
        return {
            path: {
                description: 'Specify the README.md path where to save it',
                type: 'String',
                default: __SSugarConfig.get('package.readme.path'),
            },
        };
    }
}
