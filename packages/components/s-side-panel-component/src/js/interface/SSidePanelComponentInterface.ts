import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SSidePanelComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSidePanelComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SSidePanelComponentInterface extends __SInterface {
    static get _definition() {
        return {
            side: {
                description:
                    'Specify the side where to display the panel. Can be "top","left","bottom" or "right"',
                type: 'String',
                values: ['top', 'left', 'bottom', 'right'],
                default: 'left',
            },
            active: {
                description: 'Specify the panel initial state',
                type: 'Boolean',
                default: false,
            },
            overlay: {
                description:
                    'Specify if you want an "overlay" between the panel and your content',
                type: 'Boolean',
                default: false,
            },
            triggerer: {
                description:
                    'Specify a css selector that targets the elements in your UI you want to open the panel on click',
                type: 'String',
            },
            closeOn: {
                description:
                    'Specify which "action(s)" close the panel. Valid values are "click" or/and "escape"',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: ['click', 'escape'],
                default: ['click', 'escape'],
            },
        };
    }
}
