import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SGaugeComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SGaugeComponent component
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SGaugeComponentInterface extends __SInterface {
    static get _definition() {
        return {
            min: {
                type: 'Number',
                title: 'Min',
                description: 'Min value',
                default: 0,
            },
            max: {
                type: 'Number',
                title: 'Max',
                description: 'Max value',
                default: 100,
            },
            value: {
                type: 'Number',
                title: 'Value',
                description: 'Actual value between the min and the max one',
                required: true,
            },
            linecap: {
                type: 'String',
                title: 'Linecap',
                description:
                    'Specify the shape you want a the end of the geuge line',
                values: ['butt', 'square', 'round'],
                default: 'round',
            },
        };
    }
}
