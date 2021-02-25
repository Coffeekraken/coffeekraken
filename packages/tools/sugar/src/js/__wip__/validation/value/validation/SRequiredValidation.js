// @ts-nocheck
import __SValidation from '../../SValidation';
/**
 * @name          SRequiredValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @status              wip
 *
 * This class represent the "required" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SRequiredValidation extends __SValidation {
    static exec(value) {
        return value !== null && value !== undefined;
    }
}
SRequiredValidation.message = 'This value is <yellow>required</yellow> and you\'ve passed "<red>%0"</red>';
export default SRequiredValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVpcmVkVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNSZXF1aXJlZFZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBRTlDOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxtQkFBb0IsU0FBUSxhQUFhO0lBRzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNmLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQy9DLENBQUM7O0FBSk0sMkJBQU8sR0FDWiw0RUFBNEUsQ0FBQztBQU1qRixlQUFlLG1CQUFtQixDQUFDIn0=