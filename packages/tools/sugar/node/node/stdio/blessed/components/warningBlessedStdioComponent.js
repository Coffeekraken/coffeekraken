"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const toString_1 = __importDefault(require("../../../string/toString"));
const SBlessedComponent_1 = __importDefault(require("../../../blessed/SBlessedComponent"));
/**
 * @name        defaultBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    id: 'warning',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const logStr = toString_1.default(value);
        const $line = new SBlessedComponent_1.default({
            blessed: {
                top: 0,
                left: 0,
                width: 1,
                height: 'shrink',
                style: {
                    bg: 'yellow'
                }
            }
        });
        const $text = new SBlessedComponent_1.default({
            blessed: {
                top: 0,
                left: 3,
                width: '100%-3',
                height: 'shrink',
                scrollable: false,
                content: parseHtml_1.default(`<yellow>Warning:</yellow>\n${logStr}`)
            }
        });
        const $component = new SBlessedComponent_1.default({
            blessed: {
                width: '100%',
                height: 0,
                style: {}
            }
        });
        $component.append($line);
        $component.append($text);
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZ0JsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL3N0ZGlvL2JsZXNzZWQvY29tcG9uZW50cy93YXJuaW5nQmxlc3NlZFN0ZGlvQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDJFQUFxRDtBQUNyRCx3RUFBa0Q7QUFDbEQsMkZBQXFFO0FBRXJFOzs7Ozs7Ozs7R0FTRztBQUNILGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFNBQVM7SUFDYixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQWE7UUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxNQUFNLEtBQUssR0FBRyxJQUFJLDJCQUFtQixDQUFDO1lBQ3BDLE9BQU8sRUFBRTtnQkFDUCxHQUFHLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxRQUFRO2lCQUNiO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBRyxJQUFJLDJCQUFtQixDQUFDO1lBQ3BDLE9BQU8sRUFBRTtnQkFDUCxHQUFHLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsUUFBUTtnQkFDZixNQUFNLEVBQUUsUUFBUTtnQkFDaEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE9BQU8sRUFBRSxtQkFBVyxDQUFDLDhCQUE4QixNQUFNLEVBQUUsQ0FBQzthQUM3RDtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksMkJBQW1CLENBQUM7WUFDekMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxFQUFFO2FBQ1Y7U0FDRixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUMifQ==