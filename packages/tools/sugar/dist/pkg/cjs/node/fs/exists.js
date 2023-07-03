"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function __exists(path, settings) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.default = __exists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXNCO0FBb0N0QixTQUE4QixRQUFRLENBQ2xDLElBQVksRUFDWixRQUFtQzs7UUFFbkMsTUFBTSxHQUFHLG1CQUNMLFNBQVMsRUFBRSxJQUFJLEVBQ2YsSUFBSSxFQUFFLElBQUksRUFDVixPQUFPLEVBQUUsSUFBSSxJQUNWLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxTQUFTLEdBQUcsS0FBSyxFQUNqQixLQUFVLENBQUM7UUFFZixJQUFJO1lBQ0EsS0FBSyxHQUFHLFlBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDekIsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN0QztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFFZCxJQUFJLFNBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDNUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3hELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUE7QUF4QkQsMkJBd0JDIn0=