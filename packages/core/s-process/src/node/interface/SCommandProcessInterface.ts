// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SCommandProcessInterface
 * @namespace           node.interface
 * @type                      Class
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
export default class SCommandProcessInterface extends __SInterface {
    // static extendsArray = ['SProcess', 'SPromise'];
    static get _definition() {
        return {
            command: {
                description: 'Specify the command to execute',
                type: 'String',
                alias: 'c',
                required: true,
            },
        };
    }
}
