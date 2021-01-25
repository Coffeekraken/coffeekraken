"use strict";
// @ts-nocheck
// @shared
/**
 * @name          typeDefinitionArrayObjectToString
 * @namespace     sugar.js.value
 * @type          Function
 * @beta
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
module.exports = typeDefinitionArrayObjectToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBQ0gsU0FBUyxpQ0FBaUMsQ0FBQyxzQkFBc0I7SUFDL0QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQ3hDLHNCQUFzQixHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUVwRCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUM1QyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzNCLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRTtZQUNqQixNQUFNLFFBQVEsR0FBRyxpQ0FBaUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEUsSUFBSSxJQUFJLElBQUksUUFBUSxHQUFHLENBQUM7U0FDekI7UUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFDRCxpQkFBUyxpQ0FBaUMsQ0FBQyJ9