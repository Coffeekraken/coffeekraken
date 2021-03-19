"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ofType_1 = __importDefault(require("../is/ofType"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parse_1 = __importDefault(require("../string/parse"));
const unquote_1 = __importDefault(require("../string/unquote"));
const completeArgsObject_1 = __importDefault(require("./completeArgsObject"));
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
        complete: true,
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
    const rawArgsMap = {
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
    if (settings.complete === true) {
        finalArgsMap = completeArgsObject_1.default(finalArgsMap, settings);
    }
    return finalArgsMap;
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
exports.default = parseArgsString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUNwQyxvRUFBOEM7QUFDOUMsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyw4RUFBd0Q7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNENHO0FBQ0gsU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzVDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFLElBQUk7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxVQUFVLEVBQUUsRUFBRTtLQUNmLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbkIsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUV2Qyw0QkFBNEI7SUFDNUIsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvRCxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JDLE9BQU8saUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxZQUFZLENBQUM7UUFDakIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxL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