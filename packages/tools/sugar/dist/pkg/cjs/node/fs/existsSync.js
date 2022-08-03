"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function existsSync(path, settings) {
    const set = Object.assign({ directory: true, file: true, symlink: true }, (settings || {}));
    let isSymlink = false, stats;
    try {
        stats = fs_1.default.statSync(path);
        if (!stats)
            return false;
        isSymlink = stats.isSymbolicLink();
    }
    catch (e) {
        return false;
    }
    if (isSymlink && !set.symlink)
        return false;
    if (stats.isDirectory() && !set.directory)
        return false;
    if (stats.isFile() && !set.file)
        return false;
    return true;
}
exports.default = existsSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBZ0N0QixTQUF3QixVQUFVLENBQzlCLElBQVksRUFDWixRQUFtQztJQUVuQyxNQUFNLEdBQUcsbUJBQ0wsU0FBUyxFQUFFLElBQUksRUFDZixJQUFJLEVBQUUsSUFBSSxFQUNWLE9BQU8sRUFBRSxJQUFJLElBQ1YsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLFNBQVMsR0FBRyxLQUFLLEVBQ2pCLEtBQVUsQ0FBQztJQUVmLElBQUk7UUFDQSxLQUFLLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdEM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsSUFBSSxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN4RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDOUMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFCRCw2QkEwQkMifQ==