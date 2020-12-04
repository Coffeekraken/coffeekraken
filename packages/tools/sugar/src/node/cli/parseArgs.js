"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const map_1 = __importDefault(require("../iterable/map"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parse_1 = __importDefault(require("../string/parse"));
const completeArgsObject_1 = __importDefault(require("./completeArgsObject"));
const unquote_1 = __importDefault(require("../string/unquote"));
const ofType_1 = __importDefault(require("../is/ofType"));
const SType_1 = __importDefault(require("../type/SType"));
/**
 * @name                        parseArgs
 * @namespace           sugar.js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    definition                   The arguments object description
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * @return            {Object}                                                The object of funded arguments and their values
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop', {
 *    param1: { type: 'String', alias: 'p' },
 *    world: { type: 'Array', alias: 'w', validator: value => {
 *      return Array.isArray(value);
 *    }},
 *    bool: { type: 'Boolean', alias: 'b', default: false, required: true },
 *    'hello.world': { type: 'String' },
 *    help: { type: 'String', alias: 'h' },
 *    id: { type: 'String', alias: 'i', regexp: /^#([\S]+)$/ }
 * }, {
 *    treatDotsAsObject: true,
 *    handleOrphanOptions: true
 * });
 * {
 *    param1: 'hello',
 *    world: [10, 'yop', 'hello world'],
 *    bool: true,
 *    hello: {
 *      world: 'Nelson'
 *    },
 *    help: 'coco yep',
 *    id: '#blop'
 * }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseArgsString(string, settings = {}) {
    settings = deepMerge_1.default({
        throw: true,
        definition: null,
        defaultObj: {}
    }, settings);
    const argsObj = {};
    const definition = settings.definition;
    // process the passed string
    let stringArray = string.match(/(?:[^\s"]+|"[^"]*")+/gm) || [];
    stringArray = stringArray.map((item) => {
        return unquote_1.default(item);
    });
    if (!definition) {
        const argsObj = {};
        let currentArgName = -1;
        let currentValue;
        stringArray = stringArray.forEach((part) => {
            if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
                if (currentValue === undefined &&
                    currentArgName !== -1 &&
                    currentArgName) {
                    argsObj[currentArgName] = true;
                }
                currentArgName = part.replace(/^[-]{1,2}/, '');
            }
            else {
                currentValue = parse_1.default(part);
                if (currentArgName !== undefined) {
                    argsObj[currentArgName] = parse_1.default(currentValue);
                    currentValue = undefined;
                    currentArgName = undefined;
                }
            }
        });
        return argsObj;
    }
    let currentArgName = null;
    let rawArgsMap = {
        __orphan: []
    };
    stringArray = stringArray.forEach((part) => {
        const currentArg = part.replace(/^[-]{1,2}/, '');
        if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
            const realArgName = getArgNameByAlias(currentArg, definition) || currentArg;
            currentArgName = realArgName;
            if (rawArgsMap[currentArgName] === undefined) {
                rawArgsMap[currentArgName] = true;
            }
            if (settings.throw && !definition[realArgName]) {
                throw new Error(`You try to pass an argument "<yellow>${realArgName}</yellow>" that is not supported. Here's the supported arguments:\n${Object.keys(definition)
                    .map((argName) => {
                    const argDefinition = definition[argName];
                    let string = `<cyan>>${argName}</cyan>: --${argName}`;
                    if (argDefinition.alias)
                        string += ` (-${argDefinition.alias})`;
                    if (argDefinition.description)
                        string += `: ${argDefinition.description}`;
                    return string;
                })
                    .join('\n')}`);
            }
            // go to the next argument/value
            return;
        }
        // check if we have a current argument name
        if (currentArgName === null)
            currentArgName = '__orphan';
        // cast the value
        const value = parse_1.default(part);
        // save the value into the raw args stack
        if (currentArgName === '__orphan') {
            rawArgsMap.__orphan.push(value);
        }
        else {
            if (rawArgsMap[currentArgName] !== undefined &&
                rawArgsMap[currentArgName] !== true) {
                if (!Array.isArray(rawArgsMap[currentArgName]))
                    rawArgsMap[currentArgName] = [rawArgsMap[currentArgName]];
                rawArgsMap[currentArgName].push(value);
            }
            else {
                rawArgsMap[currentArgName] = value;
            }
        }
    });
    let finalArgsMap = Object.assign({}, rawArgsMap);
    delete finalArgsMap.__orphan;
    // take care of orphan values
    if (settings.definition) {
        rawArgsMap.__orphan.forEach((value) => {
            for (let i = 0; i < Object.keys(settings.definition).length; i++) {
                const argName = Object.keys(settings.definition)[i];
                const definitionObj = settings.definition[argName];
                if (finalArgsMap[argName] !== undefined)
                    continue;
                if (ofType_1.default(value, definitionObj.type) === true) {
                    finalArgsMap[argName] = value;
                    break;
                }
            }
        });
    }
    console.log('final', finalArgsMap);
    // cast params
    finalArgsMap = map_1.default(finalArgsMap, (key, value, idx) => {
        // validate and cast value
        if (settings.definition && settings.definition[key]) {
            const definitionObj = settings.definition[key];
            const sTypeInstance = new SType_1.default(definitionObj.type);
            const res = sTypeInstance.cast(value, {
                throw: settings.throw
            });
            if (res instanceof Error) {
                return value;
            }
            return res;
        }
    });
    const completedArgs = completeArgsObject_1.default(finalArgsMap, settings);
    return completedArgs;
    const finalObj = {};
    for (const key in definition) {
        const value = argsObj[key];
        if (value === undefined && settings.defaultObj[key] !== undefined) {
            finalObj[key] = settings.defaultObj[key];
            continue;
        }
        else if (argsObj[key] !== undefined) {
            finalObj[key] = argsObj[key];
        }
    }
    return completeArgsObject_1.default(finalObj, settings);
}
function getArgNameByAlias(alias, definition) {
    const argNames = Object.keys(definition);
    for (let i = 0; i < argNames.length; i++) {
        const argDefinition = definition[argNames[i]];
        if (argDefinition.alias && argDefinition.alias === alias)
            return argNames[i];
    }
    return null;
}
module.exports = parseArgsString;
