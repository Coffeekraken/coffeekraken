// @ts-nocheck
// @shared
import __deepize from '../object/deepize';
import __deepMerge from '../object/deepMerge';
/**
 * @name                completeArgsObject
 * @namespace          sugar.js.cli
 * @type                Function
 * @status              beta
 *
 * This function take an arguments object and complete it with the definition object default values
 * for missing args
 *
 * @param             {Object}            argsObj         The arguments object to complete
 * @param             {Object}            [settings={}]       An object of settings to configure your process:
 * - definition ({}) {Object}: Specify a definition to use
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * - descriptorSettings   ({})  {Object}: Specify some settings to pass to the SDescriptor instance used to validate the object
 * @return            {Object}                            The completed arguments object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function completeArgsObject(argsObj, settings = {}) {
    argsObj = Object.assign({}, argsObj);
    settings = __deepMerge({
        definition: {},
        throw: true,
        descriptorSettings: {}
    }, settings);
    // loop on all the arguments
    Object.keys(settings.definition).forEach((argString) => {
        const argDefinition = settings.definition[argString];
        // check if we have an argument passed in the properties
        if (argsObj[argString] === undefined &&
            argDefinition.default !== undefined) {
            argsObj[argString] = argDefinition.default;
        }
    });
    // return the argsObj
    return __deepize(argsObj);
}
export default completeArgsObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGVBcmdzT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcGxldGVBcmdzT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxTQUFTLE1BQU0sbUJBQW1CLENBQUM7QUFDMUMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFJOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNoRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFckMsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxVQUFVLEVBQUUsRUFBRTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsa0JBQWtCLEVBQUUsRUFBRTtLQUN2QixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsNEJBQTRCO0lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3JELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFckQsd0RBQXdEO1FBQ3hELElBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVM7WUFDaEMsYUFBYSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQ25DO1lBQ0EsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7U0FDNUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILHFCQUFxQjtJQUNyQixPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBQ0QsZUFBZSxrQkFBa0IsQ0FBQyJ9