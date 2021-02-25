// @ts-nocheck
import __SValidation from '../../SValidation';
import __isPath from '../../../is/path';
/**
 * @name          SPathValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @status              wip
 *
 * This class represent the "path" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SPathValidation extends __SValidation {
    static exec(value, checkExistence = true) {
        return __isPath(value);
    }
}
SPathValidation.message = 'This value must be a valid <yellow>path</yellow> and you\'ve passed "<red>%0</red>"';
export default SPathValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BhdGhWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1BhdGhWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUd4Qzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZUFBZ0IsU0FBUSxhQUFhO0lBR3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGNBQWMsR0FBRyxJQUFJO1FBQ3RDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O0FBSk0sdUJBQU8sR0FDWixxRkFBcUYsQ0FBQztBQU0xRixlQUFlLGVBQWUsQ0FBQyJ9