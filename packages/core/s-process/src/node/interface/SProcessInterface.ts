// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SProcessInterface
 * @namespace           node.interface
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
export default class SProcessInterface extends __SInterface {
    static get _definition() {
        return {
            help: {
                description:
                    'Specify if you want to see the help of the process',
                type: 'Boolean',
                alias: 'h',
                default: false,
            },
        };
    }
}
