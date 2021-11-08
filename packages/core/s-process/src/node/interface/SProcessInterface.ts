// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SProcessInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SProcessInterface extends __SInterface {
    // static extendsArray = ['SProcess', 'SPromise'];
    static get _definition() {
        return {
            help: {
                type: 'Boolean',
                alias: 'h',
                default: false,
            },
        };
    }
}
