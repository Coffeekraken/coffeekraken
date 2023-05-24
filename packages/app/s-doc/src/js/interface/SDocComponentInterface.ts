import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                SDocComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDocComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDocComponentInterface extends __SInterface {
    static get _definition() {
        return {
            endpoints: {
                type: 'Object',
                description: 'Specify the doc endpoints url',
                default: __SSugarConfig.get('doc.endpoints'),
            },
        };
    }
}
