import __SInterface from '@coffeekraken/s-interface';
import __SValidator from '../SValidator';

/**
 * @name                SValidatorValidatorsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe all the available validators of the SValidator class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SValidatorValidatorsInterface extends __SInterface {
    static get _definition() {
        return __SValidator.getValidatorsDefinition();
    }
}
