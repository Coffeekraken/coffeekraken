// @ts-nocheck

/**
 * @name          typeDefinitionArrayObjectToString
 * @namespace            js.value
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
export default typeDefinitionArrayObjectToString;
