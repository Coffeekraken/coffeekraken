// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/ofType", "../object/deepMerge", "../string/parse", "../string/unquote", "./completeArgsObject", "../object/map", "../type/SType"], factory);
    }
})(function (require, exports) {
    "use strict";
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
     * @param             {String}                    string                      The string to parse
     * @param             {Object}                    definition                   The arguments object description
     * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
     * @return            {Object}                                                The object of funded arguments and their values
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFvQztJQUNwQyxvRUFBOEM7SUFDOUMsNERBQXNDO0lBQ3RDLGdFQUEwQztJQUMxQyw4RUFBd0Q7SUFDeEQsd0RBQWtDO0lBQ2xDLDBEQUFvQztJQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Q0c7SUFDSCxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDNUMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVLEVBQUUsSUFBSTtZQUNoQixRQUFRLEVBQUUsSUFBSTtZQUNkLFVBQVUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFFdkMsNEJBQTRCO1FBQzVCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyQyxPQUFPLGlCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksWUFBWSxDQUFDO1lBQ2pCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVB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