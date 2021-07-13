/**
*
* @name          typeDefinitionArrayObjectToString
* @namespace            js.value
* @type          Function
* @platform          js
* @platform          ts
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
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/