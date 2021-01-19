// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/toString", "./argsToString", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../string/toString"));
    var argsToString_1 = __importDefault(require("./argsToString"));
    var parse_1 = __importDefault(require("../string/parse"));
    var fn = function buildCommandLine(command, args, settings) {
        if (args === void 0) { args = {}; }
        if (settings === void 0) { settings = {}; }
        settings = __assign({ definition: undefined, includeAllArgs: true, alias: true }, settings);
        var definition = Object.assign({}, settings.definition);
        // get all the tokens
        var tokens = command.match(/\[[a-zA-Z0-9-_]+\]/gm) || [];
        tokens.forEach(function (token) {
            var tokenName = token.replace('[', '').replace(']', '');
            if (tokenName === 'arguments')
                return;
            var tokenValue = args && args[tokenName] !== undefined
                ? args[tokenName]
                : definition[tokenName]
                    ? definition[tokenName].default
                    : undefined;
            delete definition[tokenName];
            delete args[tokenName];
            if (tokenValue === undefined) {
                command = command.replace(token, '');
                return;
            }
            var tokenValueString = '';
            if (Array.isArray(tokenValue)) {
                tokenValue.forEach(function (tValue) {
                    var str = tValue.toString !== undefined && typeof tValue.toString === 'function'
                        ? tValue.toString()
                        : toString_1.default(tValue);
                    // handle quotes or not
                    if (typeof parse_1.default(str) === 'string')
                        str = "\"" + str + "\"";
                    // append to the string
                    tokenValueString += str + " ";
                });
                tokenValueString = tokenValueString.trim();
            }
            else {
                tokenValueString =
                    tokenValue.toString !== undefined &&
                        typeof tokenValue.toString === 'function'
                        ? tokenValue.toString()
                        : toString_1.default(tokenValue);
                // handle quotes or not
                if (typeof parse_1.default(tokenValueString) === 'string')
                    tokenValueString = "\"" + tokenValueString + "\"";
            }
            command = command.replace(token, tokenValueString);
        });
        // args to string
        var argsString = argsToString_1.default(args, settings).trim();
        command = command.replace('[arguments]', argsString);
        return command.trim();
    };
    exports.default = fn;
});
//# sourceMappingURL=buildCommandLine.js.map