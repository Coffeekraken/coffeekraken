// @ts-nocheck
import __SValidation from '../../SValidation';
import __isClass from '../../../is/class';
/**
 * @name          SStaticValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @status              wip
 *
 * This class represent the "static" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SStaticValidation extends __SValidation {
    static exec(value, object, property) {
        if (__isClass(object)) {
            if (!object[property])
                return false;
            return true;
        }
        else if (object.constructor) {
            if (!object.constructor[property])
                return false;
            return true;
        }
        return [value, object, property];
    }
}
SStaticValidation.message = 'The passed "<yellow>%2</yellow>" property has to be a <green>static</green> one';
export default SStaticValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLGlCQUFrQixTQUFRLGFBQWE7SUFHM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVE7UUFDakMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDcEMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDaEQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7O0FBWE0seUJBQU8sR0FDWixpRkFBaUYsQ0FBQztBQWF0RixlQUFlLGlCQUFpQixDQUFDIn0=