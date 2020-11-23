"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SObjectValidationError_1 = __importDefault(require("../../error/SObjectValidationError"));
const plainObject_1 = __importDefault(require("../../is/plainObject"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const filter_1 = __importDefault(require("../../object/filter"));
const get_1 = __importDefault(require("../../object/get"));
const typeof_1 = __importDefault(require("../../value/typeof"));
const validateValue_1 = __importDefault(require("../value/validateValue"));
const SStaticValidation_1 = __importDefault(require("./validation/SStaticValidation"));
const _validationsObj = {
    static: {
        class: SStaticValidation_1.default,
        args: ['%object', '%property']
    }
};
/**
 * @name            validateObject
 * @namespace           sugar.js.validation.object
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
 * @return      {Boolean|Array<String>}                    Return true if all is ok, and an Array of string that describe the issue if it's not
 *
 * @todo        tests and documentation refactoring
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
function validateObject(objectToCheck, definitionObj, settings = {}, _argPath = []) {
    settings = deepMerge_1.default({
        throw: true,
        name: null,
        interface: null,
        validationsObj: _validationsObj
    }, settings);
    let issuesObj = {
        $name: settings.name ||
            objectToCheck.constructor.name ||
            objectToCheck.name ||
            'Unnamed',
        $interface: settings.interface,
        $issues: [],
        $messages: {}
    };
    // loop on the definition object properties
    for (let i = 0; i < Object.keys(definitionObj).length; i++) {
        const argName = Object.keys(definitionObj)[i];
        const argDefinition = definitionObj[argName];
        // __SObjectDefinitionInterface.apply(argDefinition);
        let value = get_1.default(objectToCheck, argName);
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
            $name: argName,
            $received: {
                type: typeof_1.default(value),
                value
            },
            $expected: argDefinition,
            $issues: [],
            $messages: {}
        };
        const validationRes = validateValue_1.default(value, argDefinition, {
            name: argName,
            throw: settings.throw
        });
        if (validationRes !== true) {
            issuesObj[argName] = deepMerge_1.default(issuesObj[argName], validationRes || {}, {
                array: true
            });
        }
        else {
        }
        Object.keys(settings.validationsObj).forEach((validationName) => {
            if (!_validationsObj[validationName]) {
                issuesObj.$issues.push(`definitionObj.${validationName}.unknown`);
                issuesObj.$messages[`definitionObj.${validationName}.unknown`] = `The specified "<yellow>${validationName}</yellow>" validation is <red>not supported</red>`;
            }
            if (validationName === 'static' &&
                definitionObj.static &&
                definitionObj.static !== true)
                return;
            if (!definitionObj.hasOwnProperty(validationName))
                return;
            if (!definitionObj[validationName])
                return;
            const validationObj = Object.assign({}, settings.validationsObj[validationName]);
            validationObj.args = validationObj.args.map((arg) => {
                if (typeof arg === 'string' && arg.slice(0, 15) === '%definitionObj.') {
                    arg = get_1.default(definitionObj, arg.replace('%definitionObj.', ''));
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
                issuesObj[argName].$issues.push(validationName);
                issuesObj[argName].$messages[validationName] = validationResult;
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
                        const validationResult = validateValue_1.default(value, argDefinition, {
                            ...settings,
                            throw: true,
                            name: `${settings.name}.${argName}`
                        });
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
                    $issues: []
                };
            }
            issuesObj[argName] = settings.extendsFn(argName, argDefinition, value, issuesObj[argName]);
        }
        // filter args that have no issues
        issuesObj = filter_1.default(issuesObj, (item, key) => {
            if (Array.isArray(item))
                return true;
            if (plainObject_1.default(item) && item.$issues) {
                if (!item.$issues.length)
                    return false;
                if (issuesObj.$issues.indexOf(key) === -1)
                    issuesObj.$issues.push(key);
            }
            return true;
        });
        // TODO implement the "children" support
        // check if we have some "children" properties
        if (argDefinition.definitionObj &&
            (argDefinition.required ||
                (objectToCheck !== null && objectToCheck !== undefined))) {
            const childrenValidation = validateObject(objectToCheck || {}, argDefinition.definitionObj, {
                ...settings,
                throw: false
            }, [..._argPath, argName]);
            // console.log('CC', childrenValidation);
            if (childrenValidation !== true && childrenValidation.$issues) {
                childrenValidation.$issues.forEach((issue) => {
                    const issueObj = childrenValidation[issue];
                    issueObj.$name = `${argName}.${issueObj.name}`;
                    issuesObj.$issues.push(`${argName}.${issue}`);
                    issuesObj[`${argName}.${issue}`] = issueObj;
                });
            }
        }
    }
    if (!issuesObj.$issues.length)
        return true;
    if (settings.throw) {
        throw new SObjectValidationError_1.default(issuesObj);
    }
    return issuesObj;
}
exports.default = validateObject;
