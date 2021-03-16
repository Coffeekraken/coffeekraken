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
function exists(path, settings) {
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
exports.default = exists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvZnMvZXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXNCO0FBZ0N0QixTQUE4QixNQUFNLENBQ2xDLElBQVksRUFDWixRQUFtQzs7UUFFbkMsTUFBTSxHQUFHLG1CQUNQLFNBQVMsRUFBRSxJQUFJLEVBQ2YsSUFBSSxFQUFFLElBQUksRUFDVixPQUFPLEVBQUUsSUFBSSxJQUNWLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO1FBRUYsSUFBSSxTQUFTLEdBQUcsS0FBSyxFQUNuQixLQUFVLENBQUM7UUFFYixJQUFJO1lBQ0YsS0FBSyxHQUFHLFlBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDekIsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFFZCxJQUFJLFNBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDNUMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3hELElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUk7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FBQTtBQXhCRCx5QkF3QkMifQ==