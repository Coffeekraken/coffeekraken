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
 * @name        headingBlessedStdioComponent
 * @namespace   sugar.node.stdio.blessed.components
 * @type        ISStdioComponent
 *
 * Blessed stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    id: 'heading',
    render(logObj, settings) {
        const value = toString_1.default(logObj.value || logObj);
        const color = logObj.color || 'yellow';
        const character = logObj.character ? logObj.character.slice(0, 1) : '-';
        const $component = new SBlessedComponent_1.default({
            blessed: {
                width: '100%',
                height: 'shrink',
                style: {}
            }
        });
        $component.on('update', () => {
            var _a;
            let width = ((_a = $component.parent) === null || _a === void 0 ? void 0 : _a.innerWidth) || process.stdout.columns;
            $component.width = width;
            const separator = `<${color}>${character.repeat(width)}</${color}>`;
            const logStr = parseHtml_1.default([separator, value, separator].join('\n'));
            $component.setContent(logStr);
            $component.height = $component.realHeight;
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZ0JsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRpbmdCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMkVBQXFEO0FBQ3JELHdFQUFrRDtBQUNsRCwyRkFBcUU7QUFFckU7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsU0FBUztJQUNiLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUMxQixNQUFNLEtBQUssR0FBRyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUM7UUFDakQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFdkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFFeEUsTUFBTSxVQUFVLEdBQUcsSUFBSSwyQkFBbUIsQ0FBQztZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEtBQUssRUFBRSxFQUFFO2FBQ1Y7U0FDRixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7O1lBQzNCLElBQUksS0FBSyxHQUFHLENBQUEsTUFBQSxVQUFVLENBQUMsTUFBTSwwQ0FBRSxVQUFVLEtBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDcEUsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQztZQUNwRSxNQUFNLE1BQU0sR0FBRyxtQkFBVyxDQUFDLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=