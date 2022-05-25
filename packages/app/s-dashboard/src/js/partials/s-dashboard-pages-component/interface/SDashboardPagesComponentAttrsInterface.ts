import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDashboardPagesComponentAttrsInterface
 * @namespace           js.partials.s-dashboard-pages-component.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the attributes possible for the s-dashboard-pages component
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDashboardPagesComponentAttrsInterface extends __SInterface {
    static get _definition() {
        return {
            settings: {
                description: 'Specify some settings',
                type: 'Object',
                default: {},
            },
        };
    }
}
