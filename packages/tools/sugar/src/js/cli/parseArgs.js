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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = parseArgsString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVix3REFBb0M7SUFFcEMsa0VBQThDO0lBQzlDLDBEQUFzQztJQU90Qyw0RUFBd0Q7SUFDeEQsOERBQTBDO0lBRTFDLHdEQUFvQztJQUNwQyx3REFBb0M7SUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNENHO0lBQ0gsU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDNUMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVLEVBQUUsSUFBSTtZQUNoQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFFdkMsNEJBQTRCO1FBQzVCLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJO1lBQ2pDLE9BQU8saUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixJQUFNLFNBQU8sR0FBRyxFQUFFLENBQUM7WUFDbkIsSUFBSSxnQkFBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksY0FBWSxDQUFDO1lBQ2pCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMs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