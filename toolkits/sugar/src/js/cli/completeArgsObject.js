import __get from '../object/get';
import __set from '../object/set';
import __deepMap from '../object/deepMap';
import __validateCliObject from '../validation/cli/validateCliObject';
import __deepize from '../object/deepize';
import __deepMerge from '../object/deepMerge';
import __toString from '../string/toString';

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
 * @param             {Object}            [settings={}]       An object of settings to configure your process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * @return            {Object}                            The completed arguments object
 *
 * @example         js
 * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
 *
 * @since       2.0.0
 *
 */
export default function completeArgsObject(
  argsObj,
  definitionObj,
  settings = {}
) {
  argsObj = Object.assign({}, argsObj);

  settings = __deepMerge(
    {
      throw: true
    },
    settings
  );

  // loop on all the arguments
  Object.keys(definitionObj).forEach((argString) => {
    const argDefinitionObj = definitionObj[argString];

    // check if we have an argument passed in the properties
    if (
      argsObj[argString] === undefined &&
      argDefinitionObj.default !== undefined
    ) {
      argsObj[argString] = argDefinitionObj.default;
    }
  });

  // make sure all is ok
  const argsValidationResult = __validateCliObject(
    argsObj,
    definitionObj,
    settings
  );
  if (argsValidationResult !== true && settings.throw)
    throw new Error(__toString(argsValidationResult));
  else if (argsValidationResult !== true) return argsValidationResult;

  // return the argsObj
  return __deepize(argsObj);
}
