import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDashboardComponentWidgetInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the settings of the SDashboardComponent class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDashboardComponentWidgetInterface extends __SInterface {
    static get _definition() {
        return {
            settings: {
                type: 'Object',
                description: 'Specify some settings by widget',
                default: {},
            },
        };
    }
}

export default SDashboardComponentWidgetInterface;
