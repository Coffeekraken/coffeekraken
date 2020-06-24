import __get from '../object/get';
import __set from '../object/set';
import __deepMap from '../object/deepMap';
import __validateWithDefinitionObject from './validateWithDefinitionObject';

/**
 * @name                completeArgsObject
 * @namespace           js.cli
 * @type                Function
 *
 * This function take an arguments object and complete it with the definition object default values
 * for missing args
 *
 * @param             {Object}            argsObj         The arguments object to complete
 * @param             {Object}            definitionObj     The definition object to use
 * @return            {Object}                            The completed arguments object
 *
 * @example         js
 * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
 *
 * @since       2.0.0
 *
 */
export default function completeArgsObject(argsObj, definitionObj) {
  argsObj = Object.assign({}, argsObj);

  const flattenArgsDefinition = {};
  __deepMap(definitionObj, (value, prop, fullPath) => {
    if (
      value &&
      typeof value === 'object' &&
      value.type !== undefined &&
      value.children === undefined
    ) {
      flattenArgsDefinition[fullPath.replace('.children', '')] = value;
    }
    return value;
  });

  // loop on all the arguments
  Object.keys(flattenArgsDefinition).forEach((argString) => {
    const argDefinitionObj = flattenArgsDefinition[argString];

    // check if we have an argument passed in the properties
    if (
      __get(argsObj, argString) === undefined &&
      argDefinitionObj.default !== undefined
    ) {
      __set(argsObj, argString, argDefinitionObj.default);
    }
  });

  // make sure all is ok
  const argsValidationResult = __validateWithDefinitionObject(
    argsObj,
    definitionObj
  );
  if (argsValidationResult !== true) throw new Error(argsValidationResult);

  // return the argsObj
  return argsObj;
}
