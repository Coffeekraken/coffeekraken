"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../console/parseHtml"));
const countLine_1 = __importDefault(require("../../../string/countLine"));
/**
 * @name        separatorTerminalStdioComponent
 * @namespace   sugar.node.stdio.terminal.components
 * @type        ISStdioComponent
 *
 * Terminal stdio component
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = {
    id: 'separator',
    render(logObj, settings = {}) {
        const value = logObj.value;
        const color = logObj.color || 'yellow';
        const separator = logObj.separator ? logObj.separator.slice(0, 1) : '-';
        if (value) {
            return `${value} ${separator.repeat(process.stdout.columns - countLine_1.default(value) - 1)}`;
        }
        else {
            return parseHtml_1.default(`<${color}>${separator.repeat(process.stdout.columns)}</${color}>`);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yVGVybWluYWxTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL3N0ZGlvL3Rlcm1pbmFsL2NvbXBvbmVudHMvc2VwYXJhdG9yVGVybWluYWxTdGRpb0NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJFQUFxRDtBQUVyRCwwRUFBb0Q7QUFFcEQ7Ozs7Ozs7OztHQVNHO0FBQ0gsa0JBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztRQUV2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUN4RSxJQUFJLEtBQUssRUFBRTtZQUNULE9BQU8sR0FBRyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FDakMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsbUJBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ2hELEVBQUUsQ0FBQztTQUNMO2FBQU07WUFDTCxPQUFPLG1CQUFXLENBQ2hCLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FDbkUsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGLENBQUMifQ==