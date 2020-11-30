"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseTypeDefinitionString_1 = __importDefault(require("../parse/parseTypeDefinitionString"));
const typeof_1 = __importDefault(require("../value/typeof"));
const typeDefinitionArrayObjectToString_1 = __importDefault(require("../value/typeDefinitionArrayObjectToString"));
const _SType_1 = __importDefault(require("../type/_SType"));
/**
 * @name              ofType
 * @namespace           sugar.js.is
 * @type              Function
 * @beta
 *
 * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
 * if the value pass the test or not...
 *
 * @param       {Mixed}        value          The value to check
 * @param       {String}       argTypeDefinition      The argument type definition string to use for the test
 * @return      {Boolean|Object}                    true if the value pass the test, an object with two sub-objects describing the issue. 1 names "$expected" and the othet names "$received"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => { $expected: { type: 'Array<String>' }, $received: { type: 'Array<String|Boolean>' }}
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ofType(value, argTypeDefinition) {
    let definitionArray = argTypeDefinition;
    // parsing the argument definition string
    if (typeof argTypeDefinition === 'string') {
        definitionArray = parseTypeDefinitionString_1.default(argTypeDefinition);
    }
    const typeOfValue = typeof_1.default(value);
    const issueObj = {
        $received: {
            type: typeof_1.default(value, { of: true }),
            value
        },
        $expected: {
            type: typeDefinitionArrayObjectToString_1.default(definitionArray)
        },
        $issues: ['type']
    };
    for (let i = 0; i < definitionArray.length; i++) {
        const definition = definitionArray[i];
        // if ((value === null || value === undefined) && definition.type) {
        //   issueObj.received.type = __typeof(value);
        // }
        // Array | Object
        if (definition.type === 'Array' || definition.type === 'Object') {
            // Array
            if (definition.type === 'Array') {
                // make sure the value is an array
                if (typeOfValue === 'Array' && !definition.of)
                    return true;
                // Object
            }
            else if (definition.type === 'Object') {
                if (typeOfValue === 'Object' && !definition.of)
                    return true;
            }
            if (definition.of &&
                (Array.isArray(value) || typeof value === 'object')) {
                const loopOn = Array.isArray(value)
                    ? [...value.keys()]
                    : Object.keys(value);
                let checkValuesResult = true;
                const receivedTypes = [];
                loopOn.forEach((valueIndex) => {
                    const valueToCheck = value[valueIndex];
                    if (ofType(valueToCheck, definition.of) !== true) {
                        checkValuesResult = false;
                    }
                    const typeString = typeof_1.default(valueToCheck);
                    if (receivedTypes.indexOf(typeString) === -1) {
                        receivedTypes.push(typeString);
                    }
                });
                if (checkValuesResult)
                    return true;
                // if (!checkValuesResult) {
                //   issueObj.received.type = `${typeOfValue}<${receivedTypes.join('|')}>`;
                // }
            }
        }
        // generate a new type to check
        const TypeCls = new _SType_1.default(definition.type);
        console.log(TypeCls);
        // // Class
        // else if (definition.type === 'Class') {
        //   if (__isClass(value)) return true;
        // }
        // // Integer
        // else if (definition.type === 'Int' || definition.type === 'Integer') {
        //   if (__isInt(value)) return true;
        // }
        // // check default types
        // else if (
        //   ['Boolean', 'Number', 'String', 'Bigint', 'Symbol', 'Function'].indexOf(
        //     definition.type
        //   ) !== -1
        // ) {
        //   if (definition.type === 'Number') {
        //     const type = typeOfValue;
        //     if (type === 'Number' || type === 'Integer') return true;
        //   } else {
        //     if (typeOfValue === definition.type) return true;
        //   }
        // }
        // check for "custom" types
        // else if (__isClass(value) && value.name) {
        //   if (__typeof(value) === definition.type) return true;
        //   const classesStack = __getExtendsStack(value);
        //   if (classesStack.indexOf(definition.type) !== -1) return true;
        // } else if (value && value.constructor && value.constructor.name) {
        //   if (definition.type === value.constructor.name) return true;
        // }
    }
    return issueObj;
}
function getBaseClass(targetClass) {
    const stack = [];
    if (targetClass instanceof Function) {
        let baseClass = targetClass;
        while (baseClass) {
            const newBaseClass = Object.getPrototypeOf(baseClass);
            if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
                stack.push(newBaseClass.name);
                baseClass = newBaseClass;
            }
            else {
                break;
            }
        }
        return stack;
    }
}
module.exports = ofType;
