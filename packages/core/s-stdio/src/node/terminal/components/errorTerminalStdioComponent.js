"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
/**
 * @name        errorTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    id: 'error',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        let logStr = toString_1.default(value);
        if (settings.terminalStdio.actionPrefix) {
            logStr = `<red>Error:</red>\n${logStr}`;
        }
        const lines = logStr.split('\n').map((l) => {
            return parseHtml_1.default(`<red>│</red> ${l}`);
        });
        return `\n${lines.join('\n')}\n`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JUZXJtaW5hbFN0ZGlvQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXJyb3JUZXJtaW5hbFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkZBQXVFO0FBQ3ZFLDBGQUFvRTtBQUVwRTs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxPQUFPO0lBQ1gsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBRXJDLElBQUksTUFBTSxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtZQUN2QyxNQUFNLEdBQUcsc0JBQXNCLE1BQU0sRUFBRSxDQUFDO1NBQ3pDO1FBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxPQUFPLG1CQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7Q0FDRixDQUFDIn0=