// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                STypescriptBuilderSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the settings of the class STypescriptBuilder.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class STypescriptBuilderSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            log: {
                type: 'Object',
                description:
                    'Specify the logs you want. THis is an object with properties "summary" and "compile".',
                default: {
                    summary: true,
                    compile: true,
                },
            },
        };
    }
}
