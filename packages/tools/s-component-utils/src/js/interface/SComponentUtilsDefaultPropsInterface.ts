import __SInterface from '@coffeekraken/s-interface';
import { triggers } from '@coffeekraken/sugar/js/dom/detect/when';

/**
 * @name                SComponentUtilsDefaultPropsInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of a basic SComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SComponentUtilsDefaultPropsInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                description: 'Specify an id for your component',
                type: 'String',
                physical: true,
            },
            mounted: {
                description: 'Specify if your component is mounted or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            mountWhen: {
                description: 'Specify when your component will be mounted',
                type: 'String',
                values: triggers,
                default: 'direct',
            },
            adoptStyle: {
                description: 'Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element',
                type: 'Boolean',
                default: true,
                physical: true,
            },
            bare: {
                description: 'Specify if your component has to not use default styles. If true, only structural (bare) style will be applied',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}