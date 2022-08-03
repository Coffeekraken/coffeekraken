"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name          typeDefinitionArrayObjectToString
 * @namespace            js.value
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFDSCxTQUFTLGlDQUFpQyxDQUFDLHNCQUFzQjtJQUM3RCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7UUFDdEMsc0JBQXNCLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRXRELHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQzFDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFO1lBQ2YsTUFBTSxRQUFRLEdBQUcsaUNBQWlDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksSUFBSSxJQUFJLFFBQVEsR0FBRyxDQUFDO1NBQzNCO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBQ0Qsa0JBQWUsaUNBQWlDLENBQUMifQ==