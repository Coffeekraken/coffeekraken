import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFloatingFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SFloatingFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default class SFloatingFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            ref: {
                description: 'Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM',
                type: 'String',
            },
            placement: {
                description: 'Specify the placement of your floating element. By default it will try to be placed as good as possible.',
                type: 'String',
                values: ['top','right','bottom','left','top-start','top-end','right-start','right-end','bottom-start','bottom-end','left-start','left-end','auto'],
                default: 'top'
            },
            shift: {
                description: 'Specify a space between the floating element and the viewport side to respect',
                type: 'Number',
                default: 10
            },
            offset: {
                description: 'Specify a space between the floating element and the reference one to respect',
                type: 'Number'
            },
            arrow: {
                description: 'Specify if you want an arrow or not',
                type: 'Boolean',
                default: true
            },
            arrowSize: {
                description: 'Specify the size of the arrow in px',
                type: 'Number',
                default: 15
            },
            arrowPadding: {
                description: 'Specify the padding of the arrow in px',
                type: 'Number',
                default: 10
            }
        };
    }
}
