"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelCaseProps_js_1 = __importDefault(require("../object/camelCaseProps.js"));
const deepMerge_js_1 = __importDefault(require("../object/deepMerge.js"));
const parse_js_1 = __importDefault(require("../string/parse.js"));
const unquote_js_1 = __importDefault(require("../string/unquote.js"));
function __parseArgs(string, settings) {
    settings = (0, deepMerge_js_1.default)({
        valueQuote: undefined,
        treatNoAsBoolean: true,
        camelCase: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    string = string.trim();
    string = string.replace(/(["'`])--/gm, '$1--§ --');
    if (settings.treatNoAsBoolean) {
        const noMatches = string.match(/--no-[\w]+/g);
        noMatches === null || noMatches === void 0 ? void 0 : noMatches.forEach((match) => {
            string = string.replace(match, `${match.replace('--no-', '--')} false`);
        });
    }
    let valueQuote = settings.valueQuote;
    if (!valueQuote) {
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            if (char === '"' || char === '`' || char === "'") {
                valueQuote = char;
                break;
            }
        }
        if (!valueQuote)
            valueQuote = '"';
    }
    let stringArray = [];
    let isFunctionStyle = false;
    if (string.match(/^\(/) && string.match(/\)$/)) {
        isFunctionStyle = true;
        string = string.slice(1, -1);
        let currentStr = '';
        let parenthesisCount = 0;
        let quotesCount = 0;
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            const previousChar = string[i - 1] || string[0];
            // check if we are in quotes or not
            if (char === valueQuote && previousChar !== '\\' && !quotesCount) {
                quotesCount++;
            }
            else if (char === valueQuote &&
                previousChar !== '\\' &&
                quotesCount) {
                quotesCount--;
            }
            // check if we are in parenthesis
            if (!quotesCount && char === '(') {
                parenthesisCount++;
            }
            else if (!quotesCount && char === ')') {
                parenthesisCount--;
            }
            if (char === ',') {
                if (quotesCount || parenthesisCount) {
                    currentStr += char;
                }
                else {
                    stringArray.push(currentStr.trim());
                    currentStr = '';
                }
            }
            else {
                currentStr += char;
            }
        }
        if (parenthesisCount)
            currentStr += ')'.repeat(parenthesisCount);
        stringArray.push(currentStr.trim());
    }
    else {
        let currentStr = '';
        let quotesCount = false;
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            const previousChar = string[i - 1] || string[0];
            // check if we are in quotes or not
            if (char === valueQuote && previousChar !== '\\' && !quotesCount) {
                quotesCount = true;
            }
            else if (char === valueQuote &&
                previousChar !== '\\' &&
                quotesCount) {
                quotesCount = false;
            }
            if (char === ' ') {
                if (quotesCount) {
                    currentStr += char;
                }
                else {
                    stringArray.push(currentStr.trim());
                    currentStr = '';
                }
            }
            else {
                currentStr += char;
            }
        }
        stringArray.push(currentStr.trim());
    }
    if (stringArray)
        stringArray = stringArray.map((item) => (0, unquote_js_1.default)(item));
    let argsObj = {};
    let currentArgName = undefined;
    let currentValue;
    stringArray = stringArray.forEach((part, i) => {
        if (!isFunctionStyle &&
            !part.includes(' ') &&
            (part.slice(0, 2) === '--' || part.slice(0, 1) === '-')) {
            if (currentValue === undefined &&
                currentArgName !== -1 &&
                currentArgName &&
                argsObj[currentArgName] === undefined) {
                argsObj[currentArgName] = true;
            }
            currentArgName = part.replace(/^[-]{1,2}/, '');
            if (argsObj[currentArgName] === undefined) {
                argsObj[currentArgName] = true;
            }
        }
        else {
            let value;
            if (part && typeof part === 'string') {
                value = part
                    .replace(/^\\\\\\`/, '')
                    .replace(/\\\\\\`$/, '')
                    .replace(/^'/, '')
                    .replace(/'$/, '')
                    .replace(/^"/, '')
                    .replace(/"$/, '');
                if (value.match(/^\$[a-zA-Z0-9-_]+\s?:.*/)) {
                    const parts = part.split(':');
                    currentArgName = parts[0].trim().replace(/^\$/, '');
                    value = parts.slice(1).join(':').trim();
                }
            }
            currentValue = (0, parse_js_1.default)(value);
            if (typeof currentValue === 'string') {
                currentValue = currentValue.replace('--§ ', '');
            }
            if (currentArgName !== undefined) {
                if (argsObj[currentArgName] !== undefined &&
                    argsObj[currentArgName] !== true) {
                    if (!Array.isArray(argsObj[currentArgName])) {
                        argsObj[currentArgName] = [argsObj[currentArgName]];
                    }
                    argsObj[currentArgName].push(currentValue);
                }
                else {
                    argsObj[currentArgName] = currentValue;
                }
                currentValue = undefined;
                currentArgName = undefined;
            }
            else {
                argsObj[i] = currentValue;
            }
        }
    });
    // treat camelcase if needed
    if (settings.camelCase) {
        argsObj = (0, camelCaseProps_js_1.default)(argsObj);
    }
    Object.keys(argsObj).forEach((key) => {
        const value = argsObj[key];
        if (value === undefined)
            delete argsObj[key];
    });
    return argsObj;
}
exports.default = __parseArgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9GQUEyRDtBQUMzRCwwRUFBaUQ7QUFDakQsa0VBQXlDO0FBQ3pDLHNFQUE2QztBQWdFN0MsU0FBd0IsV0FBVyxDQUMvQixNQUFNLEVBQ04sUUFBc0M7SUFFdEMsUUFBUSxHQUFHLElBQUEsc0JBQVcsRUFDbEI7UUFDSSxVQUFVLEVBQUUsU0FBUztRQUNyQixnQkFBZ0IsRUFBRSxJQUFJO1FBQ3RCLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFbkQsSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDM0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ25CLEtBQUssRUFDTCxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQzFDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsTUFB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