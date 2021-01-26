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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZ0JsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhcm5pbmdCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMkVBQXFEO0FBQ3JELHdFQUFrRDtBQUNsRCwyRkFBcUU7QUFFckU7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsU0FBUztJQUNiLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE1BQU0sS0FBSyxHQUFHLElBQUksMkJBQW1CLENBQUM7WUFDcEMsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxDQUFDO2dCQUNOLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLFFBQVE7aUJBQ2I7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHLElBQUksMkJBQW1CLENBQUM7WUFDcEMsT0FBTyxFQUFFO2dCQUNQLEdBQUcsRUFBRSxDQUFDO2dCQUNOLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxRQUFRO2dCQUNmLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixVQUFVLEVBQUUsS0FBSztnQkFDakIsT0FBTyxFQUFFLG1CQUFXLENBQUMsOEJBQThCLE1BQU0sRUFBRSxDQUFDO2FBQzdEO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsSUFBSSwyQkFBbUIsQ0FBQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0YsQ0FBQyJ9