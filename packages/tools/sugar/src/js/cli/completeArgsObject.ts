import __deepize from '../object/deepize';
import __deepMerge from '../object/deepMerge';
import __toString from '../string/toString';
import __validateObject from '../validation/object/validateObject';

/**
 * @name                completeArgsObject
 * @namespace          sugar.js.cli
 * @type                Function
 *
 * This function take an arguments object and complete it with the definition object default values
 * for missing args
 *
 * @param             {Object}            argsObj         The arguments object to complete
 * @param             {Object}            [settings={}]       An object of settings to configure your process:
 * - definitionObj ({}) {Object}: Specify a definitionObj to use
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * @return            {Object}                            The completed arguments object
 *
 * @example         js
 * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
 *
 * @since       2.0.0
 *
 */
export default function completeArgsObject(argsObj, settings = {}) {
  argsObj = Object.assign({}, argsObj);

  settings = __deepMerge(
    {
      definitionObj: {},
      throw: true
    },
    settings
  );

  // loop on all the arguments
  Object.keys(settings.definitionObj).forEach((argString) => {
    const argDefinitionObj = settings.definitionObj[argString];

    // check if we have an argument passed in the properties
    if (
      argsObj[argString] === undefined &&
      argDefinitionObj.default !== undefined
    ) {
      argsObj[argString] = argDefinitionObj.default;
    }
  });

  // make sure all is ok
  const argsValidationResult = __validateObject(
    argsObj,
    settings.definitionObj,
    settings
  );

  if (argsValidationResult !== true && settings.throw)
    throw new Error(__toString(argsValidationResult));
  else if (argsValidationResult !== true) return argsValidationResult;

  // return the argsObj
  return __deepize(argsObj);
}
