"use strict";
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
    id: 'default',
    render(logObj, settings) {
        const value = logObj.value || logObj;
        const logStr = parseHtml_1.default(toString_1.default(value));
        const $component = new SBlessedComponent_1.default({
            blessed: {
                width: '100%',
                height: 'shrink',
                style: {},
                content: logStr
            }
        });
        return $component;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdEJsZXNzZWRTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHRCbGVzc2VkU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBcUQ7QUFDckQsd0VBQWtEO0FBQ2xELDJGQUFxRTtBQUVyRTs7Ozs7Ozs7O0dBU0c7QUFDSCxrQkFBZTtJQUNiLEVBQUUsRUFBRSxTQUFTO0lBQ2IsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFhO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLG1CQUFXLENBQUMsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sVUFBVSxHQUFHLElBQUksMkJBQW1CLENBQUM7WUFDekMsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsTUFBTTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRixDQUFDIn0=