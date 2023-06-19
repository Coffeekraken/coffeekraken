"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPath_1 = __importDefault(require("../../shared/is/isPath"));
function __folderPath(path, settings) {
    const finalSettings = Object.assign({ checkExistence: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.checkExistence) {
        if (!(0, isPath_1.default)(path, true))
            return false;
    }
    const parts = path.split('/');
    if (parts.length <= 1) {
        return '';
    }
    return parts.slice(0, -1).join('/');
}
exports.default = __folderPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQStCOUMsU0FBd0IsWUFBWSxDQUNoQyxJQUFJLEVBQ0osUUFBdUM7SUFFdkMsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxLQUFLLElBQ2xCLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLGFBQWEsQ0FBQyxjQUFjLEVBQUU7UUFDOUIsSUFBSSxDQUFDLElBQUEsZ0JBQVEsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7S0FDM0M7SUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDbkIsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQWpCRCwrQkFpQkMifQ==