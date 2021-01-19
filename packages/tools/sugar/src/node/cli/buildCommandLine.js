"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const argsToString_1 = __importDefault(require("./argsToString"));
const parse_1 = __importDefault(require("../string/parse"));
const fn = function buildCommandLine(command, args = {}, settings = {}) {
    settings = Object.assign({ definition: undefined, includeAllArgs: true, alias: true }, settings);
    const definition = Object.assign({}, settings.definition);
    // get all the tokens
    const tokens = command.match(/\[[a-zA-Z0-9-_]+\]/gm) || [];
    tokens.forEach((token) => {
        const tokenName = token.replace('[', '').replace(']', '');
        if (tokenName === 'arguments')
            return;
        const tokenValue = args && args[tokenName] !== undefined
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
        let tokenValueString = '';
        if (Array.isArray(tokenValue)) {
            tokenValue.forEach((tValue) => {
                let str = tValue.toString !== undefined && typeof tValue.toString === 'function'
                    ? tValue.toString()
                    : toString_1.default(tValue);
                // handle quotes or not
                if (typeof parse_1.default(str) === 'string')
                    str = `"${str}"`;
                // append to the string
                tokenValueString += `${str} `;
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
                tokenValueString = `"${tokenValueString}"`;
        }
        command = command.replace(token, tokenValueString);
    });
    // args to string
    const argsString = argsToString_1.default(args, settings).trim();
    command = command.replace('[arguments]', argsString);
    return command.trim();
};
exports.default = fn;
//# sourceMappingURL=buildCommandLine.js.map