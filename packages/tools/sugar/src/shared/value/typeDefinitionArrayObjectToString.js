// @ts-nocheck
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
export default typeDefinitionArrayObjectToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNHO0FBQ0gsU0FBUyxpQ0FBaUMsQ0FBQyxzQkFBc0I7SUFDN0QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQ3RDLHNCQUFzQixHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUV0RCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUMxQyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzNCLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRTtZQUNmLE1BQU0sUUFBUSxHQUFHLGlDQUFpQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsRSxJQUFJLElBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQztTQUMzQjtRQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUNELGVBQWUsaUNBQWlDLENBQUMifQ==