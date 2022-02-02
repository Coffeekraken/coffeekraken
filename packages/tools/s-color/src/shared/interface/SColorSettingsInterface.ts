import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SColorSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SColorSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            returnNewInstance: {
                description: 'Specify if the methods returns by default a new SColor instance or the same',
                type: 'boolean',
                default: false
            },
            defaultFormat: {
                description: 'Specify the default format of the color',
                type: 'String',
                values: ['hex','rgb','rgba','hsl','hsla'],
                default: 'hex'
            }
        };
    }
}

export default SColorSettingsInterface;
