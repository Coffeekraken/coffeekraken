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
        define(["require", "exports", "../object/deepMerge", "../string/parse", "./completeArgsObject", "../string/unquote", "../is/ofType", "../type/SType"], factory);
    }
})(function (require, exports) {
    "use strict";
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
            // validate and cast value
            if (settings.definition && settings.definition[currentArgName]) {
                var definitionObj = settings.definition[currentArgName];
                var sTypeInstance = new SType_1.default(definitionObj.type);
                var res = sTypeInstance.is(value, {
                    verbose: true
                });
                console.log('REERE', value, res);
                // if (__ofType(value, definitionObj.type) !== true) {
                //   if (settings.throw) {
                //     throw `Sorry but the passed argument "<yellow>${currentArgName}</yellow>" has to be of type "<green>${
                //       definitionObj.type
                //     }</green>" but you have passed a "<red>${__typeOf(value)}</red>"`;
                //   }
                // }
            }
            // save the value into the raw args stack
            if (currentArgName === '__orphan') {
                rawArgsMap.__orphan.push(value);
            }
            else {
                if (rawArgsMap[currentArgName] !== undefined &&
                    rawArgsMap[currentArgName] !== true) {
                    if (!Array.isArray(rawArgsMap[currentArgName]))
                        rawArgsMap[currentArgName] = [rawArgsMap[currentArgName]];
                    console.log('add', value);
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
        console.log(rawArgsMap, finalArgsMap);
        // console.log(stringArray);
        return false;
        var finalObj = {};
        for (var key in definition) {
            var value = argsObj[key];
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
