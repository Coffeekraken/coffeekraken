"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const upperFirst_1 = __importDefault(require("../../../string/upperFirst"));
/**
 * @name        timeTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    id: 'time',
    render(logObj, settings = {}) {
        const value = logObj.value || '';
        const color = logObj.color || 'yellow';
        const logStr = parseHtml_1.default(`<bgBlack> <${color}>◷</${color}> </bgBlack><bg${upperFirst_1.default(color)}> <black>${new Date().toLocaleTimeString('en-US')} </black></bg${upperFirst_1.default(color)}> ${value}\n`);
        return logStr;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVRlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbm9kZS9zdGRpby90ZXJtaW5hbC9jb21wb25lbnRzL3RpbWVUZXJtaW5hbFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkVBQXFEO0FBRXJELDRFQUFzRDtBQUV0RDs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxNQUFNO0lBQ1YsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztRQUV2QyxNQUFNLE1BQU0sR0FBRyxtQkFBVyxDQUN4QixjQUFjLEtBQUssT0FBTyxLQUFLLGtCQUFrQixvQkFBWSxDQUMzRCxLQUFLLENBQ04sWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUN4QyxPQUFPLENBQ1IsZ0JBQWdCLG9CQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQ25ELENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YsQ0FBQyJ9