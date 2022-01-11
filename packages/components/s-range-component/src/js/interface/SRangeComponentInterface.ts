import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SRangeComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SRangeComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SRangeComponentInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                description:
                    'Specify the name to assign to the internal input[type="range"]',
            },
            value: {
                type: 'String',
                description: 'Specify the initial range value',
            },
            min: {
                type: 'Number',
                description: 'Specify the minimal value or the range',
                default: 0,
            },
            max: {
                type: 'Number',
                description: 'Specify the maximal value of the range',
                default: 100,
            },
            step: {
                type: 'Number',
                description: 'Specify the steps between each values',
            },
            target: {
                type: 'String',
                description:
                    'Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated',
            },
            tooltip: {
                type: 'Boolean',
                description:
                    'Specify if you want to display the value inside a tooltip on top of the thumb',
                default: false,
            },
        };
    }
}
