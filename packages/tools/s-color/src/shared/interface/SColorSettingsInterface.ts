import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SColorSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 * @platform        js
 *
 * This interface represent the settings of an SColor instance.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SColorSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            format: {
                description: 'Specify the default format of the color',
                type: 'String',
                values: ['hex', 'hexa', 'rgb', 'rgba', 'hsl', 'hsla'],
                default: 'hex',
            },
        };
    }
}

export default SColorSettingsInterface;
