"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argsToString_1 = __importDefault(require("./argsToString"));
function __buildCommandLine(command, args = {}, settings) {
    settings = Object.assign({ keepFalsy: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // loop on args
    const string = (0, argsToString_1.default)(args, {
        keepFalsy: settings.keepFalsy,
    });
    const cmdString = command.replace('[arguments]', string);
    return cmdString;
}
exports.default = __buildCommandLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTRDO0FBbUU1QyxTQUF3QixrQkFBa0IsQ0FDdEMsT0FBZSxFQUNmLE9BQWdDLEVBQUUsRUFDbEMsUUFBNkM7SUFFN0MsUUFBUSxtQkFDSixTQUFTLEVBQUUsS0FBSyxJQUNiLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFDRixlQUFlO0lBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBQSxzQkFBYyxFQUFDLElBQUksRUFBRTtRQUNoQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7S0FDaEMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQWZELHFDQWVDIn0=