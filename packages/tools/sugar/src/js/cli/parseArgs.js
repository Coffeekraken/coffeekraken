// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../iterable/map", "../object/deepMerge", "../string/parse", "./completeArgsObject", "../string/unquote", "../is/ofType", "../type/SType"], factory);
    }
})(function (require, exports) {
    "use strict";
    var map_1 = __importDefault(require("../iterable/map"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var parse_1 = __importDefault(require("../string/parse"));
    var completeArgsObject_1 = __importDefault(require("./completeArgsObject"));
    var unquote_1 = __importDefault(require("../string/unquote"));
    var ofType_1 = __importDefault(require("../is/ofType"));
    var SType_1 = __importDefault(require("../type/SType"));
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
    function parseArgsString(string, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            throw: true,
            definition: null,
            cast: true,
            complete: true,
            defaultObj: {}
        }, settings);
        var argsObj = {};
        var definition = settings.definition;
        // process the passed string
        var stringArray = string.match(/(?:[^\s"]+|"[^"]*")+/gm) || [];
        stringArray = stringArray.map(function (item) {
            return unquote_1.default(item);
        });
        if (!definition) {
            var argsObj_1 = {};
            var currentArgName_1 = -1;
            var currentValue_1;
            stringArray = stringArray.forEach(function (part) {
                if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
                    if (currentValue_1 === undefined &&
                        currentArgName_1 !== -1 &&
                        currentArgName_1) {
                        argsObj_1[currentArgName_1] = true;
                    }
                    currentArgName_1 = part.replace(/^[-]{1,2}/, '');
                }
                else {
                    currentValue_1 = parse_1.default(part);
                    if (currentArgName_1 !== undefined) {
                        argsObj_1[currentArgName_1] = parse_1.default(currentValue_1);
                        currentValue_1 = undefined;
                        currentArgName_1 = undefined;
                    }
                }
            });
            return argsObj_1;
        }
        var currentArgName = null;
        var rawArgsMap = {
            __orphan: []
        };
        stringArray = stringArray.forEach(function (part) {
            var currentArg = part.replace(/^[-]{1,2}/, '');
            if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
                var realArgName = getArgNameByAlias(currentArg, definition) || currentArg;
                currentArgName = realArgName;
                if (rawArgsMap[currentArgName] === undefined) {
                    rawArgsMap[currentArgName] = true;
                }
                if (settings.throw && !definition[realArgName]) {
                    throw new Error("You try to pass an argument \"<yellow>" + realArgName + "</yellow>\" that is not supported. Here's the supported arguments:\n" + Object.keys(definition)
                        .map(function (argName) {
                        var argDefinition = definition[argName];
                        var string = "<cyan>>" + argName + "</cyan>: --" + argName;
                        if (argDefinition.alias)
                            string += " (-" + argDefinition.alias + ")";
                        if (argDefinition.description)
                            string += ": " + argDefinition.description;
                        return string;
                    })
                        .join('\n'));
                }
                // go to the next argument/value
                return;
            }
            // check if we have a current argument name
            if (currentArgName === null)
                currentArgName = '__orphan';
            // cast the value
            var value = parse_1.default(part);
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
        var finalArgsMap = Object.assign({}, rawArgsMap);
        delete finalArgsMap.__orphan;
        // take care of orphan values
        if (settings.definition) {
            rawArgsMap.__orphan.forEach(function (value) {
                for (var i = 0; i < Object.keys(settings.definition).length; i++) {
                    var argName = Object.keys(settings.definition)[i];
                    var definitionObj = settings.definition[argName];
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
            finalArgsMap = map_1.default(finalArgsMap, function (key, value, idx) {
                // validate and cast value
                if (settings.definition && settings.definition[key]) {
                    var definitionObj = settings.definition[key];
                    var sTypeInstance = new SType_1.default(definitionObj.type);
                    var res = sTypeInstance.cast(value, {
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
        var argNames = Object.keys(definition);
        for (var i = 0; i < argNames.length; i++) {
            var argDefinition = definition[argNames[i]];
            if (argDefinition.alias && argDefinition.alias === alias)
                return argNames[i];
        }
        return null;
    }
    return parseArgsString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLHdEQUFvQztJQUVwQyxrRUFBOEM7SUFDOUMsMERBQXNDO0lBT3RDLDRFQUF3RDtJQUN4RCw4REFBMEM7SUFFMUMsd0RBQW9DO0lBQ3BDLHdEQUFvQztJQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E0Q0c7SUFDSCxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUM1QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUV2Qyw0QkFBNEI7UUFDNUIsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvRCxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7WUFDakMsT0FBTyxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLElBQU0sU0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLGdCQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxjQUFZLENBQUM7WUFDakIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxJ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