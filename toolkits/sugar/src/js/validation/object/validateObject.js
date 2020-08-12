// TODO: tests
import __validateObjectDefinitionObject from './validateObjectDefinitionObject';
import __isOfType from '../../is/ofType';
import __isPlainObject from '../../is/plainObject';
import __isClass from '../../is/class';
import __get from '../../object/get';
import __validateValue from '../value/validateValue';
import __deepMerge from '../../object/deepMerge';
import __parseHtml from '../../console/parseHtml';
import __filter from '../../object/filter';
import __typeof from '../../value/typeof';
import __SObjectValidationError from '../../error/SObjectValidationError';

/**
 * @name            validateObject
 * @namespace           js.validation.object
 * @type            Function
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definitionObj       The definition object to use
 * @param       {String}        [name='unnamed']    Specify a name for your object. This will be useful during the validation process
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - extendsFn (null) {Function}: Specify a function that will be called for each properties with the arguments "argName", "argDefinition" and "value" to let you the possibility to extend this validation function
 * - validateDefinitionObject (true) {Boolean}: Specify if you want to validate the passed definition object first or not
 * @return      {Boolean|Array<String>}                    Return true if all is ok, and an Array of string that describe the issue if it's not
 *
 * @todo        tests
 *
 * @example         js
 * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
 * validateObject({
 *    arg1: 'hello',
 *    arg2: false
 * }, {
 *    arg1: {
 *      type: 'String',
 *      required: true
 *    },
 *    arg2: {
 *      type: 'Boolean',
 *      required: true
 *    }
 * }); // => true
 *
 * @since     2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateObject(
  objectToCheck,
  definitionObj,
  settings = {},
  _argPath = []
) {
  settings = __deepMerge(
    {
      throw: true,
      name: 'unnamed',
      interface: null,
      validateDefinitionObject: true
    },
    settings
  );

  let issuesObj = {
    name: settings.name,
    interface: settings.interface,
    issues: []
  };

  // validate the passed definition object first
  if (settings.validateDefinitionObject) {
    const validateDefinitionObjectResult = __validateObjectDefinitionObject(
      definitionObj,
      {
        throw: settings.throw,
        name: settings.name
      }
    );
  }

  // loop on the definition object properties
  for (let i = 0; i < Object.keys(definitionObj).length; i++) {
    const argName = Object.keys(definitionObj)[i];
    const argDefinition = definitionObj[argName];
    let value = __get(objectToCheck, argName);
    // get the correct value depending on the definitionObj
    let staticIssue = false;
    if (argDefinition.static && !__isClass(objectToCheck)) {
      if (objectToCheck.constructor && objectToCheck.constructor[argName]) {
        value = objectToCheck.constructor[argName];
      } else {
        value = null;
        staticIssue = true;
      }
    }

    const validationRes = __validateValue(value, argDefinition, {
      name: argName,
      throw: settings.throw
    });
    issuesObj[argName] = {
      name: argName,
      received: {
        type: __typeof(value),
        value
      },
      expected: argDefinition,
      issues: []
    };

    if (validationRes !== true) {
      issuesObj[argName] = __deepMerge(
        issuesObj[argName],
        validationRes || {},
        {
          array: true
        }
      );
    }
    if (staticIssue) {
      issuesObj[argName].issues.push('static');
    }

    // handle "lazy" properties
    if (
      (argDefinition.lazy && objectToCheck[argName] === null) ||
      objectToCheck[argName] === undefined
    ) {
      if (!objectToCheck.__validateObjectObservedProperties) {
        Object.defineProperty(
          objectToCheck,
          '__validateObjectObservedProperties',
          {
            value: [],
            writable: true,
            enumerable: false
          }
        );
      }
      if (
        objectToCheck.__validateObjectObservedProperties.indexOf(argName) !== -1
      ) {
      } else {
        const descriptor = Object.getOwnPropertyDescriptor(
          Object.getPrototypeOf(objectToCheck),
          argName
        );
        objectToCheck.__validateObjectObservedProperties.push(argName);
        Object.defineProperty(objectToCheck, argName, {
          set: (value) => {
            // validate the passed value
            const validationResult = __validateValue(value, argDefinition, {
              ...settings,
              throw: true,
              name: `${settings.name}.${argName}`
            });

            if (descriptor && descriptor.set) return descriptor.set(value);
            objectToCheck[`__${argName}`] = value;
            return value;
          },
          get: () => {
            if (descriptor && descriptor.get) descriptor.get();
            return objectToCheck[`__${argName}`];
          }
        });
      }
    }

    // check if is an extendsFn
    if (settings.extendsFn) {
      issuesObj[argName] = settings.extendsFn(
        argName,
        argDefinition,
        value,
        issuesObj[argName]
      );
    }

    // filter args that have no issues
    issuesObj = __filter(issuesObj, (item, key) => {
      if (Array.isArray(item)) return true;
      if (__isPlainObject(item) && item.issues) {
        if (!item.issues.length) return false;
        if (issuesObj.issues.indexOf(key) === -1) issuesObj.issues.push(key);
      }
      return true;
    });

    // TODO implement the "children" support
    // check if we have some "children" properties
    if (
      argDefinition.definitionObj &&
      (argDefinition.required ||
        (objectToCheck !== null && objectToCheck !== undefined))
    ) {
      const childrenValidation = validateObject(
        objectToCheck || {},
        argDefinition.definitionObj,
        {
          ...settings,
          throw: false
        },
        [..._argPath, argName]
      );
      // console.log('CC', childrenValidation);
      if (childrenValidation !== true && childrenValidation.issues) {
        childrenValidation.issues.forEach((issue) => {
          const issueObj = childrenValidation[issue];
          issueObj.name = `${argName}.${issueObj.name}`;
          issuesObj.issues.push(`${argName}.${issue}`);
          issuesObj[`${argName}.${issue}`] = issueObj;
        });

        // if (settings.bySteps) return __parseHtml(childrenValidation);
        // issues = [...issues, ...childrenValidation];
      }
    }
  }

  if (!issuesObj.issues.length) return true;

  if (settings.throw) {
    throw new __SObjectValidationError(issuesObj);
  }

  return issuesObj;
}
