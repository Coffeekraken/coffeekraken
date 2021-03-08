"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function exists(path, settings) {
    const set = Object.assign({ directory: true, file: true, symlink: true }, (settings || {}));
    let isSymlink = false, stats;
    try {
        stats = fs_1.default.statSync(path);
        if (!stats)
            return false;
        isSymlink = stats.isSymbolicLink();
    }
    catch (e) { }
    if (isSymlink && !set.symlink)
        return false;
    if (stats.isDirectory() && !set.directory)
        return false;
    if (stats.isFile() && !set.file)
        return false;
    return true;
}
exports.default = exists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4aXN0c1N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBc0I7QUErQnRCLFNBQXdCLE1BQU0sQ0FDNUIsSUFBWSxFQUNaLFFBQW1DO0lBRW5DLE1BQU0sR0FBRyxtQkFDUCxTQUFTLEVBQUUsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLElBQUksSUFDVixDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksU0FBUyxHQUFHLEtBQUssRUFDbkIsS0FBVSxDQUFDO0lBRWIsSUFBSTtRQUNGLEtBQUssR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekIsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUNwQztJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxJQUFJLFNBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3hELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM5QyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUF4QkQseUJBd0JDIn0=