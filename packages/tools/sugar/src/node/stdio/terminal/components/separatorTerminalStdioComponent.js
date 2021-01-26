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
            return;
            '\n' +
                `${value} ${separator.repeat(process.stdout.columns - countLine_1.default(value) - 1)}`;
        }
        else {
            return ('\n' +
                parseHtml_1.default(`<${color}>${separator.repeat(process.stdout.columns)}</${color}>`));
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yVGVybWluYWxTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcGFyYXRvclRlcm1pbmFsU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBcUQ7QUFFckQsMEVBQW9EO0FBRXBEOzs7Ozs7Ozs7R0FTRztBQUNILGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFdBQVc7SUFDZixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFdkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEUsSUFBSSxLQUFLLEVBQUU7WUFDVCxPQUFPO1lBQ1AsSUFBSTtnQkFDRixHQUFHLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDaEQsRUFBRSxDQUFDO1NBQ1A7YUFBTTtZQUNMLE9BQU8sQ0FDTCxJQUFJO2dCQUNKLG1CQUFXLENBQ1QsSUFBSSxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUNuRSxDQUNGLENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRixDQUFDIn0=