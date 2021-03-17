"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../../../shared/console/parseHtml"));
const countLine_1 = __importDefault(require("../../../../shared/string/countLine"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yVGVybWluYWxTdGRpb0NvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcGFyYXRvclRlcm1pbmFsU3RkaW9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxRkFBK0Q7QUFFL0Qsb0ZBQThEO0FBRTlEOzs7Ozs7Ozs7R0FTRztBQUNILGtCQUFlO0lBQ2IsRUFBRSxFQUFFLFdBQVc7SUFDZixNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUM7UUFFdkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDeEUsSUFBSSxLQUFLLEVBQUU7WUFDVCxPQUFPLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQ2pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNoRCxFQUFFLENBQUM7U0FDTDthQUFNO1lBQ0wsT0FBTyxtQkFBVyxDQUNoQixJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQ25FLENBQUM7U0FDSDtJQUNILENBQUM7Q0FDRixDQUFDIn0=