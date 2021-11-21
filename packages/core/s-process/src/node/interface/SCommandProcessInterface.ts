// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SProcessInterface from './SProcessInterface';

/**
 * @name                SCommandProcessInterface
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
export default class SCommandProcessInterface extends __SInterface {
    // static extendsArray = ['SProcess', 'SPromise'];
    static get _definition() {
        return {
            ...__SProcessInterface.definition,
            command: {
                description: 'Specify the command to execute',
                type: 'String',
                alias: 'c',
                required: true,
            },
        };
    }
}
