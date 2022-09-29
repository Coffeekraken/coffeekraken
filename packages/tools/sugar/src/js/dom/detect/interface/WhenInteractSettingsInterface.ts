// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                WhenInteractSettingsInterface
 * @namespace           js.dom.detect.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the `whenInteract` settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class WhenInteractSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            pointerover: {
                description: 'Specify if the pointerover event has to be used',
                type: 'Boolean',
                default: true,
            },
            pointerout: {
                description: 'Specify if the pointerout event has to be used',
                type: 'Boolean',
                default: true,
            },
            click: {
                description: 'Specify if the click event has to be used',
                type: 'Boolean',
                default: true,
            },
            touchstart: {
                description: 'Specify if the touchstart event has to be used',
                type: 'Boolean',
                default: true,
            },
            touchend: {
                description: 'Specify if the touchend event has to be used',
                type: 'Boolean',
                default: true,
            },
            focus: {
                description: 'Specify if the focus event has to be used',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
