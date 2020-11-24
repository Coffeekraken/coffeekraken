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
        define(["require", "exports", "../string/toString", "./argsToString", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var toString_1 = __importDefault(require("../string/toString"));
    var argsToString_1 = __importDefault(require("./argsToString"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    /**
     * @name            buildCommandLine
     * @namespace           sugar.js.cli
     * @type            Function
     * @beta
     *
     * This function takes as parameters a command line (with tokens), an arguments object and a definition object to
     * generate the final command line string to launch.
     * A token is simply a string that begin with "[" and end with "]" like so: "[mytoken]".
     * Each arguments of the definition object can be a token. If you have an argument called "hostname", the corresponding token will be "[hostname]".
     * A special token called "[arguments]" is needed if you want the passed arguments to be integrated to the builded command line.
     *
     * @param       {String}      command         The tokenized command line to use as base
     * @param       {Object}      definitionObj   The definition object of the command to launch
     * @param       {Object}      [args={}]       An optional arguments/values object to override definition default value
     * @param       {Object}      [settings={}]     An object of settings to configure your command line buildine process:
     * - includeAllArgs (true) {Boolean}: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
     * - alias (true) {Boolean}: Specify if you want to make use of the aliases in your generated command
     * @return      {String}                      The builded command string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import buildCommandLine from '@coffeekraken/sugar/js/cli/buildCommandLine';
     * buildCommandLine('php [hostname]:[port] [rootDir] [arguments]', {
     *    hostname: {
     *      type: 'String',
     *      description: 'Server hostname',
     *      default: 'localhost'
     *    },
     *    port: {
     *      type: 'Number',
     *      description: 'Server port',
     *      default: 8080
     *    },
     *    rootDir: {
     *      type: 'String',
     *      description: 'Root directory',
     *      default: '.'
     *    },
     *    arg1: {
     *      type: 'Boolean',
     *      alias: 'a',
     *      description: 'Argument 1',
     *      default: true
     *    }
     * }, {
     *    port: 8888
     * });
     * // => php localhost:8888 . -a
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function buildCommandLine(command, args, settings) {
        if (args === void 0) { args = {}; }
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_2.default({
            definitionObj: null,
            includeAllArgs: true,
            alias: true
        }, settings);
        var definitionObj = Object.assign({}, settings.definitionObj);
        // get all the tokens
        var tokens = command.match(/\%[a-zA-Z0-9-_]+/gm) || [];
        tokens.forEach(function (token) {
            var tokenName = token.replace('[', '').replace(']', '').replace('%', '');
            if (tokenName === 'arguments')
                return;
            var tokenValue = args && args[tokenName] !== undefined
                ? args[tokenName]
                : definitionObj[tokenName]
                    ? definitionObj[tokenName].default
                    : undefined;
            delete definitionObj[tokenName];
            if (tokenValue === undefined) {
                command = command.replace(token, '');
                return;
            }
            var tokenValueString = toString_1.default(tokenValue);
            command = command.replace(token, tokenValueString);
        });
        // args to string
        var argsString = argsToString_1.default(args, settings).trim();
        command = command.replace('[arguments]', argsString);
        return command.trim();
    }
    return buildCommandLine;
});
