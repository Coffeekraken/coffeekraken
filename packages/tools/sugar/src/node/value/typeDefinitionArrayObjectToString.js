"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name          typeDefinitionArrayObjectToString
 * @namespace     sugar.js.value
 * @type          Function
 * @status              beta
 *
 * This function take as parameter a type definition object like this one:
 * {
 *    type: [{
 *      type: 'Array',
 *      of: [{
 *        type: 'Boolean'
 *      }]
 *    }]
 * }
 * an transform it to a string like so "Array<Boolean>"
 *
 * @param       {Object}        typeDefinitionArrayObj       The type definition array object
 * @return      {String}                                The string representation of the type definition object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import typeDefinitionArrayObjToString from '@coffeekraken/sugar/js/value/typeDefinitionArrayObjectToString'
 * typeDefinitionArrayObjToString([{
 *    type: [{
 *      type: 'Array',
 *      of: [{
 *        type: 'Boolean'
 *      }]
 *    }]
 * }]); // => Array<Boolean>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function typeDefinitionArrayObjectToString(typeDefinitionArrayObj) {
    const parts = [];
    if (!Array.isArray(typeDefinitionArrayObj))
        typeDefinitionArrayObj = [typeDefinitionArrayObj];
    typeDefinitionArrayObj.forEach((definition) => {
        let part = definition.type;
        if (definition.of) {
            const ofString = typeDefinitionArrayObjectToString(definition.of);
            part += `<${ofString}>`;
        }
        parts.push(part);
    });
    return parts.join('|');
}
exports.default = typeDefinitionArrayObjectToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUNILFNBQVMsaUNBQWlDLENBQUMsc0JBQXNCO0lBQy9ELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUVqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztRQUN4QyxzQkFBc0IsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFcEQsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUMzQixJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUU7WUFDakIsTUFBTSxRQUFRLEdBQUcsaUNBQWlDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksSUFBSSxJQUFJLFFBQVEsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0Qsa0JBQWUsaUNBQWlDLENBQUMifQ==