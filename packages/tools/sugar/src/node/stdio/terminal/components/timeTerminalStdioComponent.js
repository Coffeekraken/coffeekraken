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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVRlcm1pbmFsU3RkaW9Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lVGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJFQUFxRDtBQUVyRCw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsTUFBTTtJQUNWLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFdkMsTUFBTSxNQUFNLEdBQUcsbUJBQVcsQ0FDeEIsY0FBYyxLQUFLLE9BQU8sS0FBSyxrQkFBa0Isb0JBQVksQ0FDM0QsS0FBSyxDQUNOLFlBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FDeEMsT0FBTyxDQUNSLGdCQUFnQixvQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUNuRCxDQUFDO1FBRUYsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUMifQ==