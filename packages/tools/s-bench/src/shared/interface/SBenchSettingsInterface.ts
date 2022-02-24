// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SBenchSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform            js
 * @platform             node
 *
 * This interface represent the SBench settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SBenchSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            title: {
                description: 'Specify a title for your bench that will be used in the log',
                type: 'String'
            },
            body: {
                description: 'Specify a body for your bench that will be used in the log',
                type: 'String'
            }
        };
    }
}
