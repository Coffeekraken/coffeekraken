import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDashboardSettingsInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @status              beta
 * @platform             node
 * @interface
 *
 * This class represent the settings of the SDashboard class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDashboardSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            layout: {
                description:
                    'Specify the layout of the dashboard with the components you want to display in which column',
                type: 'Array',
                default: __SSugarConfig.get('dashboard.layout'),
            },
        };
    }
}

export default SDashboardSettingsInterface;
