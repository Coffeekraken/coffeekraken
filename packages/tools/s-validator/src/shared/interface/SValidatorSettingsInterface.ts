import __SValidator from '../SValidator';
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SValidatorSettingsInterface
 * @namespace           shared.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe all the SValidator class settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SValidatorSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            i18n: {
                description:
                    'Specify the i18n translation object. See the README for more informations.',
                type: 'Object',
                default: {},
            },
        };
    }
}
