"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepize_1 = __importDefault(require("../object/deepize"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
    settings = deepMerge_1.default({
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
    return deepize_1.default(argsObj);
}
exports.default = completeArgsObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGVBcmdzT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcGxldGVBcmdzT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixnRUFBMEM7QUFDMUMsb0VBQThDO0FBSTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDaEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXJDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLFVBQVUsRUFBRSxFQUFFO1FBQ2QsS0FBSyxFQUFFLElBQUk7UUFDWCxrQkFBa0IsRUFBRSxFQUFFO0tBQ3ZCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRiw0QkFBNEI7SUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDckQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRCx3REFBd0Q7UUFDeEQsSUFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUztZQUNoQyxhQUFhLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFDbkM7WUFDQSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztTQUM1QztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgscUJBQXFCO0lBQ3JCLE9BQU8saUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBQ0Qsa0JBQWUsa0JBQWtCLENBQUMifQ==