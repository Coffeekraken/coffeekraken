// @ts-nocheck
import __SValidation from '../../SValidation';
import __isOfType from '../../../is/ofType';
/**
 * @name          STypeValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @status              wip
 *
 * This class represent the "type" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STypeValidation extends __SValidation {
    static exec(value, type) {
        const result = __isOfType(value, type);
        if (result === true)
            return true;
        return [value, type, result.received.type];
    }
}
STypeValidation.message = 'This value has to be of type "<yellow>%1</yellow>" and you\'ve passed "<red>%0</red>" which is of type "<red>%2</red>"';
export default STypeValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1R5cGVWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZUFBZ0IsU0FBUSxhQUFhO0lBR3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDckIsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLE1BQU0sS0FBSyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDakMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOztBQU5NLHVCQUFPLEdBQ1osd0hBQXdILENBQUM7QUFRN0gsZUFBZSxlQUFlLENBQUMifQ==