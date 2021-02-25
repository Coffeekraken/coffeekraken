// @ts-nocheck
import __SInterface from '../../class/SInterface';
/**
 * @name                SValidationInterface
 * @namespace           sugar.js.validation.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirements
 * for a validation class that extends the SValueValidation one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SValidationInterface extends __SInterface {
}
SValidationInterface.definition = {
    apply: {
        type: 'Function',
        required: true,
        description: 'This is the method that must be used when you want to validate a value.',
        static: true
    },
    exec: {
        type: 'Function',
        required: true,
        description: 'This is the method that will be called to validate the passed value. This method has to return true of false depending on the check result',
        static: true
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbGlkYXRpb25JbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsaWRhdGlvbkludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sd0JBQXdCLENBQUM7QUFFbEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLFlBQVk7O0FBQ3JELCtCQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxXQUFXLEVBQ1QseUVBQXlFO1FBQzNFLE1BQU0sRUFBRSxJQUFJO0tBQ2I7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsSUFBSTtRQUNkLFdBQVcsRUFDVCw0SUFBNEk7UUFDOUksTUFBTSxFQUFFLElBQUk7S0FDYjtDQUNGLENBQUMifQ==