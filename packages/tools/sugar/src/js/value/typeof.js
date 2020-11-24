"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_2 = __importDefault(require("../object/deepMerge"));
const integer_1 = __importDefault(require("../is/integer"));
const class_2 = __importDefault(require("../is/class"));
const upperFirst_1 = __importDefault(require("../string/upperFirst"));
module.exports = function typeOf(value, settings = {}) {
    settings = deepMerge_2.default({
        of: false,
        customClass: true
    }, settings);
    // get the real type
    let type;
    if (Array.isArray(value))
        type = 'Array';
    else if (value === null)
        type = 'Null';
    else if (value === undefined)
        type = 'Undefined';
    else if (typeof value === 'string')
        type = 'String';
    else if (integer_1.default(value))
        type = 'Integer';
    else if (typeof value === 'number')
        type = 'Number';
    else if (typeof value === 'boolean')
        type = 'Boolean';
    else if (value instanceof RegExp)
        type = 'RegExp';
    else if (settings.customClass === true &&
        class_2.default(value) &&
        value.name !== undefined) {
        type = upperFirst_1.default(value.name);
    }
    else if (settings.customClass === true &&
        value.constructor !== undefined &&
        value.constructor.name !== undefined) {
        type = upperFirst_1.default(value.constructor.name);
    }
    else if (settings.customClass === false && class_2.default(value)) {
        type = 'Class';
    }
    else if (typeof value === 'function')
        type = 'Function';
    else if (typeof value === 'object')
        type = 'Object';
    else
        type = 'Unknown';
    // check if need to get the "child" types
    const avoidTypes = [
        'Null',
        'Undefined',
        'String',
        'Integer',
        'Number',
        'Boolean',
        'Unknown'
    ];
    if (settings.of === true && !avoidTypes.includes(type)) {
        const loopOn = Array.isArray(value)
            ? [...value.keys()]
            : Object.keys(value);
        const receivedTypes = [];
        loopOn.forEach((valueIndex) => {
            const valueToCheck = value[valueIndex];
            const childType = typeOf(valueToCheck, {
                of: false,
                customClass: settings.customClass
            });
            if (!receivedTypes.includes(childType)) {
                receivedTypes.push(childType);
            }
        });
        // save the "of" types in the result obj
        type += `<${receivedTypes.join('|')}>`;
    }
    return type;
};
