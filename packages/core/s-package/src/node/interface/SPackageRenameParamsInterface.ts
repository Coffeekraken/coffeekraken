// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SPackageRenameParamsInterface
 * @namespace           node.package.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPackageRenameParamsInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                description: 'Specify the new name for your package',
                type: 'String',
                required: true,
            },
            folder: {
                description: 'Specify if the folder has to be renames as well',
                type: 'Boolean',
            },
        };
    }
}
