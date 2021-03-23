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
const map_1 = __importDefault(require("../object/map"));
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
        complete: true,
        defaultObj: {},
        cast: true
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
    // cast params
    if (settings.cast) {
        finalArgsMap = map_1.default(finalArgsMap, ({ key, value }) => {
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
exports.default = parseArgsString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUNwQyxvRUFBOEM7QUFDOUMsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyw4RUFBd0Q7QUFDeEQsd0RBQWtDO0FBQ2xDLDBEQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDNUMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsS0FBSyxFQUFFLElBQUk7UUFDWCxVQUFVLEVBQUUsSUFBSTtRQUNoQixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxFQUFFO1FBQ2QsSUFBSSxFQUFFLElBQUk7S0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ25CLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFFdkMsNEJBQTRCO0lBQzVCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQyxPQUFPLGlCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksWUFBWSxDQUFDO1FBQ2pCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekMs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