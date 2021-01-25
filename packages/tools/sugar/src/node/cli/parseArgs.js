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
        cast: true,
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
    // cast params
    if (settings.cast === true) {
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
module.exports = parseArgsString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLDBEQUFvQztBQUVwQyxvRUFBOEM7QUFDOUMsNERBQXNDO0FBT3RDLDhFQUF3RDtBQUN4RCxnRUFBMEM7QUFFMUMsMERBQW9DO0FBQ3BDLDBEQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDNUMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsSUFBSTtRQUNoQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxJQUFJO1FBQ2QsVUFBVSxFQUFFLEVBQUU7S0FDZixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFFdkMsNEJBQTRCO0lBQzVCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQyxPQUFPLGlCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksWUFBWSxDQUFDO1FBQ2pCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVB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