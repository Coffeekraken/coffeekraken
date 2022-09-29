import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SComponentSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
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

export default class SComponentSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            interface: {
                description:
                    'Specify an SInterface class to use as our properties definition',
                type: 'SInterface',
            },
            styleClasses: {
                description:
                    'Define if you want the "style" class in when using the className and uniqueClassName method',
                type: 'Boolean',
            },
        };
    }
}
