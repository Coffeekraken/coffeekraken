import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SComponentUtilsSettingsInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SComponentUtils settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SComponentUtilsSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            interface: {
                description:
                    'Specify an SInterface class to use as our properties definition',
                type: 'SInterface',
            },
            props: {
                description:
                    'Specify a properties object to use as our properties definition',
                type: 'Object',
            },
            style: {
                description:
                    'Specify a style string to use as style to inject for our component',
                type: 'String',
            },
            defaultProps: {
                description:
                    'Pass an object that act as the default properties value for our component',
                type: 'Object',
            },
        };
    }
}
