// @ts-nocheck
import __camelCaseProps from '../object/camelCaseProps.js';
import __deepMerge from '../object/deepMerge.js';
import __parse from '../string/parse.js';
import __unquote from '../string/unquote.js';
export default function __parseArgs(string, settings) {
    settings = __deepMerge({
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
        stringArray = stringArray.map((item) => __unquote(item));
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
            currentValue = __parse(value);
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
        argsObj = __camelCaseProps(argsObj);
    }
    Object.keys(argsObj).forEach((key) => {
        const value = argsObj[key];
        if (value === undefined)
            delete argsObj[key];
    });
    return argsObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGdCQUFnQixNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLG9CQUFvQixDQUFDO0FBQ3pDLE9BQU8sU0FBUyxNQUFNLHNCQUFzQixDQUFDO0FBZ0U3QyxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsTUFBTSxFQUNOLFFBQXNDO0lBRXRDLFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksVUFBVSxFQUFFLFNBQVM7UUFDckIsZ0JBQWdCLEVBQUUsSUFBSTtRQUN0QixTQUFTLEVBQUUsSUFBSTtLQUNsQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRW5ELElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUMsU0FBUyxhQUFULFNBQVMsdUJBQVQsU0FBUyxDQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3pCLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNuQixLQUFLLEVBQ0wsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUMxQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNi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