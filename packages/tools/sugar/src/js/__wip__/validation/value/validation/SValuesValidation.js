// @ts-nocheck
import __SValidation from '../../SValidation';
/**
 * @name          SValuesValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @status              wip
 *
 * This class represent the "values" validation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SValuesValidation extends __SValidation {
    static exec(value, values) {
        return values.indexOf(value) !== -1;
    }
}
SValuesValidation.message = 'This value must be one of these "<green>%1</green>" but you\'ve passed "<red>%0</red>"';
export default SValuesValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbHVlc1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsdWVzVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFHOUM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLGlCQUFrQixTQUFRLGFBQWE7SUFHM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTTtRQUN2QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7QUFKTSx5QkFBTyxHQUNaLHdGQUF3RixDQUFDO0FBTTdGLGVBQWUsaUJBQWlCLENBQUMifQ==