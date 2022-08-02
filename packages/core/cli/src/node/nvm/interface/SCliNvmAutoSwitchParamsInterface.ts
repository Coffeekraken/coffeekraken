// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SCliNvmAutoSwitchParamsInterface
 * @namespace           node.fs.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar nvm.autoSwitch` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliNvmAutoSwitchParamsInterface extends __SInterface {
    static get _definition() {
        return {
            install: {
                description:
                    'Specify if you would like to install this feature on your system',
                type: 'Boolean',
                default: false,
                alias: 'i',
            },
            uinstall: {
                description:
                    'Specify if you would like to uninstall this feature from your system',
                type: 'Boolean',
                default: false,
                alias: 'u',
            },
        };
    }
}
