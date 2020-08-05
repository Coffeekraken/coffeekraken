"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeDefinitionObjectToString;

/**
 * @name          typeDefinitionObjectToString
 * @namespace     js.value
 * @type          Function
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
 * @param       {Object}        typeDefinitionObj       The type definition object
 * @return      {String}                                The string representation of the type definition object
 *
 * @example         js
 * import typeDefinitionObjToString from '@coffeekraken/sugar/js/value/typeDefinitionObjectToString'
 * typeDefinitionObjToString({
 *    type: [{
 *      type: 'Array',
 *      of: [{
 *        type: 'Boolean'
 *      }]
 *    }]
 * }); // => Array<Boolean>
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function typeDefinitionObjectToString(typeDefinitionObj) {
  // argumentTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
  // argumentTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
  return string;
}

module.exports = exports.default;