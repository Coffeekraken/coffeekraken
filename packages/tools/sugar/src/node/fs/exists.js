var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fs from 'fs';
export default function exists(path, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const set = Object.assign({ directory: true, file: true, symlink: true }, (settings || {}));
        let isSymlink = false, stats;
        try {
            stats = __fs.statSync(path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQWdDdEIsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsTUFBTSxDQUNsQyxJQUFZLEVBQ1osUUFBbUM7O1FBRW5DLE1BQU0sR0FBRyxtQkFDUCxTQUFTLEVBQUUsSUFBSSxFQUNmLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLElBQUksSUFDVixDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztRQUVGLElBQUksU0FBUyxHQUFHLEtBQUssRUFDbkIsS0FBVSxDQUFDO1FBRWIsSUFBSTtZQUNGLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEM7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQsSUFBSSxTQUFTLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN4RCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDOUMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQUEifQ==