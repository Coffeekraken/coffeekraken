// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SConductorSettingsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the SConductor settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SConductorSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            idleTimeout: {
                description:
                    'Specify after how many milliseconds of inactity the SConductor has to be considered as idle ',
                type: 'Number',
                default: 5000,
            },
            logTimeout: {
                description:
                    'Specify after how many milliseconds of inactity the SConductor has to log the small analysis',
                type: 'Number',
                default: 2000,
            },
            log: {
                description:
                    'Specify if you want to log the small analysis when the SConductor is idle',
                type: 'Boolean',
                default: false,
            },
        };
    }
}
