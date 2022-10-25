import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SCarpenterComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SCarpenterComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SCarpenterComponentInterface extends __SInterface {
    static get _definition() {
        return {
            source: {
                type: 'String',
                description:
                    'Specify a url from where to get the carpenter data back, or a simple id pointing to a HTMLTemplate tag that host the JSON data',
                default: '/carpenter.json',
                required: true,
            },
            adapter: {
                type: 'String',
                description:
                    'Specify the adapter to use in order to apply the updated properties on a component/section/etc... Must be a registered adapter id',
                default: 'ajax',
                required: true,
            },
        };
    }
}
