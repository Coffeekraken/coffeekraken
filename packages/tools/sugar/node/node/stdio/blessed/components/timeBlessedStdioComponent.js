"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const SBlessedComponent_1 = __importDefault(require("../../../blessed/SBlessedComponent"));
const upperFirst_1 = __importDefault(require("../../../string/upperFirst"));
/**
 * @name        timeBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    id: 'time',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const color = logObj.color || 'yellow';
        const logStr = parseHtml_1.default(`<bgBlack> <${color}>◷</${color}> </bgBlack><bg${upperFirst_1.default(color)}> <black>${new Date().toLocaleTimeString('en-US')} </black></bg${upperFirst_1.default(color)}>\n`);
        const $component = new SBlessedComponent_1.default({
            blessed: {
                width: '100%',
                height: 2,
                style: {},
                content: logStr
            }
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL3N0ZGlvL2JsZXNzZWQvY29tcG9uZW50cy90aW1lQmxlc3NlZFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUVyRCwyRkFBcUU7QUFDckUsNEVBQXNEO0FBRXREOzs7Ozs7Ozs7R0FTRztBQUNILGtCQUFlO0lBQ2IsRUFBRSxFQUFFLE1BQU07SUFDVixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQWE7UUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7UUFFckMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFdkMsTUFBTSxNQUFNLEdBQUcsbUJBQVcsQ0FDeEIsY0FBYyxLQUFLLE9BQU8sS0FBSyxrQkFBa0Isb0JBQVksQ0FDM0QsS0FBSyxDQUNOLFlBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FDeEMsT0FBTyxDQUNSLGdCQUFnQixvQkFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQzFDLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLDJCQUFtQixDQUFDO1lBQ3pDLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsTUFBTTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=