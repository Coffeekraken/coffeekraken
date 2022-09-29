import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SRatingComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SClipboardCopyComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SRatingComponentInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                description:
                    'Specify a name that will be attributed to the hidden input created automatically',
                type: 'String',
                default: 'rate',
            },
            value: {
                description: 'Specify a base value for the rating',
                type: 'Number',
                default: 3,
            },
            min: {
                description: 'Specify the minimum rate you accept',
                type: 'Number',
                default: 1,
            },
            max: {
                description: 'Specify the maximum rate you accept',
                type: 'Number',
                default: 5,
            },
            icon: {
                description:
                    'This works only if you use the "s-icon:..." class notation. Define the icon you want to use',
                type: 'String',
                default: 'star',
            },
            iconClass: {
                description:
                    'Specify a custom icon class you want to use. If this is set, override the "icon" parameter',
                type: 'String',
            },
            readonly: {
                description:
                    'Specify if you want your rating component to just display the value and that the user cannot interact with it or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
