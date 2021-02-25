// @ts-nocheck
import __toString from '../../string/toString';
import __isPlainObject from '../../is/plainObject';
import __deepMerge from '../../object/deepMerge';
import __filter from '../../object/filter';
import __get from '../../object/get';
import __typeof from '../../value/typeof';
import __validateValue from '../value/validateValue';
import __SStaticValidation from './validation/SStaticValidation';
const _validationsObj = {
    static: {
        class: __SStaticValidation,
        args: ['%object', '%property']
    }
};
/**
 * @name            validateObject
 * @namespace           sugar.js.validation.object
 * @type            Function
 * @status              wip
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validatedefinitionect" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definition       The definition object to use
 * @param       {String}        [name='unnamed']    Specify a name for your object. This will be useful during the validation process
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - extendsFn (null) {Function}: Specify a function that will be called for each properties with the arguments "argName", "argDefinition" and "value" to let you the possibility to extend this validation function
 * @return      {Boolean|Array<String>}                    Return true if all is ok, and an Array of string that describe the issue if it's not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateObject(objectToCheck, definition, settings = {}, _argPath = []) {
    settings = __deepMerge({
        throw: true,
        name: null,
        interface: null,
        validationsObj: _validationsObj
    }, settings);
    let issuesObj = {
        name: settings.name ||
            objectToCheck.constructor.name ||
            objectToCheck.name ||
            'Unnamed',
        interface: settings.interface,
        issues: [],
        messages: {}
    };
    // loop on the definition object properties
    for (let i = 0; i < Object.keys(definition).length; i++) {
        const argName = Object.keys(definition)[i];
        const argDefinition = definition[argName];
        let value = __get(objectToCheck, argName);
        if (value === undefined || value === null) {
            if (objectToCheck.constructor &&
                objectToCheck.constructor[argName] !== undefined) {
                value = objectToCheck.constructor[argName];
            }
        }
        if (!argDefinition.required && (value === undefined || value === null)) {
            // the value is not required so we pass the checks...
            break;
        }
        issuesObj[argName] = {
            name: argName,
            received: {
                type: __typeof(value),
                value
            },
            expected: argDefinition,
            issues: [],
            messages: {}
        };
        const validationRes = __validateValue(value, argDefinition, {
            name: argName,
            throw: settings.throw
        });
        if (validationRes !== true) {
            issuesObj[argName] = __deepMerge(issuesObj[argName], validationRes || {}, {
                array: true
            });
        }
        else {
        }
        Object.keys(settings.validationsObj).forEach((validationName) => {
            if (!_validationsObj[validationName]) {
                issuesObj.issues.push(`definition.${validationName}.unknown`);
                issuesObj.messages[`definition.${validationName}.unknown`] = `The specified "<yellow>${validationName}</yellow>" validation is <red>not supported</red>`;
            }
            if (validationName === 'static' &&
                definition.static &&
                definition.static !== true)
                return;
            if (!definition.hasOwnProperty(validationName))
                return;
            if (!definition[validationName])
                return;
            const validationObj = Object.assign({}, settings.validationsObj[validationName]);
            validationObj.args = validationObj.args.map((arg) => {
                if (typeof arg === 'string' && arg.slice(0, 15) === '%definition.') {
                    arg = __get(definition, arg.replace('%definition.', ''));
                }
                if (typeof arg === 'string' && arg === '%object') {
                    arg = objectToCheck;
                }
                if (typeof arg === 'string' && arg === '%property') {
                    arg = argName;
                }
                return arg;
            });
            const validationResult = validationObj.class.apply(value, ...validationObj.args);
            if (validationResult !== true) {
                issuesObj[argName].issues.push(validationName);
                issuesObj[argName].messages[validationName] = validationResult;
            }
        });
        // handle "lazy" properties
        if ((argDefinition.lazy && objectToCheck[argName] === null) ||
            objectToCheck[argName] === undefined) {
            if (!objectToCheck.__validateObjectObservedProperties) {
                Object.defineProperty(objectToCheck, '__validateObjectObservedProperties', {
                    value: [],
                    writable: true,
                    enumerable: false
                });
            }
            if (objectToCheck.__validateObjectObservedProperties.indexOf(argName) !== -1) {
            }
            else {
                const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(objectToCheck), argName);
                objectToCheck.__validateObjectObservedProperties.push(argName);
                Object.defineProperty(objectToCheck, argName, {
                    set: (value) => {
                        // validate the passed value
                        const validationResult = __validateValue(value, argDefinition, Object.assign(Object.assign({}, settings), { throw: true, name: `${settings.name}.${argName}` }));
                        if (descriptor && descriptor.set)
                            return descriptor.set(value);
                        objectToCheck[`__${argName}`] = value;
                        return value;
                    },
                    get: () => {
                        if (descriptor && descriptor.get)
                            descriptor.get();
                        return objectToCheck[`__${argName}`];
                    }
                });
            }
        }
        // check if is an extendsFn
        if (settings.extendsFn) {
            if (!issuesObj[argName]) {
                issuesObj[argName] = {
                    issues: []
                };
            }
            issuesObj[argName] = settings.extendsFn(argName, argDefinition, value, issuesObj[argName]);
        }
        // filter args that have no issues
        issuesObj = __filter(issuesObj, (item, key) => {
            if (Array.isArray(item))
                return true;
            if (__isPlainObject(item) && item.issues) {
                if (!item.issues.length)
                    return false;
                if (issuesObj.issues.indexOf(key) === -1)
                    issuesObj.issues.push(key);
            }
            return true;
        });
        // TODO implement the "children" support
        // check if we have some "children" properties
        if (argDefinition.definition &&
            (argDefinition.required ||
                (objectToCheck !== null && objectToCheck !== undefined))) {
            const childrenValidation = validateObject(objectToCheck || {}, argDefinition.definition, Object.assign(Object.assign({}, settings), { throw: false }), [..._argPath, argName]);
            if (childrenValidation !== true && childrenValidation.issues) {
                childrenValidation.issues.forEach((issue) => {
                    const issueObj = childrenValidation[issue];
                    issueObj.name = `${argName}.${issueObj.name}`;
                    issuesObj.issues.push(`${argName}.${issue}`);
                    issuesObj[`${argName}.${issue}`] = issueObj;
                });
            }
        }
    }
    if (!issuesObj.issues.length)
        return true;
    if (settings.throw) {
        throw __toString(issuesObj, {
            beautify: true
        });
    }
    return issuesObj;
}
export default validateObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZU9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sdUJBQXVCLENBQUM7QUFFL0MsT0FBTyxlQUFlLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsT0FBTyxLQUFLLE1BQU0sa0JBQWtCLENBQUM7QUFDckMsT0FBTyxRQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxlQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxtQkFBbUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVqRSxNQUFNLGVBQWUsR0FBRztJQUN0QixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsbUJBQW1CO1FBQzFCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7S0FDL0I7Q0FDRixDQUFDO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q0c7QUFDSCxTQUFTLGNBQWMsQ0FDckIsYUFBYSxFQUNiLFVBQVUsRUFDVixRQUFRLEdBQUcsRUFBRSxFQUNiLFFBQVEsR0FBRyxFQUFFO0lBRWIsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO1FBQ1YsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsZUFBZTtLQUNoQyxFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsSUFBSSxTQUFTLEdBQUc7UUFDZCxJQUFJLEVBQ0YsUUFBUSxDQUFDLElBQUk7WUFDYixhQUFhLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDOUIsYUFBYSxDQUFDLElBQUk7WUFDbEIsU0FBUztRQUNYLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FB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