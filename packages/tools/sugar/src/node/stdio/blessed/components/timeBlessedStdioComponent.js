"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../../shared/console/parseHtml"));
const SBlessedComponent_1 = __importDefault(require("../../../blessed/SBlessedComponent"));
const upperFirst_1 = __importDefault(require("../../../../shared/string/upperFirst"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQscUZBQStEO0FBRS9ELDJGQUFxRTtBQUNyRSxzRkFBZ0U7QUFFaEU7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsTUFBTTtJQUNWLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUVyQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztRQUV2QyxNQUFNLE1BQU0sR0FBRyxtQkFBVyxDQUN4QixjQUFjLEtBQUssT0FBTyxLQUFLLGtCQUFrQixvQkFBWSxDQUMzRCxLQUFLLENBQ04sWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUN4QyxPQUFPLENBQ1IsZ0JBQWdCLG9CQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDMUMsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksMkJBQW1CLENBQUM7WUFDekMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSxFQUFFO2dCQUNULE9BQU8sRUFBRSxNQUFNO2FBQ2hCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUMifQ==