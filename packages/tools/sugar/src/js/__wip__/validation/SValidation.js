// @ts-nocheck
import __toString from '../string/toString';
/**
 * @name          SValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 * @status              wip
 *
 * This class represent the base validation class
 * that can be extended to create some validations like the "required" one, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SValidation {
    /**
     * @name          apply
     * @type          Function
     * @static
     *
     * This static method is the main one when you want to apply a certain
     * validation on your value. Simply call this method and pass your value to validate.
     * By default, if the value does not pass the test, this method will
     * throw an error by using the "message" static property of the
     * validation class. If you don't want that but getting the string message back
     * insteaf, simply pass in the settings object the property "throw" to false
     *
     * @since         2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static apply(...args) {
        const checkResult = this.exec(...args);
        if (checkResult === true)
            return true;
        let message = this.message;
        const finalArgs = Array.isArray(checkResult) ? checkResult : args;
        finalArgs.forEach((arg, i) => {
            let value = __toString(arg);
            if (Array.isArray(arg)) {
                value = arg.join(',');
            }
            message = message.replace(`%${i}`, value);
            // if (__isNode()) {
            //   const packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');
            //   message = message.replace(`${packageRoot(__dirname)}/`, '');
            //   message = message.replace(`${packageRoot()}/`, '');
            // }
        });
        return message;
    }
}
export default SValidation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sb0JBQW9CLENBQUM7QUFHNUM7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxXQUFXO0lBQ2Y7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSTtRQUNsQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxXQUFXLEtBQUssSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0IsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbEUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMzQixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtZQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDMUMsb0JBQW9CO1lBQ3BCLDhFQUE4RTtZQUM5RSxpRUFBaUU7WUFDakUsd0RBQXdEO1lBQ3hELElBQUk7UUFDTixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FjRjtBQUVELGVBQWUsV0FBVyxDQUFDIn0=