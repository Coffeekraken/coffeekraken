import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SThemeSwitcherComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SThemeSwitcherComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SThemeSwitcherComponentInterface extends __SInterface {
    static get _definition() {
        return {
            darkModeicon: {
                description: 'Specify if you want to dark mode icon or not',
                type: 'Boolean',
                default: false,
            },
            darkModeIconClass: {
                description:
                    'Specify the class to apply on the i tag for the dark mode icon',
                type: 'String',
                default: 's-icon:dark-mode',
            },
        };
    }
}
