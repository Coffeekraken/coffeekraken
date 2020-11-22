import __SValidation from '../../SValidation';
import __isOfType from '../../../is/ofType';
/**
 * @name          STypeValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the "type" validation
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STypeValidation extends __SValidation {
    static exec(value, type) {
        const result = __isOfType(value, type);
        if (result === true)
            return true;
        return [value, type, result.$received.type];
    }
}
STypeValidation.message = 'This value has to be of type "<yellow>%1</yellow>" and you\'ve passed "<red>%0</red>" which is of type "<red>%2</red>"';
export default STypeValidation;
